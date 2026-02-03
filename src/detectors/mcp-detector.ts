import { MCPServer } from '../types.js';
import fs from 'fs';
import os from 'os';
import path from 'path';

export class MCPDetector {
  static async detectInstalled(): Promise<MCPServer[]> {
    const mcpServers: MCPServer[] = [];
    
    // Check Claude Desktop config
    const claudeConfig = this.getClaudeConfig();
    if (claudeConfig?.mcpServers) {
      for (const [name, config] of Object.entries(claudeConfig.mcpServers)) {
        mcpServers.push({
          name,
          command: (config as any).command,
          args: (config as any).args || [],
          env: (config as any).env,
          capabilities: this.inferCapabilities(name),
          installed: true
        });
      }
    }

    // Add well-known MCPs even if not installed
    const knownMCPs: MCPServer[] = [
      {
        name: 'context7',
        command: 'npx',
        args: ['-y', '@upstash/context7-mcp'],
        capabilities: ['docs', 'context', 'search'],
        installed: mcpServers.some(m => m.name.includes('context7'))
      },
      {
        name: 'memory-keeper',
        command: 'npx',
        args: ['-y', 'mcp-memory-keeper'],
        capabilities: ['memory', 'context', 'persistence'],
        installed: mcpServers.some(m => m.name.includes('memory'))
      },
      {
        name: 'github',
        command: 'npx',
        args: ['-y', '@modelcontextprotocol/server-github'],
        capabilities: ['github', 'issues', 'repos'],
        installed: mcpServers.some(m => m.name.includes('github'))
      }
    ];

    // Merge with known MCPs
    for (const known of knownMCPs) {
      if (!mcpServers.find(m => m.name === known.name)) {
        mcpServers.push(known);
      }
    }

    return mcpServers;
  }

  private static getClaudeConfig() {
    try {
      const configPath = path.join(
        os.homedir(),
        'Library', 'Application Support', 'Claude', 'claude_desktop_config.json'
      );
      
      if (fs.existsSync(configPath)) {
        return JSON.parse(fs.readFileSync(configPath, 'utf-8'));
      }
    } catch (e) {
      // Try Cursor config
      try {
        const cursorConfig = path.join(os.homedir(), '.cursor', 'mcp.json');
        if (fs.existsSync(cursorConfig)) {
          return JSON.parse(fs.readFileSync(cursorConfig, 'utf-8'));
        }
      } catch (e2) {}
    }
    return null;
  }

  private static inferCapabilities(name: string): string[] {
    const lower = name.toLowerCase();
    const caps: string[] = [];
    
    if (lower.includes('context') || lower.includes('doc')) caps.push('docs', 'context');
    if (lower.includes('memory')) caps.push('memory', 'persistence');
    if (lower.includes('github')) caps.push('github', 'issues');
    if (lower.includes('search')) caps.push('search');
    if (lower.includes('qdrant') || lower.includes('vector')) caps.push('semantic', 'search');
    
    return caps;
  }
}
