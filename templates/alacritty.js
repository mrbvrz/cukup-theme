/**
 * Alacritty TOML Template Generator for Cukup Theme
 */

function generateAlacrittyToml(palette, key) {
  const p = palette;
  const ansi = p.ansi;
  const isLight = p.variant === 'light';

  return `# ==============================================================================
# Cukup Theme for Alacritty Terminal
# Variant: ${p.name}
# Description: ${p.description}
# Author: Hasan Suryaman
# Repo: https://github.com/hasansuryaman/cukup-theme
# ==============================================================================

[colors.primary]
background = "${p.surface.canvas}"
foreground = "${p.text.primary}"
bright_foreground = "${isLight ? p.text.primary : ansi.bright_white}"
dim_foreground = "${p.text.muted}"

[colors.cursor]
text = "${p.surface.canvas}"
cursor = "${p.text.accent}"

[colors.selection]
text = "${isLight ? p.surface.canvas : ansi.bright_white}"
background = "${p.interactive.active}"

[colors.normal]
black   = "${ansi.black}"
red     = "${ansi.red}"
green   = "${ansi.green}"
yellow  = "${ansi.yellow}"
blue    = "${ansi.blue}"
magenta = "${ansi.magenta}"
cyan    = "${ansi.cyan}"
white   = "${ansi.white}"

[colors.bright]
black   = "${ansi.bright_black}"
red     = "${ansi.bright_red}"
green   = "${ansi.bright_green}"
yellow  = "${ansi.bright_yellow}"
blue    = "${ansi.bright_blue}"
magenta = "${ansi.bright_magenta}"
cyan    = "${ansi.bright_cyan}"
white   = "${ansi.bright_white}"

[colors.dim]
black   = "${ansi.dim_black}"
red     = "${ansi.dim_red}"
green   = "${ansi.dim_green}"
yellow  = "${ansi.dim_yellow}"
blue    = "${ansi.dim_blue}"
magenta = "${ansi.dim_magenta}"
cyan    = "${ansi.dim_cyan}"
white   = "${ansi.dim_white}"
`;
}

module.exports = { generateAlacrittyToml };
