/**
 * Tailwind CSS Preset Plugin Generator for Cukup Theme
 */

function generateTailwindPreset(palettes) {
  const p = palettes.senja;

  return `/**
 * Cukup Theme — Tailwind CSS Preset
 * Author: Hasan Suryaman
 * Repo: https://github.com/hasansuryaman/cukup-theme
 *
 * Usage in tailwind.config.js:
 *   presets: [require('@cukup/tailwind-preset')]
 */

module.exports = {
  theme: {
    extend: {
      colors: {
        cukup: {
          bg: {
            DEFAULT: "${p.surface.canvas}",
            panel: "${p.surface.panel}",
            elevated: "${p.surface.elevated}",
            surface: "${p.surface.surface}",
          },
          border: {
            DEFAULT: "${p.border.default}",
            subtle: "${p.border.subtle}",
            focused: "${p.border.focused}",
          },
          text: {
            DEFAULT: "${p.text.primary}",
            secondary: "${p.text.secondary}",
            muted: "${p.text.muted}",
            accent: "${p.text.accent}",
          },
          terracotta: "${p.syntax.function}",
          lilac: "${p.syntax.string}",
          celadon: "${p.syntax.type}",
          rose: "${p.syntax.keyword}",
          amber: "${p.syntax.constant}",
          sage: "${p.syntax.tag}",
        }
      }
    }
  }
};
`;
}

module.exports = { generateTailwindPreset };
