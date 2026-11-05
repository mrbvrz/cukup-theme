/**
 * Zed IDE Theme Generator for Cukup Theme System
 */

function buildZedStyle(p, blurred = false) {
  const bg = blurred ? p.bgBlurred : p.bg;
  const editorBg = blurred ? "#00000000" : p.bg;
  const panelBg = blurred ? "#00000000" : p.panelBg;
  const panelOverlayBg = blurred ? (p.panelOverlayBgBlurred || "#181816e6") : (p.panelOverlayBg || p.panelBg);
  const panelOverlayHover = p.panelOverlayHover || p.elementHover;
  const toolbarBg = blurred ? "#00000000" : p.toolbarBg;
  const tabBarBg = blurred ? "#00000000" : p.tabBarBg;
  const tabInactiveBg = blurred ? "#00000000" : p.tabInactiveBg;
  const tabActiveBg = blurred ? "#ffffff08" : p.tabActiveBg;

  const syntax = {
    "attribute": { "color": p.syntax.attribute },
    "boolean": { "color": p.syntax.boolean },
    "comment": { "color": p.syntax.comment, "font_style": "italic" },
    "comment.doc": { "color": p.syntax.comment, "font_style": "italic" },
    "constant": { "color": p.syntax.constant },
    "constructor": { "color": p.syntax.constructor },
    "embedded": { "color": p.syntax.primary },
    "emphasis": { "color": p.ansi.bright_white, "font_style": "italic" },
    "emphasis.strong": { "color": p.ansi.bright_white, "font_weight": 700 },
    "enum": { "color": p.syntax.enum },
    "function": { "color": p.syntax.function },
    "function.method": { "color": p.syntax.function },
    "function.special.definition": { "color": p.syntax.function },
    "hint": { "color": p.syntax.comment },
    "keyword": { "color": p.syntax.keyword },
    "label": { "color": p.syntax.label },
    "link_text": { "color": p.syntax.type, "font_style": "italic" },
    "link_uri": { "color": p.syntax.type },
    "number": { "color": p.syntax.number },
    "operator": { "color": p.syntax.operator },
    "predictive": { "color": p.ansi.bright_black },
    "preproc": { "color": p.syntax.preproc },
    "primary": { "color": p.syntax.primary },
    "property": { "color": p.syntax.property },
    "punctuation": { "color": p.syntax.punctuation },
    "punctuation.bracket": { "color": p.syntax.punctuation },
    "punctuation.delimiter": { "color": p.syntax.punctuation },
    "punctuation.list_marker": { "color": p.syntax.keyword },
    "punctuation.special": { "color": p.syntax.keyword },
    "string": { "color": p.syntax.string },
    "string.escape": { "color": p.syntax.escape },
    "string.regex": { "color": p.syntax.regex },
    "string.special": { "color": p.syntax.string },
    "string.special.symbol": { "color": p.syntax.type },
    "tag": { "color": p.syntax.tag },
    "text.literal": { "color": p.syntax.literal },
    "title": { "color": p.syntax.title, "font_weight": 700 },
    "type": { "color": p.syntax.type },
    "type.builtin": { "color": p.syntax.type },
    "variable": { "color": p.syntax.variable },
    "variable.special": { "color": p.syntax.type }
  };

  const style = {
    "border": p.border,
    "border.variant": p.borderVariant || p.border,
    "border.focused": p.accent,
    "border.selected": p.accent,
    "border.transparent": "#00000000",
    "border.disabled": p.border,
    "background": bg,
    "elevated_surface.background": p.elevatedBg,
    "surface.background": p.surfaceBg,
    "element.background": p.elementBg,
    "element.hover": p.elementHover,
    "element.active": p.elementActive || p.elementHover,
    "element.selected": p.elementSelected || p.elementHover,
    "element.disabled": tabInactiveBg,
    "ghost_element.background": "#00000000",
    "ghost_element.hover": p.elementHover,
    "ghost_element.active": p.elementActive || p.elementHover,
    "ghost_element.selected": p.elementSelected || p.elementHover,
    "ghost_element.disabled": "#00000000",
    "drop_target.background": p.accent + "33",
    "text": p.text,
    "text.muted": p.textMuted,
    "text.accent": p.accent,
    "text.placeholder": p.textMuted + "aa",
    "text.disabled": p.textMuted + "66",
    "icon": p.text,
    "icon.muted": p.textMuted,
    "icon.disabled": p.textMuted + "66",
    "icon.placeholder": p.textMuted + "aa",
    "icon.accent": p.accent,
    "status_bar.background": bg,
    "title_bar.background": bg,
    "title_bar.inactive_background": bg,
    "toolbar.background": toolbarBg,
    "tab_bar.background": tabBarBg,
    "tab.inactive_background": tabInactiveBg,
    "tab.active_background": tabActiveBg,
    "search.match_background": p.searchMatch,
    "panel.background": panelBg,
    "panel.overlay_background": panelOverlayBg,
    "panel.overlay_hover": panelOverlayHover,
    "panel.focused_border": p.accent,
    "panel.indent_guide": p.indentGuide,
    "panel.indent_guide_hover": p.indentGuideActive,
    "panel.indent_guide_active": p.indentGuideActive,
    "pane.focused_border": p.accent,
    "pane_group.border": p.border,
    "scrollbar.thumb.background": p.scrollbarThumb,
    "scrollbar.thumb.hover_background": p.scrollbarThumbHover,
    "scrollbar.thumb.active_background": p.scrollbarThumbActive || p.scrollbarThumbHover,
    "scrollbar.thumb.border": "#00000000",
    "scrollbar.track.background": "#00000000",
    "scrollbar.track.border": "#00000000",
    "editor.foreground": p.text,
    "editor.background": editorBg,
    "editor.gutter.background": editorBg,
    "editor.subheader.background": toolbarBg,
    "editor.active_line.background": p.activeLineBg,
    "editor.highlighted_line.background": p.activeLineBg,
    "editor.line_number": p.lineNumber,
    "editor.active_line_number": p.activeLineNumber,
    "editor.invisible": p.indentGuide,
    "editor.wrap_guide": p.indentGuide,
    "editor.active_wrap_guide": p.indentGuideActive,
    "editor.indent_guide": p.indentGuide,
    "editor.indent_guide_active": p.indentGuideActive,
    "editor.document_highlight.read_background": p.accent + "26",
    "editor.document_highlight.write_background": p.accent + "33",
    "editor.document_highlight.bracket_background": p.accent + "26",
    "terminal.background": p.bg,
    "terminal.foreground": p.text,
    "terminal.bright_foreground": p.ansi.bright_white,
    "terminal.dim_foreground": p.textMuted,
    "terminal.ansi.background": p.bg,
    "terminal.ansi.black": p.ansi.black,
    "terminal.ansi.bright_black": p.ansi.bright_black,
    "terminal.ansi.dim_black": p.ansi.dim_black,
    "terminal.ansi.red": p.ansi.red,
    "terminal.ansi.bright_red": p.ansi.bright_red,
    "terminal.ansi.dim_red": p.ansi.dim_red,
    "terminal.ansi.green": p.ansi.green,
    "terminal.ansi.bright_green": p.ansi.bright_green,
    "terminal.ansi.dim_green": p.ansi.dim_green,
    "terminal.ansi.yellow": p.ansi.yellow,
    "terminal.ansi.bright_yellow": p.ansi.bright_yellow,
    "terminal.ansi.dim_yellow": p.ansi.dim_yellow,
    "terminal.ansi.blue": p.ansi.blue,
    "terminal.ansi.bright_blue": p.ansi.bright_blue,
    "terminal.ansi.dim_blue": p.ansi.dim_blue,
    "terminal.ansi.magenta": p.ansi.magenta,
    "terminal.ansi.bright_magenta": p.ansi.bright_magenta,
    "terminal.ansi.dim_magenta": p.ansi.dim_magenta,
    "terminal.ansi.cyan": p.ansi.cyan,
    "terminal.ansi.bright_cyan": p.ansi.bright_cyan,
    "terminal.ansi.dim_cyan": p.ansi.dim_cyan,
    "terminal.ansi.white": p.ansi.white,
    "terminal.ansi.bright_white": p.ansi.bright_white,
    "terminal.ansi.dim_white": p.ansi.dim_white,
    "link_text.hover": p.accent,
    "created": p.created,
    "created.background": p.created + "22",
    "created.border": p.created,
    "modified": p.modified,
    "modified.background": p.modified + "22",
    "modified.border": p.modified,
    "deleted": p.deleted,
    "deleted.background": p.deleted + "22",
    "deleted.border": p.deleted,
    "conflict": p.deleted,
    "conflict.background": p.deleted + "22",
    "conflict.border": p.deleted,
    "renamed": p.accent,
    "renamed.background": p.accent + "22",
    "renamed.border": p.accent,
    "ignored": p.textMuted + "88",
    "ignored.background": "#00000000",
    "ignored.border": "#00000000",
    "hidden": p.textMuted + "aa",
    "hidden.background": "#00000000",
    "hidden.border": "#00000000",
    "hint": p.textMuted,
    "hint.background": p.textMuted + "22",
    "hint.border": p.textMuted,
    "info": p.accent,
    "info.background": p.accent + "22",
    "info.border": p.accent,
    "warning": p.warning,
    "warning.background": p.warning + "22",
    "warning.border": p.warning,
    "error": p.error,
    "error.background": p.error + "22",
    "error.border": p.error,
    "success": p.created,
    "success.background": p.created + "22",
    "success.border": p.created,
    "unreachable": p.textMuted + "66",
    "unreachable.background": "#00000000",
    "unreachable.border": "#00000000",
    "predictive": p.textMuted + "99",
    "predictive.background": "#00000000",
    "predictive.border": "#00000000",
    "players": [
      { "cursor": p.accent, "selection": p.accent + "33", "background": p.accent },
      { "cursor": p.syntax.function, "selection": p.syntax.function + "33", "background": p.syntax.function },
      { "cursor": p.syntax.string, "selection": p.syntax.string + "33", "background": p.syntax.string },
      { "cursor": p.warning, "selection": p.warning + "33", "background": p.warning }
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
      }
    ]
  };

  return JSON.stringify(themeData, null, 2);
}

module.exports = { generateZedJson };
