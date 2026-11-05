/**
 * Web CSS Variables and JSON Tokens Generator for Cukup Theme
 */

function generateCssVariables(palettes) {
  let css = `/* ==============================================================================
 * Cukup Theme — CSS Custom Properties
 * Author: Hasan Suryaman
 * Repo: https://github.com/hasansuryaman/cukup-theme
 * ============================================================================== */

:root,
[data-theme="cukup-senja"] {
`;

  const senja = palettes.senja;
  for (const [sec, values] of Object.entries(senja)) {
    if (typeof values === 'object') {
      for (const [k, v] of Object.entries(values)) {
        if (typeof v === 'string') {
          css += `  --cukup-${sec}-${k}: ${v};\n`;
        }
      }
    }
  }

  css += `}

[data-theme="cukup-malam"] {
`;
  const malam = palettes.malam;
  for (const [sec, values] of Object.entries(malam)) {
    if (typeof values === 'object') {
      for (const [k, v] of Object.entries(values)) {
        if (typeof v === 'string') {
          css += `  --cukup-${sec}-${k}: ${v};\n`;
        }
      }
    }
  }

  css += `}

[data-theme="cukup-kopi"] {
`;
  const kopi = palettes.kopi;
  for (const [sec, values] of Object.entries(kopi)) {
    if (typeof values === 'object') {
      for (const [k, v] of Object.entries(values)) {
        if (typeof v === 'string') {
          css += `  --cukup-${sec}-${k}: ${v};\n`;
        }
      }
    }
  }

  css += `}\n`;
  return css;
}

module.exports = { generateCssVariables };
