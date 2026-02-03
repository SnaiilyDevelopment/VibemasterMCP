# Quick Start Guide

## 🚀 Get Started in 3 Steps

### Step 1: Clone & Build
```bash
git clone https://github.com/SnaiilyDevelopment/VibemasterMCP.git
cd VibemasterMCP
npm install && npm run build
```

### Step 2: Run Setup
```bash
npm run setup
```

You'll see:
```
🚀 VibeMaster MCP Setup
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔍 Checking for recommended MCPs...

The following MCPs are recommended but not installed:

   ⭐ context7-mcp
      Context-aware code search and navigation

   ⭐ memory-mcp
      Persistent memory for conversations

   ✨ github-mcp
      GitHub integration for issues and PRs

Would you like to install all recommended MCPs? [Y/n]:
```

### Step 3: Restart Claude Desktop

That's it! VibeMaster is now ready to orchestrate your MCPs.

## 🎯 What Gets Installed?

| MCP | Package | Priority | Description | API Key Required |
|-----|---------|----------|-------------|------------------|
| context7 | @upstash/context7-mcp | ⭐ High | Context-aware code search | No |
| memory-keeper | mcp-memory-keeper | ⭐ High | Persistent conversation memory | No |
| github | @modelcontextprotocol/server-github | ✨ Medium | GitHub issues & PRs | Yes - [Get it here](https://github.com/settings/tokens) |
| filesystem | @modelcontextprotocol/server-filesystem | ✨ Medium | Enhanced file operations | No |
| puppeteer | @modelcontextprotocol/server-puppeteer | 💡 Optional | Web scraping & automation | No |
| brave-search | @modelcontextprotocol/server-brave-search | 💡 Optional | Web search | Yes - [Get it here](https://brave.com/search/api/) |

## 🔧 What Gets Configured?

Your Claude Desktop config (`claude_desktop_config.json`) will be updated:

```json
{
  "mcpServers": {
    "vibemaster": {
      "command": "node",
      "args": ["C:\\path\\to\\VibemasterMCP\\dist\\index.js"]
    },
    "context7": {
      "command": "npx",
      "args": ["-y", "@upstash/context7-mcp"]
    },
    "memory-keeper": {
      "command": "npx",
      "args": ["-y", "mcp-memory-keeper"]
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_TOKEN": "YOUR_API_KEY_HERE"
      }
    },
    "brave-search": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-brave-search"],
      "env": {
        "BRAVE_API_KEY": "YOUR_API_KEY_HERE"
      }
    }
    // ... and more
  }
}
```

### 🔑 Setting Up API Keys

After the setup completes, you'll see instructions like:

```
🔑 API Keys Required:

   📌 github-mcp:
      • Key name: GITHUB_TOKEN
      • Create a GitHub Personal Access Token at: https://github.com/settings/tokens
      • Look for "github" in your config

   Replace "YOUR_API_KEY_HERE" with your actual API keys.
```

**To add your API keys:**

1. Open your `claude_desktop_config.json` file
2. Find the MCP that needs a key (e.g., "github")
3. Replace `"YOUR_API_KEY_HERE"` with your actual API key
4. Save the file
5. Restart Claude Desktop

## 📍 Config File Locations

- **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`
- **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Linux**: `~/.config/Claude/claude_desktop_config.json`

## ❓ Troubleshooting

### "npm: command not found"
Install Node.js from https://nodejs.org

### "Permission denied"
Run with appropriate permissions or install MCPs locally:
```bash
npm install @context7/mcp @memory/mcp
```

### "Claude Desktop config not found"
The setup script will create it automatically, or you can create it manually.

### MCPs not showing in Claude
1. Restart Claude Desktop completely (quit from system tray)
2. Check the config file is in the correct location
3. Verify the paths are correct (use absolute paths on Windows)

## 🎉 You're Ready!

Try asking Claude:
- "Analyze my codebase structure"
- "Remember that I prefer TypeScript strict mode"
- "Show me similar authentication code"

VibeMaster will automatically orchestrate the right MCPs!
