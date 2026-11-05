/**
 * Zed IDE Theme Generator for Cukup Theme System
 */

function buildZedStyle(p, blurred = false) {
  const s = p.surface;
  const b = p.border;
  const t = p.text;
  const i = p.interactive;
  const st = p.status;
  const syn = p.syntax;
  const a = p.ansi;

  const isLight = p.variant === "light";

  const bg = blurred ? s.canvasBlurred : s.canvas;
  const editorBg = blurred ? "#00000000" : s.canvas;
  const panelBg = blurred ? "#00000000" : s.panel;
  const panelOverlayBg = blurred ? s.panelOverlayBlurred : s.panelOverlay;
  const toolbarBg = blurred ? "#00000000" : s.toolbar;
  const tabBarBg = blurred ? "#00000000" : s.tabBar;
  const tabInactiveBg = blurred ? "#00000000" : s.tabInactive;
  const tabActiveBg = blurred ? (isLight ? "#0000000a" : "#ffffff08") : s.tabActive;
  const terminalBg = blurred ? "#00000000" : s.canvas;

  const syntax = {
    "attribute": { "color": syn.attribute },
    "boolean": { "color": syn.boolean },
    "comment": { "color": syn.comment, "font_style": "italic" },
    "comment.doc": { "color": syn.comment, "font_style": "italic" },
    "constant": { "color": syn.constant },
    "constructor": { "color": syn.constructor },
    "embedded": { "color": syn.function },
    "emphasis": { "color": syn.emphasis, "font_style": "italic" },
    "emphasis.strong": { "color": syn.emphasis, "font_weight": 700 },
    "enum": { "color": syn.type },
    "function": { "color": syn.function },
    "function.method": { "color": syn.method },
    "function.special.definition": { "color": syn.function },
    "hint": { "color": syn.comment },
    "keyword": { "color": syn.keyword },
    "label": { "color": syn.keyword },
    "link_text": { "color": syn.type, "font_style": "italic" },
    "link_uri": { "color": syn.type },
    "number": { "color": syn.number },
    "operator": { "color": syn.operator },
    "predictive": { "color": a.bright_black },
    "preproc": { "color": syn.keyword },
    "primary": { "color": syn.primary },
    "property": { "color": syn.property },
    "punctuation": { "color": syn.punctuation },
    "punctuation.bracket": { "color": syn.punctuation },
    "punctuation.delimiter": { "color": syn.punctuation },
    "punctuation.list_marker": { "color": syn.keyword },
    "punctuation.special": { "color": syn.keyword },
    "string": { "color": syn.string },
    "string.escape": { "color": syn.escape },
    "string.regex": { "color": syn.regex },
    "string.special": { "color": syn.string },
    "string.special.symbol": { "color": syn.constant },
    "tag": { "color": syn.tag },
    "text.literal": { "color": syn.literal },
    "title": { "color": syn.title, "font_weight": 700 },
    "type": { "color": syn.type },
    "type.builtin": { "color": syn.builtin },
    "variable": { "color": syn.variable },
    "variable.special": { "color": syn.constant }
  };

  const style = {
    "border": b.default,
    "border.variant": b.subtle,
    "border.focused": b.focused,
    "border.selected": b.selected,
    "border.transparent": b.transparent,
    "border.disabled": b.default,
    "background": bg,
    "elevated_surface.background": s.elevated,
    "surface.background": s.surface,
    "element.background": i.element,
    "element.hover": i.hover,
    "element.active": i.active,
    "element.selected": i.selected,
    "element.disabled": tabInactiveBg,
    "ghost_element.background": "#00000000",
    "ghost_element.hover": i.hover,
    "ghost_element.active": i.active,
    "ghost_element.selected": i.selected,
    "ghost_element.disabled": "#00000000",
    "drop_target.background": i.dropTarget,
    "text": t.primary,
    "text.muted": t.muted,
    "text.accent": t.accent,
    "text.placeholder": t.placeholder,
    "text.disabled": t.disabled,
    "icon": t.primary,
    "icon.muted": t.muted,
    "icon.disabled": t.disabled,
    "icon.placeholder": t.placeholder,
    "icon.accent": t.accent,
    "status_bar.background": bg,
    "title_bar.background": bg,
    "title_bar.inactive_background": bg,
    "toolbar.background": toolbarBg,
    "tab_bar.background": tabBarBg,
    "tab.inactive_background": tabInactiveBg,
    "tab.active_background": tabActiveBg,
    "search.match_background": i.dropTarget,
    "panel.background": panelBg,
    "panel.overlay_background": panelOverlayBg,
    "panel.overlay_hover": i.hover,
    "panel.focused_border": b.focused,
    "panel.indent_guide": b.subtle,
    "panel.indent_guide_hover": b.default,
    "panel.indent_guide_active": b.default,
    "pane.focused_border": b.focused,
    "pane_group.border": b.default,
    "scrollbar.thumb.background": i.scrollbarThumb,
    "scrollbar.thumb.hover_background": i.scrollbarThumbHover,
    "scrollbar.thumb.active_background": i.scrollbarThumbActive,
    "scrollbar.thumb.border": "#00000000",
    "scrollbar.track.background": "#00000000",
    "scrollbar.track.border": "#00000000",
    "editor.foreground": t.primary,
    "editor.background": editorBg,
    "editor.gutter.background": editorBg,
    "editor.subheader.background": toolbarBg,
    "editor.active_line.background": s.activeLine,
    "editor.highlighted_line.background": s.activeLine,
    "editor.line_number": t.muted,
    "editor.active_line_number": t.secondary,
    "editor.invisible": b.subtle,
    "editor.wrap_guide": b.subtle,
    "editor.active_wrap_guide": b.default,
    "editor.indent_guide": b.subtle,
    "editor.indent_guide_active": b.default,
    "editor.document_highlight.read_background": t.accent + "26",
    "editor.document_highlight.write_background": t.accent + "33",
    "editor.document_highlight.bracket_background": t.accent + "26",
    "terminal.background": terminalBg,
    "terminal.foreground": t.primary,
    "terminal.bright_foreground": a.bright_white,
    "terminal.dim_foreground": t.muted,
    "terminal.ansi.background": terminalBg,
    "terminal.ansi.black": a.black,
    "terminal.ansi.bright_black": a.bright_black,
    "terminal.ansi.dim_black": a.dim_black,
    "terminal.ansi.red": a.red,
    "terminal.ansi.bright_red": a.bright_red,
    "terminal.ansi.dim_red": a.dim_red,
    "terminal.ansi.green": a.green,
    "terminal.ansi.bright_green": a.bright_green,
    "terminal.ansi.dim_green": a.dim_green,
    "terminal.ansi.yellow": a.yellow,
    "terminal.ansi.bright_yellow": a.bright_yellow,
    "terminal.ansi.dim_yellow": a.dim_yellow,
    "terminal.ansi.blue": a.blue,
    "terminal.ansi.bright_blue": a.bright_blue,
    "terminal.ansi.dim_blue": a.dim_blue,
    "terminal.ansi.magenta": a.magenta,
    "terminal.ansi.bright_magenta": a.bright_magenta,
    "terminal.ansi.dim_magenta": a.dim_magenta,
    "terminal.ansi.cyan": a.cyan,
    "terminal.ansi.bright_cyan": a.bright_cyan,
    "terminal.ansi.dim_cyan": a.dim_cyan,
    "terminal.ansi.white": a.white,
    "terminal.ansi.bright_white": a.bright_white,
    "terminal.ansi.dim_white": a.dim_white,
    "link_text.hover": t.accent,
    "created": st.created,
    "created.background": st.created + "22",
    "created.border": st.created,
    "modified": st.modified,
    "modified.background": st.modified + "22",
    "modified.border": st.modified,
    "deleted": st.deleted,
    "deleted.background": st.deleted + "22",
    "deleted.border": st.deleted,
    "conflict": st.deleted,
    "conflict.background": st.deleted + "22",
    "conflict.border": st.deleted,
    "renamed": t.accent,
    "renamed.background": t.accent + "22",
    "renamed.border": t.accent,
    "ignored": t.muted + "88",
    "ignored.background": "#00000000",
    "ignored.border": "#00000000",
    "hidden": t.muted + "aa",
    "hidden.background": "#00000000",
    "hidden.border": "#00000000",
    "hint": t.muted,
    "hint.background": t.muted + "22",
    "hint.border": t.muted,
    "info": st.info,
    "info.background": st.info + "22",
    "info.border": st.info,
    "warning": st.warning,
    "warning.background": st.warning + "22",
    "warning.border": st.warning,
    "error": st.error,
    "error.background": st.error + "22",
    "error.border": st.error,
    "success": st.created,
    "success.background": st.created + "22",
    "success.border": st.created,
    "unreachable": t.muted + "66",
    "unreachable.background": "#00000000",
    "unreachable.border": "#00000000",
    "predictive": t.muted + "99",
    "predictive.background": "#00000000",
    "predictive.border": "#00000000",
    "players": [
      { "cursor": t.accent, "selection": t.accent + "33", "background": t.accent },
      { "cursor": syn.function, "selection": syn.function + "33", "background": syn.function },
      { "cursor": syn.string, "selection": syn.string + "33", "background": syn.string },
      { "cursor": st.warning, "selection": st.warning + "33", "background": st.warning }
    ],
    "syntax": syntax
  };

  if (blurred) {
    style["background.appearance"] = "blurred";
  } else {
    style["background.appearance"] = "opaque";
  }

  return style;
}

function generateZedJson(palettes) {
  const themeData = {
    "$schema": "https://zed.dev/schema/themes/v0.2.0.json",
    "name": "Cukup",
    "author": "Hasan Suryaman",
    "themes": [
      {
        "name": "Cukup Senja (Blurred)",
        "appearance": "dark",
        "style": buildZedStyle(palettes.senja, true)
      },
      {
        "name": "Cukup Senja (Solid)",
        "appearance": "dark",
        "style": buildZedStyle(palettes.senja, false)
      },
      {
        "name": "Cukup Malam (Blurred)",
        "appearance": "dark",
        "style": buildZedStyle(palettes.malam, true)
      },
      {
        "name": "Cukup Malam (Solid)",
        "appearance": "dark",
        "style": buildZedStyle(palettes.malam, false)
      },
      {
        "name": "Cukup Kopi (Blurred)",
        "appearance": "dark",
        "style": buildZedStyle(palettes.kopi, true)
      },
      {
        "name": "Cukup Kopi (Solid)",
        "appearance": "dark",
        "style": buildZedStyle(palettes.kopi, false)
      },
      {
        "name": "Cukup Light (Blurred)",
        "appearance": "light",
        "style": buildZedStyle(palettes.terang, true)
      },
      {
        "name": "Cukup Light (Solid)",
        "appearance": "light",
        "style": buildZedStyle(palettes.terang, false)
      },
      {
        "name": "Cukup Terang (Blurred)",
        "appearance": "light",
        "style": buildZedStyle(palettes.terang, true)
      },
      {
        "name": "Cukup Terang (Solid)",
        "appearance": "light",
        "style": buildZedStyle(palettes.terang, false)
      }
    ]
  };

  return JSON.stringify(themeData, null, 2);
}

module.exports = { generateZedJson };
