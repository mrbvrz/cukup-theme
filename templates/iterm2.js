/**
 * iTerm2 .itermcolors Property List Generator for Cukup Theme
 */

function hexToRgb01(hex) {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  return { r: r.toFixed(6), g: g.toFixed(6), b: b.toFixed(6) };
}

function xmlColorDict(key, hex) {
  const { r, g, b } = hexToRgb01(hex);
  return `\t<key>${key}</key>
\t<dict>
\t\t<key>Color Space</key>
\t\t<string>sRGB</string>
\t\t<key>Red Component</key>
\t\t<real>${r}</real>
\t\t<key>Green Component</key>
\t\t<real>${g}</real>
\t\t<key>Blue Component</key>
\t\t<real>${b}</real>
\t</dict>`;
}

function generateItermcolors(palette) {
  const p = palette;
  const a = p.ansi;
  const isLight = p.variant === 'light';
  const boldColor = isLight ? p.text.primary : a.bright_white;
  const selTextColor = isLight ? p.surface.canvas : a.bright_white;

  return `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
${xmlColorDict("Background Color", p.surface.canvas)}
${xmlColorDict("Foreground Color", p.text.primary)}
${xmlColorDict("Bold Color", boldColor)}
${xmlColorDict("Cursor Color", p.text.accent)}
${xmlColorDict("Cursor Text Color", p.surface.canvas)}
${xmlColorDict("Selection Color", p.interactive.active)}
${xmlColorDict("Selected Text Color", selTextColor)}
${xmlColorDict("Ansi 0 Color", a.black)}
${xmlColorDict("Ansi 1 Color", a.red)}
${xmlColorDict("Ansi 2 Color", a.green)}
${xmlColorDict("Ansi 3 Color", a.yellow)}
${xmlColorDict("Ansi 4 Color", a.blue)}
${xmlColorDict("Ansi 5 Color", a.magenta)}
${xmlColorDict("Ansi 6 Color", a.cyan)}
${xmlColorDict("Ansi 7 Color", a.white)}
${xmlColorDict("Ansi 8 Color", a.bright_black)}
${xmlColorDict("Ansi 9 Color", a.bright_red)}
${xmlColorDict("Ansi 10 Color", a.bright_green)}
${xmlColorDict("Ansi 11 Color", a.bright_yellow)}
${xmlColorDict("Ansi 12 Color", a.bright_blue)}
${xmlColorDict("Ansi 13 Color", a.bright_magenta)}
${xmlColorDict("Ansi 14 Color", a.bright_cyan)}
${xmlColorDict("Ansi 15 Color", a.bright_white)}
</dict>
</plist>
`;
}

module.exports = { generateItermcolors };
