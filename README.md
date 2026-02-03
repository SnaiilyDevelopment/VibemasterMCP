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

## Installation

```bash
npm install -g vibemaster-mcp
```

## Configuration

Add to your Claude Desktop config (`~/Library/Application Support/Claude/claude_desktop_config.json`):

```json
{
  "mcpServers": {
    "vibemaster": {
      "command": "vibemaster-mcp"
    }
  }
}
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

## License

MIT
