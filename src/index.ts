import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { Orchestrator } from "./orchestrator.js";
import { KeywordDetector } from "./detectors/keyword.js";
import { PatternDetector } from "./detectors/pattern.js";

// Initialize Orchestrator
const orchestrator = new Orchestrator();
orchestrator.registerDetector(new KeywordDetector());
orchestrator.registerDetector(new PatternDetector());

// Initialize MCP Server
const server = new McpServer({
  name: "vibemaster",
  version: "1.0.0"
});

// Register Tool
server.tool(
  "analyze_vibe",
  "Analyze the vibe/sentiment/tone of a given text.",
  {
    text: z.string().describe("The text to analyze")
  },
  async ({ text }) => {
    const result = await orchestrator.analyze(text);
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(result, null, 2)
        }
      ]
    };
  }
);

// Start Server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("VibeMaster MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
