/**
 * Web CSS Variables and JSON Tokens Generator for Cukup Theme
 */

function generateCssVariables(palettes) {
  let css = `/* ==============================================================================
 * Cukup Theme — CSS Custom Properties
 * Author: Hasan Suryaman
 * Repo: https://github.com/hasansuryaman/cukup-theme
 * ============================================================================== */
`;

  let isFirst = true;
  for (const [name, palette] of Object.entries(palettes)) {
    const selector = isFirst ? `:root,\n[data-theme="cukup-${name}"]` : `[data-theme="cukup-${name}"]`;
    isFirst = false;

    css += `\n${selector} {\n`;
    for (const [sec, values] of Object.entries(palette)) {
      if (typeof values === 'object') {
        for (const [k, v] of Object.entries(values)) {
          if (typeof v === 'string') {
            css += `  --cukup-${sec}-${k}: ${v};\n`;
          }
        }
      }
    }
    css += `}\n`;
  }

  return css;
}

module.exports = { generateCssVariables };
