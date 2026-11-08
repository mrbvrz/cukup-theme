#!/usr/bin/env node
/**
 * Real-time Helium Bookmarks Watcher Daemon
 * Automatically rebuilds Helium themes whenever Bookmarks are added/edited in Helium browser.
 */
const fs = require('fs');
const path = require('path');
const os = require('os');
const { execSync } = require('child_process');

const heliumBookmarks = path.join(os.homedir(), 'Library/Application Support/net.imput.helium/Default/Bookmarks');
const cukupThemeDir = path.resolve(__dirname, '..');

console.log('👀 Watching Helium Bookmarks for real-time updates at:');
console.log('   ', heliumBookmarks);

let debounceTimer = null;
function onFileChange() {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    console.log(`\n⚡ [${new Date().toLocaleTimeString()}] Helium Bookmarks modified! Rebuilding themes...`);
    try {
      execSync('node build.js --target helium', { cwd: cukupThemeDir, stdio: 'inherit' });
      console.log('✓ Helium themes updated in real-time!\n');
    } catch (err) {
      console.error('Error rebuilding themes:', err.message);
    }
  }, 250);
}

if (fs.existsSync(heliumBookmarks)) {
  fs.watch(heliumBookmarks, (eventType) => {
    onFileChange();
  });
  console.log('✓ Real-time file watcher active.');
} else {
  console.warn('Helium Bookmarks file not found yet. Watching parent directory...');
  const dir = path.dirname(heliumBookmarks);
  if (fs.existsSync(dir)) {
    fs.watch(dir, (eventType, filename) => {
      if (filename === 'Bookmarks') {
        onFileChange();
      }
    });
  }
}
