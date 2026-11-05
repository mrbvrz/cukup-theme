/**
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
            DEFAULT: "#181816",
            panel: "#131311",
            elevated: "#1F1F1C",
            surface: "#161614",
          },
          border: {
            DEFAULT: "#2B2B27",
            subtle: "#242420",
            focused: "#E89058",
          },
          text: {
            DEFAULT: "#D8D5CD",
            secondary: "#C4C1B9",
            muted: "#78776F",
            accent: "#E89058",
          },
          terracotta: "#E89058",
          lilac: "#B294C7",
          celadon: "#6BAFAD",
          rose: "#DE6E75",
          amber: "#DDA861",
          sage: "#89BA81",
        }
      }
    }
  }
};
