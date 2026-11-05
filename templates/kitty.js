/**
 * Kitty Terminal Configuration Generator for Cukup Theme
 */

function generateKittyConf(palette) {
  const p = palette;
  const a = p.ansi;

  return `# ==============================================================================
# Cukup Theme for Kitty Terminal
# Variant: ${p.name}
# Author: Hasan Suryaman
# Repo: https://github.com/hasansuryaman/cukup-theme
# ==============================================================================

background            ${p.surface.canvas}
foreground            ${p.text.primary}
selection_background   ${p.interactive.active}
selection_foreground   ${a.bright_white}

cursor                ${p.text.accent}
cursor_text_color     ${p.surface.canvas}

# URL underline color when hovering with mouse
url_color             ${p.text.accent}

# Kitty window border colors
active_border_color   ${p.border.focused}
inactive_border_color ${p.border.default}

# Tab bar colors
active_tab_background   ${p.surface.canvas}
active_tab_foreground   ${p.text.primary}
inactive_tab_background ${p.surface.panel}
inactive_tab_foreground ${p.text.muted}

# The basic 16 colors
# Black
color0 ${a.black}
color8 ${a.bright_black}

# Red
color1 ${a.red}
color9 ${a.bright_red}

# Green
color2  ${a.green}
color10 ${a.bright_green}

# Yellow
color3  ${a.yellow}
color11 ${a.bright_yellow}

# Blue
color4  ${a.blue}
color12 ${a.bright_blue}

# Magenta
color5  ${a.magenta}
color13 ${a.bright_magenta}

# Cyan
color6  ${a.cyan}
color14 ${a.bright_cyan}

# White
color7  ${a.white}
color15 ${a.bright_white}
`;
}

module.exports = { generateKittyConf };
