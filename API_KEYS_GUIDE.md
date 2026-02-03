# API Key Setup - Example Output

When you run `npm run setup` and choose to install MCPs that require API keys, you'll see:

## During Installation

```
🚀 VibeMaster MCP Setup
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔍 Checking for recommended MCPs...

The following MCPs are recommended but not installed:

   ⭐ context7
      Context-aware code search and navigation

   ⭐ memory-keeper
      Persistent memory for conversations

   ✨ github
      GitHub integration for issues and PRs

   ✨ filesystem
      Enhanced filesystem operations

   💡 puppeteer
      Web scraping and browser automation

   💡 brave-search
      Web search capabilities

Would you like to install all recommended MCPs? [Y/n]: y

📦 Installing MCPs...
[npm install progress...]

✅ MCPs installed successfully!

🔧 Would you like to automatically update your Claude Desktop config?
   (C:\Users\YourName\AppData\Roaming\Claude\claude_desktop_config.json) [y/N]: y

✅ Claude Desktop config updated successfully!

🔑 API Keys Required:

   Some MCPs require API keys to function. Please update your config:
   C:\Users\YourName\AppData\Roaming\Claude\claude_desktop_config.json

   📌 github:
      • Key name: GITHUB_TOKEN
      • Create a GitHub Personal Access Token at: https://github.com/settings/tokens
      • Look for "github" in your config

   📌 brave-search:
      • Key name: BRAVE_API_KEY
      • Get a Brave Search API key at: https://brave.com/search/api/
      • Look for "brave-search" in your config

   Replace "YOUR_API_KEY_HERE" with your actual API keys.

🔄 Please restart Claude Desktop to use the new MCPs.

🎉 Setup complete! Enjoy using VibeMaster MCP!

📖 Documentation: https://github.com/SnaiilyDevelopment/VibemasterMCP
```

## What Gets Added to Your Config

Your `claude_desktop_config.json` will look like this:

```json
{
  "mcpServers": {
    "vibemaster": {
      "command": "vibemaster-mcp"
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
        "GITHUB_TOKEN": "YOUR_API_KEY_HERE"  ← Replace this
      }
    },
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem"]
    },
    "brave-search": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-brave-search"],
      "env": {
        "BRAVE_API_KEY": "YOUR_API_KEY_HERE"  ← Replace this
      }
    }
  }
}
```

## How to Add Your API Keys

### GitHub Token

1. Go to https://github.com/settings/tokens
2. Click "Generate new token (classic)"
3. Give it a name like "Claude Desktop MCP"
4. Select scopes: `repo`, `read:org`, `read:user`
5. Click "Generate token"
6. Copy the token
7. Open `claude_desktop_config.json`
8. Replace `"YOUR_API_KEY_HERE"` in the `github` section with your token
9. Save the file

**Example:**
```json
"github": {
  "command": "npx",
  "args": ["-y", "@github/mcp"],
  "env": {
    "GITHUB_TOKEN": "ghp_1234567890abcdefghijklmnop"
  }
}
```

### Brave Search API Key

1. Go to https://brave.com/search/api/
2. Sign up for a free account
3. Get your API key from the dashboard
4. Copy the key
5. Open `claude_desktop_config.json`
6. Replace `"YOUR_API_KEY_HERE"` in the `brave-search` section with your key
7. Save the file

**Example:**
```json
"brave-search": {
  "command": "npx",
  "args": ["-y", "@brave/search-mcp"],
  "env": {
    "BRAVE_API_KEY": "BSA1234567890abcdefghijklmnop"
  }
}
```

## After Adding Keys

1. Save the `claude_desktop_config.json` file
2. Completely quit Claude Desktop (right-click system tray icon → Quit)
3. Restart Claude Desktop
4. Your MCPs are now ready to use!

## Optional: Skip MCPs Requiring API Keys

If you don't want to set up API keys right now, you can:

1. Choose not to install github-mcp and brave-search-mcp during setup, OR
2. Install them but they won't work until you add the keys, OR
3. Remove them from your config file later if needed
