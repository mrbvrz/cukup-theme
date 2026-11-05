# 🌿 Cukup Theme

> *"Bukan kurang, bukan berlebih. Pas untuk kejernihan berpikir."*

An essentialist, low-contrast, anti-eye-strain color system and theme built for clarity across terminals, code editors, and development tools.

Starting with **Alacritty**, **Zed**, **VS Code**, and **iTerm2**, built from a Single Source of Truth (`tokens/palette.json`).

---

## ✨ Design Variants

| Variant | Aesthetic & Philosophy | Primary Accents |
| :--- | :--- | :--- |
| **Cukup Senja** *(Default)* | Warm terracotta, dusty lilac, warm sandstone on charcoal obsidian. Organic & tactile. | `#E89058` (Clay), `#B294C7` (Lilac), `#6BAFAD` (Celadon) |
| **Cukup Malam** | Deep pine slate, wild honey amber & frost jade. Cool, serene Nordic night. | `#E6A854` (Amber), `#74BBA2` (Jade), `#6CA7C8` (Glacier) |
| **Cukup Kopi** | Dark roasted espresso, ripe persimmon & cashmere mauve. Warm cafe atmosphere. | `#E87D4B` (Persimmon), `#B8969E` (Mauve), `#5E9EA0` (Ceramic) |

---

## 🎨 Color Palette (Cukup Senja)

```
UI & Backgrounds:
  Background:      #181816  (Warm Obsidian)
  Panel / Sidebar: #131311  (Deep Obsidian)
  Surface:         #1F1F1C  (Elevated Modal)
  Border:          #2B2B27  (Subtle Muted Divider)
  Foreground:      #D8D5CD  (Parchment White)
  Muted:           #78776F  (Warm Stone)

Syntax Hierarchy:
  Primary / Funcs: #E89058  (Warm Terracotta)
  Strings:         #B294C7  (Dusty Lilac)
  Keywords:        #DE6E75  (Rose Rust)
  Types / Classes: #6BAFAD  (Celadon Teal)
  Constants:       #DDA861  (Amber Gold)
  Tags / Success:  #89BA81  (Olive Sage)
```

---

## 🚀 Installation

### 1. Alacritty

Copy or import the theme file into your Alacritty configuration (`~/.config/alacritty/alacritty.toml`):

#### Method A: Direct import in `alacritty.toml`
```toml
[general]
import = [
  # Path to cukup theme
  "~/.config/alacritty/themes/cukup-senja.toml"
]
```

#### Method B: Copy colors directly
Open [`dist/alacritty/cukup-senja.toml`](dist/alacritty/cukup-senja.toml) and paste the `[colors]` table into your `alacritty.toml`.

---

### 2. Zed IDE

1. Copy `dist/zed/cukup.json` to your Zed themes directory:
   ```bash
   mkdir -p ~/.config/zed/themes
   cp dist/zed/cukup.json ~/.config/zed/themes/
   ```
2. Open Zed settings (`Cmd + ,` or `~/.config/zed/settings.json`) and select:
   ```json
   "theme": {
     "mode": "dark",
     "dark": "Cukup Senja (Blurred)"
   }
   ```
   *(Variants available: `Cukup Senja (Blurred)`, `Cukup Senja (Solid)`, `Cukup Malam (Blurred)`, `Cukup Kopi (Blurred)`).*

---

### 3. VS Code / Cursor

1. Copy [`dist/vscode/cukup-senja.json`](dist/vscode/cukup-senja.json) to your extensions directory or package it as a VSIX extension:
   ```bash
   npm run build:vscode
   ```

---

### 4. iTerm2

1. Open iTerm2 **Preferences** (`Cmd + ,`) > **Profiles** > **Colors**.
2. Click **Color Presets...** > **Import...**.
3. Select [`dist/iterm2/Cukup-Senja.itermcolors`](dist/iterm2/Cukup-Senja.itermcolors).

---

## 🛠️ Building & Customizing

This repository uses a single source of truth for all color tokens (`tokens/palette.json`).

### Requirements
- Node.js >= 18

### Commands
```bash
# Compile all targets (Alacritty, Zed, VS Code, iTerm2)
npm run build

# Compile specific targets
npm run build:alacritty
npm run build:zed
npm run build:vscode
npm run build:iterm

# Preview active colors in terminal
npm run preview
```

---

## 📁 Repository Structure

```
cukup-theme/
├── tokens/
│   └── palette.json       # Single Source of Truth
├── templates/
│   ├── alacritty.js       # Alacritty TOML generator
│   ├── zed.js             # Zed JSON generator
│   ├── vscode.js          # VS Code JSON generator
│   └── iterm2.js          # iTerm2 .itermcolors generator
├── dist/                  # Generated theme files
│   ├── alacritty/
│   ├── zed/
│   ├── vscode/
│   └── iterm2/
├── build.js               # Multi-platform compiler CLI
├── print_colors.sh        # Color preview script
└── package.json
```

---

## 📄 License

MIT © [Hasan Suryaman](https://github.com/hasansuryaman)
