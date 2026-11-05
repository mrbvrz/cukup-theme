#!/usr/bin/env node
/**
 * =============================================================================
 * Cukup Multi-Platform Theme Compiler (Advanced Edition)
 * =============================================================================
 * Single Source of Truth -> Alacritty, Zed, VS Code, iTerm2, Kitty, Zellij, Web, Tailwind
 *
 * Usage:
 *   node build.js                  # Compile all targets
 *   node build.js --target alacritty
 *   node build.js --target zed
 *   node build.js --target vscode
 *   node build.js --target iterm
 *   node build.js --target kitty
 *   node build.js --target zellij
 *   node build.js --target web
 * =============================================================================
 */

const fs = require('fs');
const path = require('path');

const { generateAlacrittyToml } = require('./templates/alacritty');
const { generateZedJson } = require('./templates/zed');
const { generateVsCodeJson } = require('./templates/vscode');
const { generateItermcolors } = require('./templates/iterm2');
const { generateKittyConf } = require('./templates/kitty');
const { generateZellijKdl } = require('./templates/zellij');
const { generateCssVariables } = require('./templates/web');
const { generateTailwindPreset } = require('./templates/tailwind');
const { generateTdesktopColors, generateTelegramMacosPalette, createSolidPng } = require('./templates/telegram');
const { generateT3CodeJson, generateT3UnifiedThemeJson } = require('./templates/t3code');
const { execSync } = require('child_process');

// Paths
const TOKENS_PATH = path.join(__dirname, 'tokens', 'palette.json');
const DIST_DIR = path.join(__dirname, 'dist');

function loadTokens() {
  const raw = fs.readFileSync(TOKENS_PATH, 'utf8');
  return JSON.parse(raw);
}

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function buildAlacritty(palettes) {
  console.log('📦 [1/8] Building Alacritty themes...');
  const outDir = path.join(DIST_DIR, 'alacritty');
  ensureDir(outDir);

  for (const [key, palette] of Object.entries(palettes)) {
    const toml = generateAlacrittyToml(palette, key);
    const outFile = path.join(outDir, `cukup-${key}.toml`);
    fs.writeFileSync(outFile, toml, 'utf8');
    console.log(`   ✓ ${path.relative(__dirname, outFile)}`);
  }
}

function buildZed(palettes) {
  console.log('📦 [2/8] Building Zed theme...');
  const outDir = path.join(DIST_DIR, 'zed');
  ensureDir(outDir);

  const zedJson = generateZedJson(palettes);
  const outFile = path.join(outDir, 'cukup.json');
  fs.writeFileSync(outFile, zedJson, 'utf8');
  console.log(`   ✓ ${path.relative(__dirname, outFile)}`);
}

function buildVsCode(palettes) {
  console.log('📦 [3/8] Building VS Code themes...');
  const outDir = path.join(DIST_DIR, 'vscode');
  ensureDir(outDir);

  for (const [key, palette] of Object.entries(palettes)) {
    const json = generateVsCodeJson(palette);
    const outFile = path.join(outDir, `cukup-${key}.json`);
    fs.writeFileSync(outFile, json, 'utf8');
    console.log(`   ✓ ${path.relative(__dirname, outFile)}`);
  }
}

function buildIterm(palettes) {
  console.log('📦 [4/8] Building iTerm2 color schemes...');
  const outDir = path.join(DIST_DIR, 'iterm2');
  ensureDir(outDir);

  for (const [key, palette] of Object.entries(palettes)) {
    const xml = generateItermcolors(palette);
    const outFile = path.join(outDir, `Cukup-${key.charAt(0).toUpperCase() + key.slice(1)}.itermcolors`);
    fs.writeFileSync(outFile, xml, 'utf8');
    console.log(`   ✓ ${path.relative(__dirname, outFile)}`);
  }
}

function buildKitty(palettes) {
  console.log('📦 [5/8] Building Kitty terminal themes...');
  const outDir = path.join(DIST_DIR, 'kitty');
  ensureDir(outDir);

  for (const [key, palette] of Object.entries(palettes)) {
    const conf = generateKittyConf(palette);
    const outFile = path.join(outDir, `cukup-${key}.conf`);
    fs.writeFileSync(outFile, conf, 'utf8');
    console.log(`   ✓ ${path.relative(__dirname, outFile)}`);
  }
}

function buildZellij(palettes) {
  console.log('📦 [6/8] Building Zellij themes...');
  const outDir = path.join(DIST_DIR, 'zellij');
  ensureDir(outDir);

  const kdl = generateZellijKdl(palettes);
  const outFile = path.join(outDir, 'cukup.kdl');
  fs.writeFileSync(outFile, kdl, 'utf8');
  console.log(`   ✓ ${path.relative(__dirname, outFile)}`);
}

function buildWeb(palettes) {
  console.log('📦 [7/8] Building Web CSS variables & JSON tokens...');
  const outDir = path.join(DIST_DIR, 'web');
  ensureDir(outDir);

  const css = generateCssVariables(palettes);
  fs.writeFileSync(path.join(outDir, 'tokens.css'), css, 'utf8');
  fs.writeFileSync(path.join(outDir, 'tokens.json'), JSON.stringify(palettes, null, 2), 'utf8');
  console.log(`   ✓ ${path.relative(__dirname, path.join(outDir, 'tokens.css'))}`);
  console.log(`   ✓ ${path.relative(__dirname, path.join(outDir, 'tokens.json'))}`);
}

function buildTailwind(palettes) {
  console.log('📦 [8/9] Building Tailwind CSS preset...');
  const outDir = path.join(DIST_DIR, 'tailwind');
  ensureDir(outDir);

  const js = generateTailwindPreset(palettes);
  const outFile = path.join(outDir, 'cukup-preset.js');
  fs.writeFileSync(outFile, js, 'utf8');
  console.log(`   ✓ ${path.relative(__dirname, outFile)}`);
}

function buildTelegram(palettes) {
  console.log('📦 [9/10] Building Telegram Desktop & macOS themes...');
  const outDir = path.join(DIST_DIR, 'telegram');
  ensureDir(outDir);

  for (const [key, palette] of Object.entries(palettes)) {
    // 1. Telegram macOS (.palette)
    const macosPalette = generateTelegramMacosPalette(palette);
    const macosFile = path.join(outDir, `Cukup-${key.charAt(0).toUpperCase() + key.slice(1)}.palette`);
    fs.writeFileSync(macosFile, macosPalette, 'utf8');
    console.log(`   ✓ ${path.relative(__dirname, macosFile)}`);

    // 2. Telegram Desktop (.tdesktop-theme)
    const tdesktopColors = generateTdesktopColors(palette, key);
    const themeDir = path.join(outDir, `tdesktop_${key}`);
    ensureDir(themeDir);
    fs.writeFileSync(path.join(themeDir, 'colors.tdesktop-theme'), tdesktopColors, 'utf8');
    const png = createSolidPng(palette.surface.canvas);
    fs.writeFileSync(path.join(themeDir, 'tiled.png'), png);

    const zipFile = path.join(outDir, `cukup-${key}.tdesktop-theme`);
    execSync(`cd "${themeDir}" && zip -q -r "${zipFile}" colors.tdesktop-theme tiled.png`);
    execSync(`rm -rf "${themeDir}"`);
    console.log(`   ✓ ${path.relative(__dirname, zipFile)}`);
  }
}

function buildT3Code(palettes) {
  console.log('📦 [10/10] Building T3 Code themes...');
  const outDir = path.join(DIST_DIR, 't3code');
  ensureDir(outDir);

  // 1. Unified single theme (Cukup with Kopi dark and Terang light variant)
  const unifiedJson = generateT3UnifiedThemeJson(palettes.kopi, palettes.terang);
  const unifiedFile = path.join(outDir, 'cukup.json');
  fs.writeFileSync(unifiedFile, unifiedJson, 'utf8');
  console.log(`   ✓ ${path.relative(__dirname, unifiedFile)} (Single Grouped Theme)`);

  // 2. Individual standalone variants under "Cukup" collection
  for (const [key, palette] of Object.entries(palettes)) {
    const json = generateT3CodeJson(palette, key);
    const outFile = path.join(outDir, `cukup-${key}.json`);
    fs.writeFileSync(outFile, json, 'utf8');
    console.log(`   ✓ ${path.relative(__dirname, outFile)}`);
  }
}

function main() {
  const args = process.argv.slice(2);
  const targetIndex = args.indexOf('--target');
  const target = targetIndex !== -1 ? args[targetIndex + 1] : 'all';

  console.log(`\n🌿 Cukup Multi-Platform Theme Compiler (v1.1.0) [Target: ${target}]\n`);
  const data = loadTokens();
  const palettes = data.palettes;

  ensureDir(DIST_DIR);

  if (target === 'all' || target === 'alacritty') buildAlacritty(palettes);
  if (target === 'all' || target === 'zed') buildZed(palettes);
  if (target === 'all' || target === 'vscode') buildVsCode(palettes);
  if (target === 'all' || target === 'iterm' || target === 'iterm2') buildIterm(palettes);
  if (target === 'all' || target === 'kitty') buildKitty(palettes);
  if (target === 'all' || target === 'zellij') buildZellij(palettes);
  if (target === 'all' || target === 'web') buildWeb(palettes);
  if (target === 'all' || target === 'tailwind') buildTailwind(palettes);
  if (target === 'all' || target === 'telegram') buildTelegram(palettes);
  if (target === 'all' || target === 't3code' || target === 't3') buildT3Code(palettes);

  console.log('\n✨ Build complete! Output directory: ./dist\n');
}

main();
