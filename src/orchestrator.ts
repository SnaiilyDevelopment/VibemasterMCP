import { MCPServer, OrchestratorRequest, MCPResponse, CombinedResponse } from './types.js';
import { StackDetector } from './detectors/stack-detector.js';
import { MCPDetector } from './detectors/mcp-detector.js';
import { IntelligentRouter } from './intelligence/router.js';

export class Orchestrator {
  private mcpServers: MCPServer[] = [];
  private projectContext: any = null;

  async initialize(projectPath: string) {
    // Detect installed MCPs
    this.mcpServers = await MCPDetector.detectInstalled();
    
    // Detect project stack
    const stack = await StackDetector.detect(projectPath);
    const gitInfo = await StackDetector.getGitInfo(projectPath);
    
    this.projectContext = {
      rootPath: projectPath,
      stack,
      gitRepo: gitInfo
    };

    return {
      mcps: this.mcpServers,
      context: this.projectContext
    };
  }

  async orchestrate(request: OrchestratorRequest): Promise<CombinedResponse> {
    // Route to appropriate MCPs
    const plan = IntelligentRouter.route(request, this.mcpServers.filter(m => m.installed));

    console.log('\n🎯 Orchestration Plan:');
    plan.forEach(p => {
      console.log(`  → ${p.mcp.name} (priority ${p.priority}): ${p.reason}`);
    });

    // Execute MCP calls in parallel
    const responses: MCPResponse[] = [];
    
    for (const step of plan) {
      try {
        const response = await this.callMCP(step.mcp, request);
        if (response) {
          responses.push(response);
        }
      } catch (error) {
        console.error(`Error calling ${step.mcp.name}:`, error);
      }
    }

    // Combine responses
    const combined = this.combineResponses(responses, request);
    
    return combined;
  }

  private async callMCP(mcp: MCPServer, request: OrchestratorRequest): Promise<MCPResponse | null> {
    // This is a simplified version - in production you'd use MCP SDK
    // to actually communicate with the MCP server
    
    console.log(`  ⚡ Calling ${mcp.name}...`);
    
    // Simulate MCP response
    return {
      source: mcp.name,
      data: {
        result: `Response from ${mcp.name} for: ${request.query}`
      },
      confidence: 0.8,
      timestamp: Date.now()
    };
  }

  private combineResponses(responses: MCPResponse[], request: OrchestratorRequest): CombinedResponse {
    let answer = `# VibeMaster Orchestrated Response\n\n`;
    answer += `**Query**: ${request.query}\n\n`;
    answer += `**Sources Used**: ${responses.map(r => r.source).join(', ')}\n\n`;
    
    answer += `## Combined Intelligence\n\n`;
    
    responses.forEach(response => {
      answer += `### From ${response.source}\n`;
      answer += JSON.stringify(response.data, null, 2) + '\n\n';
    });

    return {
      answer,
      sources: responses,
      suggestions: [
        'Try asking for implementation details',
        'Request test generation',
        'Ask about similar patterns in your codebase'
      ]
    };
  }

  getInstalledMCPs() {
    return this.mcpServers.filter(m => m.installed);
  }

  getAvailableMCPs() {
    return this.mcpServers;
  }
}
