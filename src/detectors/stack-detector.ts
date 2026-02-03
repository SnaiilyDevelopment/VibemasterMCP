import fs from 'fs';
import path from 'path';

export class StackDetector {
  static async detect(projectPath: string) {
    const stack = {
      frameworks: [] as string[],
      languages: [] as string[],
      packageManager: 'unknown',
      dependencies: {} as Record<string, string>
    };

    // Detect Node.js projects
    const packageJsonPath = path.join(projectPath, 'package.json');
    if (fs.existsSync(packageJsonPath)) {
      const pkg = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
      stack.packageManager = 'npm';
      
      const deps = { ...pkg.dependencies, ...pkg.devDependencies };
      stack.dependencies = deps;

      // Detect frameworks
      if (deps['next']) stack.frameworks.push(`Next.js ${deps['next']}`);
      if (deps['react']) stack.frameworks.push(`React ${deps['react']}`);
      if (deps['vue']) stack.frameworks.push(`Vue ${deps['vue']}`);
      if (deps['express']) stack.frameworks.push(`Express ${deps['express']}`);
      if (deps['@supabase/supabase-js']) stack.frameworks.push('Supabase');
      if (deps['stripe']) stack.frameworks.push('Stripe');
      
      stack.languages.push('JavaScript/TypeScript');
    }

    // Detect Python projects
    const requirementsPath = path.join(projectPath, 'requirements.txt');
    if (fs.existsSync(requirementsPath)) {
      stack.packageManager = 'pip';
      stack.languages.push('Python');
      
      const requirements = fs.readFileSync(requirementsPath, 'utf-8');
      if (requirements.includes('django')) stack.frameworks.push('Django');
      if (requirements.includes('flask')) stack.frameworks.push('Flask');
      if (requirements.includes('fastapi')) stack.frameworks.push('FastAPI');
    }

    // Detect Go projects
    if (fs.existsSync(path.join(projectPath, 'go.mod'))) {
      stack.languages.push('Go');
      stack.packageManager = 'go mod';
    }

    // Detect Rust projects
    if (fs.existsSync(path.join(projectPath, 'Cargo.toml'))) {
      stack.languages.push('Rust');
      stack.packageManager = 'cargo';
    }

    return stack;
  }

  static async getGitInfo(projectPath: string) {
    try {
      const gitConfig = path.join(projectPath, '.git', 'config');
      if (!fs.existsSync(gitConfig)) return null;

      const config = fs.readFileSync(gitConfig, 'utf-8');
      const remoteMatch = config.match(/url = .*github\.com[:/](.+?)\/(.+?)\.git/);
      
      if (remoteMatch) {
        return {
          owner: remoteMatch[1],
          repo: remoteMatch[2],
          branch: 'main' // TODO: detect actual branch
        };
      }
    } catch (e) {
      return null;
    }
    return null;
  }
}
