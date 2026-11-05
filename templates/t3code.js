/**
 * =============================================================================
 * Cukup Theme Generator — T3 Code (.json)
 * =============================================================================
 * Generates official T3 Code theme configuration JSON files matching the
 * T3 Code v1 appearance specification.
 *
 * Supports single grouped themes with dark/light variants (e.g. Cukup Kopi
 * with Cukup Terang as the light variant) and shared collection grouping:
 * "collection": { "id": "cukup", "label": "Cukup" }
 * =============================================================================
 */

function buildT3Colors(palette) {
  const isLight = palette.variant === 'light';
  const s = palette.surface;
  const b = palette.border;
  const t = palette.text;
  const stat = palette.status;
  const inter = palette.interactive;

  const unifiedCanvas = s.canvas;
  const text = t.primary;
  const textMuted = t.muted;
  const border = b.subtle;
  const accent = t.accent || '#E87D4B';
  const accentForeground = isLight ? '#FFFFFF' : '#161413';

  return {
    searchMatchBackground: isLight ? '#E5DFD7' : '#342F2A',
    searchMatchForeground: text,
    searchMatchActiveBackground: accent,
    searchMatchActiveForeground: accentForeground,
    canvas: unifiedCanvas,
    chrome: unifiedCanvas,
    toolbar: unifiedCanvas,
    toolbarForeground: text,
    toolbarBorder: border,
    toolbarControl: unifiedCanvas,
    toolbarControlForeground: text,
    toolbarControlHover: inter.hover,
    surface: unifiedCanvas,
    surfaceRaised: unifiedCanvas,
    surfaceOverlay: unifiedCanvas,
    text: text,
    textMuted: textMuted,
    border: border,
    input: border,
    focus: accent,
    accent: accent,
    accentForeground: accentForeground,
    secondary: inter.hover,
    secondaryForeground: text,
    muted: inter.hover,
    mutedForeground: textMuted,
    placeholder: t.placeholder ? t.placeholder.slice(0, 7) : textMuted,
    secondaryLabel: textMuted,
    iconMuted: textMuted,
    error: stat.error,
    errorForeground: stat.error,
    errorSurface: isLight ? '#FCEBEB' : '#331B1D',
    warning: stat.warning,
    warningForeground: stat.warning,
    warningSurface: isLight ? '#FDF3E7' : '#332717',
    update: stat.info,
    updateForeground: stat.info,
    updateSurface: isLight ? '#EBF5F5' : '#1B2C2D',
    accentSurface: inter.hover,
    accentSurfaceForeground: text,
    messageSurface: unifiedCanvas,
    messageForeground: text,
    messageAction: accent,
    messageActionForeground: accentForeground,
    messageActionHover: isLight ? '#C55F20' : '#F2A979',
    codeBackground: unifiedCanvas,
    codeForeground: text,
    sidebar: unifiedCanvas,
    sidebarForeground: text,
    sidebarMutedForeground: textMuted,
    sidebarControlSurface: unifiedCanvas,
    sidebarRowHover: inter.hover,
    sidebarRowActive: inter.active,
    sidebarRowSelected: inter.selected,
    sidebarBorder: border,
    terminalBackground: unifiedCanvas,
    terminalForeground: text,
    terminalCursor: accent,
    terminalSelection: inter.selected,
    terminalScrollbar: inter.scrollbarThumb ? inter.scrollbarThumb.slice(0, 7) : border,
    terminalScrollbarHover: inter.scrollbarThumbHover ? inter.scrollbarThumbHover.slice(0, 7) : accent
  };
}

/**
 * Generates unified standalone theme JSON with built-in Light & Dark variants
 * under the single "Cukup" name.
 */
function generateT3UnifiedThemeJson(darkPalette, lightPalette) {
  return JSON.stringify({
    version: 1,
    id: "cukup",
    name: "Cukup",
    appearance: "dark",
    colors: buildT3Colors(darkPalette),
    variants: {
      light: buildT3Colors(lightPalette)
    },
    collection: {
      id: "cukup",
      label: "Cukup"
    }
  }, null, 2);
}

/**
 * Generates individual theme variant with collection metadata.
 */
function generateT3CodeJson(palette, key) {
  const isLight = palette.variant === 'light';
  return JSON.stringify({
    version: 1,
    id: `cukup-${key}`,
    name: palette.name,
    appearance: isLight ? 'light' : 'dark',
    colors: buildT3Colors(palette),
    collection: {
      id: "cukup",
      label: "Cukup"
    }
  }, null, 2);
}

module.exports = {
  buildT3Colors,
  generateT3UnifiedThemeJson,
  generateT3CodeJson
};
