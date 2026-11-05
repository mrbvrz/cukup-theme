/**
 * Zellij Theme Generator for Cukup Theme (KDL format)
 */

function generateZellijKdl(palettes) {
  let kdl = `// ==============================================================================
// Cukup Themes for Zellij Terminal Multiplexer
// Author: Hasan Suryaman
// Repo: https://github.com/hasansuryaman/cukup-theme
// ==============================================================================

themes {
`;

  for (const [key, p] of Object.entries(palettes)) {
    const a = p.ansi;
    kdl += `    cukup-${key} {
        fg "${p.text.primary}"
        bg "${p.surface.canvas}"
        black "${a.black}"
        red "${a.red}"
        green "${a.green}"
        yellow "${a.yellow}"
        blue "${a.blue}"
        magenta "${a.magenta}"
        cyan "${a.cyan}"
        white "${a.white}"
        orange "${p.text.accent}"
    }
`;
  }

  kdl += `}\n`;
  return kdl;
}

module.exports = { generateZellijKdl };
