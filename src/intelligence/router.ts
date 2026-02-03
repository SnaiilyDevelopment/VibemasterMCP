import { MCPServer, OrchestratorRequest } from '../types.js';

export class IntelligentRouter {
  /**
   * Decides which MCPs to call based on the request
   */
  static route(request: OrchestratorRequest, availableMCPs: MCPServer[]) {
    const plan: { mcp: MCPServer; priority: number; reason: string }[] = [];

    const query = request.query.toLowerCase();

    // GitHub-related queries
    if (query.includes('issue') || query.includes('pr') || query.includes('pull request')) {
      const githubMCP = availableMCPs.find(m => m.capabilities.includes('github'));
      if (githubMCP) {
        plan.push({ 
          mcp: githubMCP, 
          priority: 10, 
          reason: 'GitHub issue/PR mentioned' 
        });
      }
    }

    // Documentation queries
    if (query.includes('how to') || query.includes('implement') || query.includes('api')) {
      const docsMCP = availableMCPs.find(m => m.capabilities.includes('docs'));
      if (docsMCP) {
        plan.push({ 
          mcp: docsMCP, 
          priority: 9, 
          reason: 'Documentation needed' 
        });
      }
    }

    // Context/memory queries
    if (query.includes('remember') || query.includes('previous') || query.includes('we did')) {
      const memoryMCP = availableMCPs.find(m => m.capabilities.includes('memory'));
      if (memoryMCP) {
        plan.push({ 
          mcp: memoryMCP, 
          priority: 8, 
          reason: 'Project memory needed' 
        });
      }
    }

    // Code search queries
    if (query.includes('similar') || query.includes('example') || query.includes('find code')) {
      const searchMCP = availableMCPs.find(m => m.capabilities.includes('semantic'));
      if (searchMCP) {
        plan.push({ 
          mcp: searchMCP, 
          priority: 7, 
          reason: 'Code search needed' 
        });
      }
    }

    // Default: always include docs and memory
    if (plan.length === 0) {
      const docsMCP = availableMCPs.find(m => m.capabilities.includes('docs'));
      const memoryMCP = availableMCPs.find(m => m.capabilities.includes('memory'));
      
      if (docsMCP && !plan.find(p => p.mcp.name === docsMCP.name)) {
        plan.push({ mcp: docsMCP, priority: 5, reason: 'Default context' });
      }
      if (memoryMCP && !plan.find(p => p.mcp.name === memoryMCP.name)) {
        plan.push({ mcp: memoryMCP, priority: 5, reason: 'Default memory' });
      }
    }

    return plan.sort((a, b) => b.priority - a.priority);
  }
}
