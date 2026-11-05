#!/usr/bin/env node
/**
 * =============================================================================
 * Cukup Multi-Platform Theme Compiler
 * =============================================================================
 * Single Source of Truth -> Alacritty, Zed, VS Code, iTerm2, and more!
 *
 * Usage:
 *   node build.js                  # Compile all targets
 *   node build.js --target alacritty
 *   node build.js --target zed
 *   node build.js --target iterm
 *   node build.js --target vscode
 * =============================================================================
 */

const fs = require('fs');
const path = require('path');

const { generateAlacrittyToml } = require('./templates/alacritty');
const { generateZedJson } = require('./templates/zed');
const { generateVsCodeJson } = require('./templates/vscode');
const { generateItermcolors } = require('./templates/iterm2');

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
  console.log('📦 Building Alacritty themes...');
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
  console.log('📦 Building Zed theme...');
  const outDir = path.join(DIST_DIR, 'zed');
  ensureDir(outDir);

  const zedJson = generateZedJson(palettes);
  const outFile = path.join(outDir, 'cukup.json');
  fs.writeFileSync(outFile, zedJson, 'utf8');
  console.log(`   ✓ ${path.relative(__dirname, outFile)}`);
}

function buildVsCode(palettes) {
  console.log('📦 Building VS Code themes...');
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
  console.log('📦 Building iTerm2 color schemes...');
  const outDir = path.join(DIST_DIR, 'iterm2');
  ensureDir(outDir);

  for (const [key, palette] of Object.entries(palettes)) {
    const xml = generateItermcolors(palette);
    const outFile = path.join(outDir, `Cukup-${key.charAt(0).toUpperCase() + key.slice(1)}.itermcolors`);
    fs.writeFileSync(outFile, xml, 'utf8');
    console.log(`   ✓ ${path.relative(__dirname, outFile)}`);
  }
}

function main() {
  const args = process.argv.slice(2);
  const targetIndex = args.indexOf('--target');
  const target = targetIndex !== -1 ? args[targetIndex + 1] : 'all';

  console.log(`\n🌿 Cukup Multi-Platform Theme Compiler [Target: ${target}]\n`);
  const data = loadTokens();
  const palettes = data.palettes;

  ensureDir(DIST_DIR);

  if (target === 'all' || target === 'alacritty') {
    buildAlacritty(palettes);
  }
  if (target === 'all' || target === 'zed') {
    buildZed(palettes);
  }
  if (target === 'all' || target === 'vscode') {
    buildVsCode(palettes);
  }
  if (target === 'all' || target === 'iterm' || target === 'iterm2') {
    buildIterm(palettes);
  }

  console.log('\n✨ Build complete! Output directory: ./dist\n');
}

main();
