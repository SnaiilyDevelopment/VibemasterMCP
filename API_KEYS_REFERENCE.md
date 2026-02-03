# VibeMaster MCP - API Keys Reference

## Overview

VibeMaster installs **6 recommended MCPs**. Of these, **only 2 require API keys**.

## MCPs Requiring API Keys

### 1. GitHub MCP (`@modelcontextprotocol/server-github`)

**What it does:** Integrates with GitHub to access issues, pull requests, repositories, and code.

**API Key:** `GITHUB_TOKEN`

**How to get it:**
1. Go to https://github.com/settings/tokens
2. Click "Generate new token (classic)"
3. Give it a descriptive name (e.g., "Claude Desktop MCP")
4. Select these scopes:
   - `repo` - Full control of private repositories
   - `read:org` - Read organization data
   - `read:user` - Read user profile data
5. Click "Generate token"
6. **Copy the token immediately** (you won't see it again!)

**Where to add it:**
```json
"github": {
  "command": "npx",
  "args": ["-y", "@modelcontextprotocol/server-github"],
  "env": {
    "GITHUB_TOKEN": "ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxx"
  }
}
```

---

### 2. Brave Search MCP (`@modelcontextprotocol/server-brave-search`)

**What it does:** Provides web search capabilities using Brave's privacy-focused search engine.

**API Key:** `BRAVE_API_KEY`

**How to get it:**
1. Go to https://brave.com/search/api/
2. Sign up for an account
3. Choose a plan (free tier available)
4. Get your API key from the dashboard
5. Copy the key

**Where to add it:**
```json
"brave-search": {
  "command": "npx",
  "args": ["-y", "@modelcontextprotocol/server-brave-search"],
  "env": {
    "BRAVE_API_KEY": "BSAxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
  }
}
```

---

## MCPs That DON'T Require API Keys

These work out of the box:

1. **context7** (`@upstash/context7-mcp`) - No API key needed
2. **memory-keeper** (`mcp-memory-keeper`) - No API key needed
3. **filesystem** (`@modelcontextprotocol/server-filesystem`) - No API key needed
4. **puppeteer** (`@modelcontextprotocol/server-puppeteer`) - No API key needed

---

## Optional: Skip API Key MCPs

If you don't want to set up API keys right now, you have options:

### Option 1: Don't install them
When running `npm run setup`, the script will show you which MCPs require API keys. You can choose to skip installing GitHub and Brave Search.

### Option 2: Install but don't use
Install them now, and they'll be added to your config with `"YOUR_API_KEY_HERE"` placeholders. They won't work until you add real keys, but you can add them later.

### Option 3: Remove from config
If you installed them but don't want them, just delete their entries from `claude_desktop_config.json`.

---

## Testing Your API Keys

After adding your API keys:

1. **Save** the `claude_desktop_config.json` file
2. **Completely quit** Claude Desktop (system tray → Quit)
3. **Restart** Claude Desktop
4. Try commands that use those MCPs:
   - GitHub: "Show me my GitHub repositories"
   - Brave Search: "Search the web for Node.js best practices"

If they work, you're all set! If not:
- Check that the API key is valid
- Check that there are no extra spaces in the config
- Check that the JSON syntax is correct
- Restart Claude Desktop again

---

## Security Notes

- **Never commit** your API keys to version control
- **Don't share** your `claude_desktop_config.json` file
- **Rotate keys** if you think they've been exposed
- GitHub tokens can be **revoked** at https://github.com/settings/tokens
- Use **minimal scopes** - only grant what's needed

---

## Summary

| MCP | API Key Required? | Free Tier? | Setup Difficulty |
|-----|-------------------|------------|------------------|
| context7 | ❌ No | N/A | ⭐ Easy |
| memory-keeper | ❌ No | N/A | ⭐ Easy |
| github | ✅ Yes | ✅ Yes | ⭐⭐ Medium |
| filesystem | ❌ No | N/A | ⭐ Easy |
| puppeteer | ❌ No | N/A | ⭐ Easy |
| brave-search | ✅ Yes | ✅ Yes | ⭐⭐ Medium |

**Bottom line:** Only 2 out of 6 MCPs need API keys, and both have free tiers available.
