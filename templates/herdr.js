/**
 * Herdr App Theme Generator for Cukup Theme System
 * Target: ~/.config/herdr-app/themes/
 *
 * Herdr is a GPUI/Rust based workspace app for terminals and AI agents.
 * Schema adheres to Herdr's theme definition with seamless unified surfaces.
 */

function generateHerdrJson(palette) {
  const s = palette.surface;
  const b = palette.border;
  const t = palette.text;
  const i = palette.interactive;
  const st = palette.status;
  const a = palette.ansi;

  // Herdr strict format: 6-char hex "#rrggbb" only
  const cleanHex = (c) => {
    if (!c) return '#000000';
    if (c.startsWith('#') && c.length === 9) {
      return c.slice(0, 7); // strip alpha
    }
    return c;
  };

  const themeData = {
    "background": cleanHex(s.canvas),
    "foreground": cleanHex(t.primary),
    "selection": cleanHex(i.selected),
    "cursor": cleanHex(t.accent),
    "ansi": [
      cleanHex(a.black),
      cleanHex(a.red),
      cleanHex(a.green),
      cleanHex(a.yellow),
      cleanHex(a.blue),
      cleanHex(a.magenta),
      cleanHex(a.cyan),
      cleanHex(a.white),
      cleanHex(a.bright_black),
      cleanHex(a.bright_red),
      cleanHex(a.bright_green),
      cleanHex(a.bright_yellow),
      cleanHex(a.bright_blue),
      cleanHex(a.bright_magenta),
      cleanHex(a.bright_cyan),
      cleanHex(t.primary)                 // ansi15: Cukup primary text (t.primary) to avoid harsh glaring white in Herdr sidebar (bright(t))
    ],
    "colors": {
      "canvas": cleanHex(s.canvas),
      "chrome": cleanHex(s.canvas),       // Unified chrome & sidebar with canvas
      "surface": cleanHex(s.canvas),      // Unified surface without blocky column contrast
      "popover": cleanHex(s.elevated),
      "raised": cleanHex(s.elevated),
      "hover": cleanHex(i.hover),
      "selected": cleanHex(i.selected),
      "border": cleanHex(b.subtle),
      "input": cleanHex(s.elevated),
      "muted": cleanHex(t.secondary),
      "dim": cleanHex(t.muted),
      "accent": cleanHex(t.accent),
      "accent_foreground": cleanHex(t.inverse),
      "solid": cleanHex(t.accent),
      "solid_foreground": cleanHex(t.inverse),
      "working": cleanHex(st.modified),
      "blocked": cleanHex(st.error),
      "done": cleanHex(st.created),
      "idle": cleanHex(t.muted)
    }
  };

  return JSON.stringify(themeData, null, 2);
}

module.exports = { generateHerdrJson };
