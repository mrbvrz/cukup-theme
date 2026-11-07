/**
 * =============================================================================
 * Helium & Chromium Theme Template Generator for Cukup Theme System
 * Target: dist/helium/ and ~/.config/helium/themes/
 * =============================================================================
 * Helium is a private, fast, minimalist Chromium browser.
 * Generates unpacked Manifest V3 theme extensions and icons.
 * Supports both Solid and Blurred (Ultra-Translucent Glass) variants.
 * =============================================================================
 */

const zlib = require('zlib');
const { generateNewTabHtml } = require('./newtab');

function hexToRgb(h) {
  if (!h) return [0, 0, 0];
  const clean = h.replace('#', '').slice(0, 6);
  return [
    parseInt(clean.slice(0, 2), 16),
    parseInt(clean.slice(2, 4), 16),
    parseInt(clean.slice(4, 6), 16)
  ];
}

function hexToRgba(h, alpha) {
  const rgb = hexToRgb(h);
  return [rgb[0], rgb[1], rgb[2], alpha !== undefined ? alpha : 1.0];
}

function generateHeliumManifest(palette, variantKey, blurred = false) {
  const s = palette.surface;
  const t = palette.text;
  const isDark = palette.variant !== 'light';

  const baseName = palette.name.replace('Cukup ', '');
  const themeName = blurred ? `Cukup ${baseName} (Blurred)` : `Cukup ${baseName}`;
  const themeDesc = blurred
    ? `${palette.description || 'Cukup Theme for Helium'} — Ultra-translucent glass edition for native macOS blur`
    : (palette.description || 'Cukup Theme for Helium and Chromium browsers');

  // For blurred vibrancy, frame and toolbar are 0 for maximum native frosted glass blur,
  // omnibox is a whisper-light 8% sheen for subtle boundary.
  const frameColor = blurred
    ? hexToRgba(s.tabBar || s.panel, 0.0)
    : hexToRgb(s.tabBar || s.panel);

  const frameInactiveColor = blurred
    ? hexToRgba(s.panel, 0.0)
    : hexToRgb(s.panel);

  const toolbarColor = blurred
    ? hexToRgba(s.toolbar || s.surface, 0.0)
    : hexToRgb(s.toolbar || s.surface);

  const omniboxBgColor = blurred
    ? hexToRgba(s.panel, 0.08)
    : hexToRgb(s.panel);

  const ntpBgColor = blurred
    ? hexToRgba(s.canvas, 0.0)
    : hexToRgb(s.canvas);

  const manifest = {
    manifest_version: 3,
    version: '1.3.0',
    name: themeName,
    description: themeDesc,
    icons: {
      "128": "icon.png"
    },
    chrome_url_overrides: {
      newtab: "newtab.html"
    },
    theme: {
      colors: {
        frame: frameColor,
        frame_inactive: frameInactiveColor,
        frame_incognito: frameColor,
        frame_incognito_inactive: frameInactiveColor,
        toolbar: toolbarColor,
        toolbar_button_icon: hexToRgb(t.accent),
        toolbar_button_icon_inactive: hexToRgb(t.muted),
        tab_text: hexToRgb(t.primary),
        tab_background_text: hexToRgb(t.muted),
        tab_background_text_inactive: hexToRgb(t.muted),
        bookmark_text: hexToRgb(t.primary),
        omnibox_background: omniboxBgColor,
        omnibox_text: hexToRgb(t.primary),
        ntp_background: ntpBgColor,
        ntp_text: hexToRgb(t.primary),
        ntp_link: hexToRgb(t.accent)
      },
      properties: {
        ntp_logo_alternate: isDark ? 1 : 0
      }
    }
  };

  return JSON.stringify(manifest, null, 2);
}

function createThemeIcon(bgHex, accentHex) {
  const width = 128;
  const height = 128;
  const bg = hexToRgb(bgHex);
  const fg = hexToRgb(accentHex);

  const rawData = Buffer.alloc(height * (1 + width * 4));
  let offset = 0;
  const cx = width / 2;
  const cy = height / 2;
  const radius = width * 0.32;

  for (let y = 0; y < height; y++) {
    rawData[offset++] = 0; // Filter: None
    for (let x = 0; x < width; x++) {
      const dx = x - cx;
      const dy = y - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const isAccent = dist <= radius;
      const color = isAccent ? fg : bg;
      rawData[offset++] = color[0];
      rawData[offset++] = color[1];
      rawData[offset++] = color[2];
      rawData[offset++] = 255;
    }
  }

  const compressed = zlib.deflateSync(rawData);

  function crc32(buf) {
    let table = new Int32Array(256);
    for (let i = 0; i < 256; i++) {
      let c = i;
      for (let k = 0; k < 8; k++) c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
      table[i] = c;
    }
    let crc = -1;
    for (let i = 0; i < buf.length; i++) crc = (crc >>> 8) ^ table[(crc ^ buf[i]) & 0xff];
    return (crc ^ -1) >>> 0;
  }

  function makeChunk(type, data) {
    const len = Buffer.alloc(4);
    len.writeUInt32BE(data.length, 0);
    const typeBuf = Buffer.from(type, 'ascii');
    const crcBuf = Buffer.alloc(4);
    const crc = crc32(Buffer.concat([typeBuf, data]));
    crcBuf.writeUInt32BE(crc, 0);
    return Buffer.concat([len, typeBuf, data, crcBuf]);
  }

  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8;
  ihdr[9] = 6; // RGBA
  ihdr[10] = 0;
  ihdr[11] = 0;
  ihdr[12] = 0;

  return Buffer.concat([
    signature,
    makeChunk('IHDR', ihdr),
    makeChunk('IDAT', compressed),
    makeChunk('IEND', Buffer.alloc(0))
  ]);
}

module.exports = {
  generateHeliumManifest,
  generateNewTabHtml,
  createThemeIcon
};
