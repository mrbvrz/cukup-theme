/**
 * VS Code Color Theme Generator for Cukup Theme System
 */

function generateVsCodeJson(palette) {
  const p = palette;
  const s = p.surface;
  const b = p.border;
  const t = p.text;
  const i = p.interactive;
  const syn = p.syntax;
  const a = p.ansi;

  const theme = {
    "$schema": "vscode://schemas/color-theme",
    "name": `Cukup ${p.name.replace("Cukup ", "")}`,
    "type": p.variant || "dark",
    "colors": {
      "editor.background": s.canvas,
      "editor.foreground": t.primary,
      "editorCursor.foreground": t.accent,
      "editor.lineHighlightBackground": s.activeLine.slice(0, 7) + "33",
      "editorLineNumber.foreground": t.muted,
      "editorLineNumber.activeForeground": t.secondary,
      "editorIndentGuide.background": b.subtle,
      "editorIndentGuide.activeBackground": b.default,
      "editorWhitespace.foreground": b.subtle,
      "editor.selectionBackground": i.selected + "88",
      "sideBar.background": s.panel,
      "sideBar.foreground": t.primary,
      "sideBar.border": b.default,
      "sideBarTitle.foreground": t.primary,
      "sideBarSectionHeader.background": s.panel,
      "sideBarSectionHeader.foreground": t.primary,
      "activityBar.background": s.tabBar,
      "activityBar.foreground": t.primary,
      "activityBar.inactiveForeground": t.muted,
      "activityBar.activeBorder": t.accent,
      "titleBar.activeBackground": s.canvas,
      "titleBar.activeForeground": t.primary,
      "titleBar.inactiveBackground": s.canvas,
      "titleBar.inactiveForeground": t.muted,
      "statusBar.background": s.canvas,
      "statusBar.foreground": t.primary,
      "statusBar.border": b.default,
      "tab.activeBackground": s.canvas,
      "tab.activeForeground": t.primary,
      "tab.inactiveBackground": s.tabInactive,
      "tab.inactiveForeground": t.muted,
      "tab.border": b.default,
      "terminal.background": s.canvas,
      "terminal.foreground": t.primary,
      "terminal.ansiBlack": a.black,
      "terminal.ansiRed": a.red,
      "terminal.ansiGreen": a.green,
      "terminal.ansiYellow": a.yellow,
      "terminal.ansiBlue": a.blue,
      "terminal.ansiMagenta": a.magenta,
      "terminal.ansiCyan": a.cyan,
      "terminal.ansiWhite": a.white,
      "terminal.ansiBrightBlack": a.bright_black,
      "terminal.ansiBrightRed": a.bright_red,
      "terminal.ansiBrightGreen": a.bright_green,
      "terminal.ansiBrightYellow": a.bright_yellow,
      "terminal.ansiBrightBlue": a.bright_blue,
      "terminal.ansiBrightMagenta": a.bright_magenta,
      "terminal.ansiBrightCyan": a.bright_cyan,
      "terminal.ansiBrightWhite": a.bright_white
    },
    "tokenColors": [
      {
        "name": "Comments",
        "scope": ["comment", "punctuation.definition.comment"],
        "settings": { "foreground": syn.comment, "fontStyle": "italic" }
      },
      {
        "name": "Variables & Properties (Clean Neutral Text)",
        "scope": [
          "variable",
          "variable.other",
          "variable.other.property",
          "variable.other.object.property",
          "support.type.property-name"
        ],
        "settings": { "foreground": syn.variable }
      },
      {
        "name": "Parameters",
        "scope": ["variable.parameter"],
        "settings": { "foreground": syn.parameter }
      },
      {
        "name": "Functions & Methods (Hero)",
        "scope": [
          "entity.name.function",
          "support.function",
          "meta.function-call",
          "variable.function"
        ],
        "settings": { "foreground": syn.function }
      },
      {
        "name": "Strings & Literals",
        "scope": ["string", "punctuation.definition.string"],
        "settings": { "foreground": syn.string }
      },
      {
        "name": "Keywords & Control Flow",
        "scope": [
          "keyword",
          "keyword.control",
          "storage.type",
          "storage.modifier"
        ],
        "settings": { "foreground": syn.keyword, "fontStyle": "italic" }
      },
      {
        "name": "Operators",
        "scope": ["keyword.operator"],
        "settings": { "foreground": syn.operator }
      },
      {
        "name": "Types & Classes",
        "scope": [
          "entity.name.type",
          "entity.name.class",
          "support.class",
          "support.type"
        ],
        "settings": { "foreground": syn.type }
      },
      {
        "name": "Constants & Numbers",
        "scope": [
          "constant",
          "constant.numeric",
          "constant.language",
          "constant.character"
        ],
        "settings": { "foreground": syn.constant }
      },
      {
        "name": "HTML & JSX Tags",
        "scope": ["entity.name.tag", "meta.tag.sgml"],
        "settings": { "foreground": syn.tag }
      },
      {
        "name": "HTML & JSX Attributes",
        "scope": ["entity.other.attribute-name"],
        "settings": { "foreground": syn.attribute }
      }
    ]
  };

  return JSON.stringify(theme, null, 2);
}

module.exports = { generateVsCodeJson };
