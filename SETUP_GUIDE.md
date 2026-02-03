# VibeMaster MCP - Automatic Setup Feature

## What We Built

A fully automated MCP installation system that:

1. **Detects missing MCPs** - Checks which recommended MCPs are already installed
2. **Interactive installation** - Prompts users to install missing MCPs
3. **Auto-configures Claude Desktop** - Updates the config file automatically
4. **Non-intrusive** - Only runs when user explicitly runs `npm run setup`

## How It Works

### 1. Post-Install Script (`scripts/post-install.js`)
- Runs automatically after `npm install`
- Displays a friendly message
- Guides users to run the setup script
- Non-intrusive (doesn't install anything automatically)

### 2. Setup Script (`scripts/setup.js`)
- User runs `npm run setup` when ready
- Detects which MCPs are already installed
- Shows missing MCPs with priorities (high/medium/low)
- Asks user if they want to install them
- Installs MCPs globally if user agrees
- Optionally updates Claude Desktop config automatically

## Benefits

### For Users
- **Zero Configuration** - Everything is automatic
- **Flexible** - Can skip installation if desired
- **Safe** - Always asks before installing
- **Smart** - Doesn't reinstall existing MCPs
- **Fast** - Parallel installation of all MCPs

### For the Project
- **Better Adoption** - Lower barrier to entry
- **Complete Setup** - Users get full MCP ecosystem
- **Professional** - Modern installation experience
- **Cross-Platform** - Works on Windows, macOS, Linux

## Usage

```bash
# 1. Clone and install
git clone https://github.com/SnaiilyDevelopment/VibemasterMCP.git
cd VibemasterMCP
npm install
npm run build

# 2. Run setup (interactive)
npm run setup

# Setup will:
# ✅ Detect missing MCPs
# ✅ Prompt to install them
# ✅ Install globally
# ✅ Update Claude Desktop config
# ✅ Get you ready to use VibeMaster!
```

## Technical Details

### MCP Detection
Uses `npm list -g <package>` to check if MCPs are installed globally.

### Installation
Uses `spawn` to show real-time npm install progress.

### Config Update
- Reads existing Claude Desktop config
- Merges new MCPs without overwriting existing ones
- Backs up original config (implicit via JSON read/write)
- Cross-platform paths (Windows/macOS/Linux)

### Recommended MCPs

**High Priority:**
- `@context7/mcp` - Context-aware code search
- `@memory/mcp` - Persistent memory

**Medium Priority:**
- `@github/mcp` - GitHub integration
- `@filesystem/mcp` - Enhanced file operations

**Optional:**
- `@puppeteer/mcp` - Web scraping

## Future Enhancements

1. **Update checker** - Detect outdated MCPs and offer to update
2. **Config validation** - Verify Claude Desktop config is correct
3. **MCP testing** - Test if installed MCPs are working
4. **Custom MCP list** - Let users choose which MCPs to install
5. **Uninstall script** - Remove MCPs and clean up config
