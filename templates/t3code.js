/**
 * =============================================================================
 * Cukup Theme Generator — T3 Code (.json)
 * =============================================================================
 * Generates official T3 Code theme configuration JSON files matching the
 * T3 Code v1 appearance specification.
 * =============================================================================
 */

function generateT3CodeJson(palette) {
  const isLight = palette.variant === 'light';
  const s = palette.surface;
  const b = palette.border;
  const t = palette.text;
  const stat = palette.status;
  const syn = palette.syntax;
  const inter = palette.interactive;

  const canvas = s.canvas;
  const chrome = s.panel || s.canvas;
  const surface = s.surface || s.canvas;
  const surfaceRaised = s.elevated || s.surface;
  const surfaceOverlay = s.panelOverlay || s.panel || '#11100E';

  const text = t.primary;
  const textMuted = t.muted;
  const border = b.subtle;
  const accent = t.accent || '#E87D4B';
  const accentForeground = isLight ? '#FFFFFF' : '#161413';

  return JSON.stringify({
    version: 1,
    name: palette.name,
    appearance: isLight ? 'light' : 'dark',
    colors: {
      canvas: canvas,
      chrome: chrome,
      toolbar: chrome,
      toolbarForeground: text,
      toolbarBorder: border,
      toolbarControl: surfaceRaised,
      toolbarControlForeground: text,
      toolbarControlHover: inter.hover,
      surface: surface,
      surfaceRaised: surfaceRaised,
      surfaceOverlay: surfaceOverlay,
      text: text,
      textMuted: textMuted,
      border: border,
      input: border,
      focus: accent,
      accent: accent,
      accentForeground: accentForeground,
      secondary: surfaceRaised,
      secondaryForeground: text,
      muted: surfaceRaised,
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
      messageSurface: surfaceRaised,
      messageForeground: text,
      messageAction: accent,
      messageActionForeground: accentForeground,
      messageActionHover: isLight ? '#C55F20' : '#F2A979',
      codeBackground: surfaceOverlay,
      codeForeground: text,
      sidebar: chrome,
      sidebarForeground: text,
      sidebarMutedForeground: textMuted,
      sidebarControlSurface: surfaceRaised,
      sidebarRowHover: inter.hover,
      sidebarRowActive: inter.active,
      sidebarRowSelected: inter.selected,
      sidebarBorder: border,
      terminalBackground: canvas,
      terminalForeground: text,
      terminalCursor: accent,
      terminalSelection: inter.selected,
      terminalScrollbar: inter.scrollbarThumb ? inter.scrollbarThumb.slice(0, 7) : border,
      terminalScrollbarHover: inter.scrollbarThumbHover ? inter.scrollbarThumbHover.slice(0, 7) : accent
    }
  }, null, 2);
}

module.exports = {
  generateT3CodeJson
};
