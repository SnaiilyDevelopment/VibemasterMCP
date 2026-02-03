export interface MCPServer {
  name: string;
  command: string;
  args: string[];
  env?: Record<string, string>;
  capabilities: string[]; // ['docs', 'memory', 'github', 'search']
  installed: boolean;
}

export interface ProjectContext {
  rootPath: string;
  stack: {
    frameworks: string[];
    languages: string[];
    packageManager: string;
  };
  gitRepo?: {
    owner: string;
    repo: string;
    branch: string;
  };
}

export interface OrchestratorRequest {
  type: 'query' | 'implement' | 'debug' | 'explain';
  query: string;
  context?: ProjectContext;
  files?: string[];
}

export interface MCPResponse {
  source: string;
  data: any;
  confidence: number;
  timestamp: number;
}

export interface CombinedResponse {
  answer: string;
  sources: MCPResponse[];
  suggestions: string[];
}
