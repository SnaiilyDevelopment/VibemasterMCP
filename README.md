# 🚀 VibeMaster MCP

> The intelligent orchestrator that coordinates all your MCP servers automatically

## The Problem

You have multiple MCPs installed (Context7, Memory Keeper, GitHub, etc.) but:
- ❌ You manually decide which one to use
- ❌ You make multiple separate requests
- ❌ You combine outputs yourself
- ❌ You waste time context-switching

## The Solution

VibeMaster is a **meta-MCP** that:
- ✅ Auto-detects your installed MCPs
- ✅ Intelligently routes queries to the right MCPs
- ✅ Calls multiple MCPs in parallel
- ✅ Combines outputs into one coherent response
- ✅ Learns which MCPs work best for your project
- ✅ **Automatically installs missing MCPs** during setup

## Installation

### Quick Setup (Automatic MCP Installation)

VibeMaster can automatically detect and install recommended MCPs for you!

```bash
npm install -g vibemaster-mcp
```

The setup script will:
- ✅ Check which recommended MCPs are already installed
- ✅ Prompt you to install missing MCPs
- ✅ Automatically update your Claude Desktop config
- ✅ Get you up and running in seconds!

### Manual Installation

If you prefer to install everything manually:

```bash
# Clone and build VibeMaster
git clone https://github.com/SnaiilyDevelopment/VibemasterMCP.git
cd VibemasterMCP
npm install
npm run build

# Install recommended MCPs
npm install -g @context7/mcp @memory/mcp @github/mcp @filesystem/mcp @puppeteer/mcp
```

## Configuration

### For Windows

Add to your Claude Desktop config (`%APPDATA%\Roaming\Claude\claude_desktop_config.json`):

**If you cloned the repo:**
```json
{
  "mcpServers": {
    "vibemaster": {
      "command": "node",
      "args": ["C:\\path\\to\\VibemasterMCP\\dist\\index.js"]
    }
  }
}
```

**If you installed globally:**
```json
{
  "mcpServers": {
    "vibemaster": {
      "command": "vibemaster-mcp"
    }
  }
}
```

### For macOS/Linux

Add to your Claude Desktop config (`~/Library/Application Support/Claude/claude_desktop_config.json`):

**If you cloned the repo:**
```json
{
  "mcpServers": {
    "vibemaster": {
      "command": "node",
      "args": ["/path/to/VibemasterMCP/dist/index.js"]
    }
  }
}
```

**If you installed globally:**
```json
{
  "mcpServers": {
    "vibemaster": {
      "command": "vibemaster-mcp"
    }
  }
}
```

## Recommended MCPs

VibeMaster works best with these MCPs. The setup script can install them automatically!

### High Priority (Strongly Recommended)
- **context7** (`@upstash/context7-mcp`) - Context-aware code search and navigation
- **memory-keeper** (`mcp-memory-keeper`) - Persistent memory for conversations

### Medium Priority (Recommended)
- **github** (`@modelcontextprotocol/server-github`) - GitHub integration for issues and PRs
  - 🔑 Requires API key: [GitHub Personal Access Token](https://github.com/settings/tokens)
- **filesystem** (`@modelcontextprotocol/server-filesystem`) - Enhanced filesystem operations

### Optional
- **puppeteer** (`@modelcontextprotocol/server-puppeteer`) - Web scraping and browser automation
- **brave-search** (`@modelcontextprotocol/server-brave-search`) - Web search capabilities
  - 🔑 Requires API key: [Brave Search API](https://brave.com/search/api/)

### API Keys Setup

If you install MCPs that require API keys, the setup script will:
1. ✅ Add placeholders to your Claude Desktop config
2. ✅ Show you where to get the API keys
3. ✅ Tell you exactly which config entries to update

You'll see something like:
```
🔑 API Keys Required:

   📌 github-mcp:
      • Key name: GITHUB_TOKEN
      • Create a GitHub Personal Access Token at: https://github.com/settings/tokens
      • Look for "github" in your config

   Replace "YOUR_API_KEY_HERE" with your actual API keys.
```

### Manual Installation

If you didn't use the setup script, install them with:

```bash
npm install -g @upstash/context7-mcp mcp-memory-keeper @modelcontextprotocol/server-github @modelcontextprotocol/server-filesystem @modelcontextprotocol/server-puppeteer @modelcontextprotocol/server-brave-search
```

## Usage

Just ask Claude naturally:

```
"Implement GitHub issue #42"
→ VibeMaster automatically uses GitHub MCP + Context7 + Memory

"How do I add Stripe subscriptions?"
→ VibeMaster detects Stripe in your stack, fetches docs, checks memory

"What similar code exists for authentication?"
→ VibeMaster uses semantic search + memory + your codebase
```

## Features

### 🎯 Intelligent Routing
Analyzes your query and automatically selects the right MCPs

### 🔄 Parallel Execution
Calls multiple MCPs simultaneously for faster responses

### 🧠 Context Awareness
Understands your project stack and preferences

### 📊 Transparent Orchestration
Shows which MCPs were used and why

### 🤖 Automatic MCP Management
Detects and installs missing recommended MCPs during setup

## FAQ

**Q: Do I need to install MCPs manually?**  
A: No! Run `npm run setup` after building, and VibeMaster will detect which MCPs you're missing and offer to install them automatically.

**Q: What about API keys for GitHub and Brave Search?**  
A: The setup script will add placeholder entries to your config and show you exactly where to get the API keys. See [API_KEYS_GUIDE.md](./API_KEYS_GUIDE.md) for detailed instructions.

**Q: What if I already have some MCPs installed?**  
A: VibeMaster will detect your existing MCPs and only prompt you to install the ones you're missing.

**Q: Can I use VibeMaster without other MCPs?**  
A: Yes, but VibeMaster works best when orchestrating multiple MCPs. It will still function with whatever MCPs you have installed.

**Q: Can I skip MCPs that require API keys?**  
A: Yes! During setup, you can choose not to install them, or install them and add the API keys later.

**Q: How do I add more MCPs later?**  
A: Just run `npm run setup` again, or install them manually and restart Claude Desktop.

## License

MIT

