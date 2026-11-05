# 🌿 Cukup Theme

> *"Bukan kurang, bukan berlebih. Pas untuk kejernihan berpikir."*

<p align="center">
  <img src="assets/preview.png" alt="Cukup Theme Preview" width="100%" />
</p>

An essentialist, low-contrast, anti-eye-strain color system and multi-platform theme suite designed for long coding sessions and deep focus.

Built upon a **3-Layer Design Token Architecture** (Primitives → Semantics → Target Adapters), compiling from a Single Source of Truth to:
**Alacritty**, **Zed IDE**, **VS Code / Cursor**, **Herdr**, **T3 Code**, **Telegram**, **iTerm2**, **Kitty**, **Zellij**, **Web CSS Variables**, and **Tailwind CSS**.

---

## 🎯 The Philosophy of "Cukup"

Most modern syntax themes suffer from **rainbow overload**—every variable, property, and token screams in a different saturated neon color.

**Cukup** applies **Semantic Restraint**:
1. **Clean Neutral Foundations**: Variable declarations, references, and object properties inherit clean, readable parchment text (`#D8D5CD`). No more "orange or purple walls" when reading dense JSON or data structures.
2. **Intentional Accents**: Colors only ignite where logic happens:
   - **Functions & Methods**: Warm Terracotta (`#E89058`) as the hero visual anchor.
   - **Strings & Literals**: Dusty Lilac (`#B294C7`).
   - **Keywords & Control Flow**: Soft Rose Rust (`#DE6E75`, italicized).
   - **Types & Interfaces**: Muted Celadon Teal (`#6BAFAD`).
   - **Constants & Numbers**: Amber Gold (`#DDA861`).
   - **Comments**: Warm Sandstone (`#78776F`, italicized).

---

## ✨ Palettes & Variants

| Variant | Aesthetic & Personality | Primary Accents |
| :--- | :--- | :--- |
| **Cukup Senja** *(Default)* | Warm terracotta, dusty lilac, warm sandstone on charcoal obsidian. Organic & tactile. | `#E89058` (Clay), `#B294C7` (Lilac), `#6BAFAD` (Celadon) |
| **Cukup Malam** | Deep pine slate, wild honey amber & frost jade. Cool, serene Nordic night. | `#E6A854` (Amber), `#74BBA2` (Jade), `#6CA7C8` (Glacier) |
| **Cukup Kopi** | Dark roasted espresso, ripe persimmon & cashmere mauve. Warm cafe atmosphere. | `#E87D4B` (Persimmon), `#B8969E` (Mauve), `#5E9EA0` (Ceramic) |

---

## 📦 Supported Platforms (`dist/`)

```
dist/
├── alacritty/       # Alacritty terminal configs (cukup-senja.toml, cukup-malam.toml, cukup-kopi.toml)
├── zed/             # Zed IDE multi-theme extension (cukup.json)
├── vscode/          # VS Code & Cursor themes (cukup-senja.json, cukup-malam.json, cukup-kopi.json)
├── iterm2/          # iTerm2 color presets (.itermcolors)
├── kitty/           # Kitty terminal configs (cukup-senja.conf, dll.)
├── zellij/          # Zellij terminal multiplexer (cukup.kdl)
├── web/             # Web CSS custom properties (tokens.css) & JSON tokens
├── tailwind/        # Tailwind CSS preset plugin (cukup-preset.js)
├── telegram/        # Telegram Desktop (.tdesktop-theme) & Telegram macOS (.palette)
├── t3code/          # T3 Code themes (single grouped cukup.json & variants)
└── herdr/           # Herdr workspace themes (cukup-kopi.json, cukup-senja.json, etc.)
```

---

## 🚀 Installation Quickstart

### 1. Alacritty
Copy or import the theme file into your Alacritty config (`~/.config/alacritty/alacritty.toml`):
```toml
[general]
import = [
  "~/.config/alacritty/themes/cukup-senja.toml"
]
```

### 2. Zed IDE
Copy [`dist/zed/cukup.json`](dist/zed/cukup.json) to `~/.config/zed/themes/cukup.json`, then select in settings:
```json
"theme": {
  "mode": "dark",
  "dark": "Cukup Senja (Blurred)"
}
```

### 3. VS Code / Cursor
Copy any variant from [`dist/vscode/`](dist/vscode/) to your themes directory, or package as a VSIX extension.

### 4. iTerm2
Open iTerm2 **Preferences** > **Profiles** > **Colors** > **Color Presets...** > **Import...** and select [`dist/iterm2/Cukup-Senja.itermcolors`](dist/iterm2/Cukup-Senja.itermcolors).

### 5. Kitty Terminal
Include the config in your `kitty.conf`:
```conf
include cukup-senja.conf
```

### 6. Zellij
Copy [`dist/zellij/cukup.kdl`](dist/zellij/cukup.kdl) into `~/.config/zellij/themes/cukup.kdl` and set `theme: "cukup-senja"`.

### 7. Web & Tailwind CSS
```js
// tailwind.config.js
module.exports = {
  presets: [require('./dist/tailwind/cukup-preset.js')],
  // ...
};
```
Or import CSS variables in your web app:
```css
@import './dist/web/tokens.css';
```

---

## 🛠️ Design System Compiler

```bash
# Compile all 8 targets in ~50ms
npm run build

# Compile specific targets
npm run build:alacritty
npm run build:zed
npm run build:vscode
npm run build:iterm
npm run build:kitty
npm run build:zellij
npm run build:web
npm run build:tailwind

# Preview terminal color matrix
./print_colors.sh
```

---

## 🏗️ Architecture

```
tokens/
├── primitives.json   # Layer 1: Raw color scales (obsidian, pine, terracotta, lilac...)
└── palette.json      # Layer 2: Semantic tokens (surface, text, interactive, status, syntax, ansi)

templates/            # Layer 3: Target Platform Adapters
├── alacritty.js
├── zed.js
├── vscode.js
├── iterm2.js
├── kitty.js
├── zellij.js
├── web.js
└── tailwind.js
```

---

## 🖼️ Official Wallpapers (4K MacBook 16:10)

Minimalist, text-free, anti-eye-strain wallpapers rendered in **3840×2400** (16:10 aspect ratio for MacBook Pro / Air displays):

| Cukup Dark (Kopi / Senja / Malam) | Cukup Light (Terang) |
| :---: | :---: |
| <img src="assets/wallpaper-dark.png" alt="Cukup Dark Wallpaper" width="100%" /> | <img src="assets/wallpaper-light.png" alt="Cukup Light Wallpaper" width="100%" /> |
| [`assets/wallpaper-dark.png`](assets/wallpaper-dark.png) | [`assets/wallpaper-light.png`](assets/wallpaper-light.png) |

---

## 📄 License

MIT © [Hasan Suryaman](https://github.com/hasansuryaman)
