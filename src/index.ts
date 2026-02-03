#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { 
  CallToolRequestSchema, 
  ListToolsRequestSchema 
} from '@modelcontextprotocol/sdk/types.js';
import { Orchestrator } from './orchestrator.js';

const orchestrator = new Orchestrator();

// Initialize with current directory
await orchestrator.initialize(process.cwd());

const server = new Server(
  {
    name: 'vibemaster-mcp',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: {},
      resources: {},
      prompts: {},
    },
  }
);

// List available tools
server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: 'orchestrate',
      description: 'Intelligently orchestrates multiple MCPs to answer your query',
      inputSchema: {
        type: 'object',
        properties: {
          query: {
            type: 'string',
            description: 'Your question or request'
          },
          type: {
            type: 'string',
            enum: ['query', 'implement', 'debug', 'explain'],
            description: 'Type of request'
          }
        },
        required: ['query']
      }
    },
    {
      name: 'detect_stack',
      description: 'Detect the technology stack of current project',
      inputSchema: {
        type: 'object',
        properties: {
          path: {
            type: 'string',
            description: 'Project path (defaults to current directory)'
          }
        }
      }
    },
    {
      name: 'list_mcps',
      description: 'List all detected MCP servers (installed and available)',
      inputSchema: {
        type: 'object',
        properties: {}
      }
    },
    {
      name: 'smart_context',
      description: 'Get intelligent context for coding - combines docs, memory, and project info',
      inputSchema: {
        type: 'object',
        properties: {
          topic: {
            type: 'string',
            description: 'What you want context about'
          }
        },
        required: ['topic']
      }
    }
  ]
}));

// Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    switch (name) {
      case 'orchestrate': {
        const result = await orchestrator.orchestrate({
          type: (args as any).type || 'query',
          query: (args as any).query,
        });
        
        return {
          content: [{
            type: 'text',
            text: result.answer
          }]
        };
      }

      case 'detect_stack': {
        const info = await orchestrator.initialize((args as any).path || process.cwd());
        
        return {
          content: [{
            type: 'text',
            text: JSON.stringify(info, null, 2)
          }]
        };
      }

      case 'list_mcps': {
        const installed = orchestrator.getInstalledMCPs();
        const available = orchestrator.getAvailableMCPs();
        
        return {
          content: [{
            type: 'text',
            text: `# Installed MCPs (${installed.length})\n${installed.map(m => `- ${m.name}: ${m.capabilities.join(', ')}`).join('\n')}\n\n# Available MCPs (${available.length})\n${available.map(m => `- ${m.name}: ${m.capabilities.join(', ')} ${m.installed ? '✓' : '(not installed)'}`).join('\n')}`
          }]
        };
      }

      case 'smart_context': {
        const result = await orchestrator.orchestrate({
          type: 'query',
          query: `Provide context about: ${(args as any).topic}`
        });
        
        return {
          content: [{
            type: 'text',
            text: result.answer
          }]
        };
      }

      default:
        throw new Error(`Unknown tool: ${name}`);
    }
  } catch (error) {
    return {
      content: [{
        type: 'text',
        text: `Error: ${error instanceof Error ? error.message : String(error)}`
      }],
      isError: true
    };
  }
});

// Start server
const transport = new StdioServerTransport();
await server.connect(transport);

console.error('VibeMaster MCP Server running 🚀');
