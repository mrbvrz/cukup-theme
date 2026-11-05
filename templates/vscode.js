/**
 * VS Code Color Theme Generator for Cukup Theme System
 */

function generateVsCodeJson(palette) {
  const p = palette;
  const s = p.syntax;
  const a = p.ansi;

  const theme = {
    "$schema": "vscode://schemas/color-theme",
    "name": `Cukup ${p.name.replace("Cukup ", "")}`,
    "type": "dark",
    "colors": {
      "editor.background": p.bg,
      "editor.foreground": p.text,
      "editorCursor.foreground": p.accent,
      "editor.lineHighlightBackground": p.activeLineBg.slice(0, 7) + "40",
      "editorLineNumber.foreground": p.lineNumber,
      "editorLineNumber.activeForeground": p.activeLineNumber,
      "editorIndentGuide.background": p.indentGuide,
      "editorIndentGuide.activeBackground": p.indentGuideActive,
      "editorWhitespace.foreground": p.indentGuide,
      "editor.selectionBackground": p.elementSelected + "88",
      "sideBar.background": p.panelBg,
      "sideBar.foreground": p.text,
      "sideBar.border": p.border,
      "sideBarTitle.foreground": p.text,
      "sideBarSectionHeader.background": p.panelBg,
      "sideBarSectionHeader.foreground": p.text,
      "activityBar.background": p.tabBarBg,
      "activityBar.foreground": p.text,
      "activityBar.inactiveForeground": p.textMuted,
      "activityBar.activeBorder": p.accent,
      "titleBar.activeBackground": p.bg,
      "titleBar.activeForeground": p.text,
      "titleBar.inactiveBackground": p.bg,
      "titleBar.inactiveForeground": p.textMuted,
      "statusBar.background": p.bg,
      "statusBar.foreground": p.text,
      "statusBar.border": p.border,
      "tab.activeBackground": p.bg,
      "tab.activeForeground": p.text,
      "tab.inactiveBackground": p.tabInactiveBg,
      "tab.inactiveForeground": p.textMuted,
      "tab.border": p.border,
      "terminal.background": p.bg,
      "terminal.foreground": p.text,
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
        "settings": { "foreground": s.comment, "fontStyle": "italic" }
      },
      {
        "name": "Functions & Methods (Hero)",
        "scope": [
          "entity.name.function",
          "support.function",
          "meta.function-call",
          "variable.function"
        ],
        "settings": { "foreground": s.function }
      },
      {
        "name": "Properties & Variables",
        "scope": [
          "variable",
          "variable.other.property",
          "variable.other.object.property",
          "support.type.property-name"
        ],
        "settings": { "foreground": s.property }
      },
      {
        "name": "Strings & Literals",
        "scope": ["string", "punctuation.definition.string"],
        "settings": { "foreground": s.string }
      },
      {
        "name": "Keywords & Operators",
        "scope": [
          "keyword",
          "keyword.control",
          "keyword.operator",
          "storage.type",
          "storage.modifier"
        ],
        "settings": { "foreground": s.keyword }
      },
      {
        "name": "Types & Classes",
        "scope": [
          "entity.name.type",
          "entity.name.class",
          "support.class",
          "support.type"
        ],
        "settings": { "foreground": s.type }
      },
      {
        "name": "Constants & Numbers",
        "scope": [
          "constant",
          "constant.numeric",
          "constant.language",
          "constant.character"
        ],
        "settings": { "foreground": s.constant }
      },
      {
        "name": "HTML & JSX Tags",
        "scope": ["entity.name.tag", "meta.tag.sgml"],
        "settings": { "foreground": s.tag }
      }
    ]
  };

  return JSON.stringify(theme, null, 2);
}

module.exports = { generateVsCodeJson };
