#!/usr/bin/env node

import { execSync, spawn } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import readline from 'readline';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Recommended MCPs to install
const RECOMMENDED_MCPS = [
  {
    name: 'context7',
    package: '@upstash/context7-mcp',
    description: 'Context-aware code search and navigation',
    priority: 'high',
    requiresApiKey: false
  },
  {
    name: 'memory-keeper',
    package: 'mcp-memory-keeper',
    description: 'Persistent memory for conversations',
    priority: 'high',
    requiresApiKey: false
  },
  {
    name: 'github',
    package: '@modelcontextprotocol/server-github',
    description: 'GitHub integration for issues and PRs',
    priority: 'medium',
    requiresApiKey: true,
    apiKeyName: 'GITHUB_TOKEN',
    apiKeyInstructions: 'Create a GitHub Personal Access Token at: https://github.com/settings/tokens'
  },
  {
    name: 'filesystem',
    package: '@modelcontextprotocol/server-filesystem',
    description: 'Enhanced filesystem operations',
    priority: 'medium',
    requiresApiKey: false
  },
  {
    name: 'puppeteer',
    package: '@modelcontextprotocol/server-puppeteer',
    description: 'Web scraping and browser automation',
    priority: 'low',
    requiresApiKey: false
  },
  {
    name: 'brave-search',
    package: '@modelcontextprotocol/server-brave-search',
    description: 'Web search capabilities',
    priority: 'low',
    requiresApiKey: true,
    apiKeyName: 'BRAVE_API_KEY',
    apiKeyInstructions: 'Get a Brave Search API key at: https://brave.com/search/api/'
  }
];

console.log('\n🚀 VibeMaster MCP Setup\n');
console.log('━'.repeat(50));

// Function to check if a package is installed globally
function isPackageInstalled(packageName) {
  try {
    execSync(`npm list -g ${packageName}`, { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
}

// Function to ask a yes/no question
function askQuestion(question) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer.toLowerCase().startsWith('y'));
    });
  });
}

// Function to install packages
function installPackages(packages) {
  console.log('\n📦 Installing MCPs...\n');
  
  const packageNames = packages.map(p => p.package).join(' ');
  
  try {
    // Use spawn instead of execSync to show real-time output
    const child = spawn('npm', ['install', '-g', ...packages.map(p => p.package)], {
      stdio: 'inherit',
      shell: true
    });

    return new Promise((resolve, reject) => {
      child.on('close', (code) => {
        if (code === 0) {
          console.log('\n✅ MCPs installed successfully!\n');
          resolve(true);
        } else {
          console.error('\n❌ Installation failed with code', code);
          resolve(false);
        }
      });
    });
  } catch (error) {
    console.error('❌ Installation failed:', error.message);
    return false;
  }
}

// Function to update Claude Desktop config
async function updateClaudeConfig(installedMCPs) {
  const platform = process.platform;
  let configPath;
  
  if (platform === 'win32') {
    configPath = path.join(process.env.APPDATA || '', 'Claude', 'claude_desktop_config.json');
  } else if (platform === 'darwin') {
    configPath = path.join(process.env.HOME || '', 'Library', 'Application Support', 'Claude', 'claude_desktop_config.json');
  } else {
    configPath = path.join(process.env.HOME || '', '.config', 'Claude', 'claude_desktop_config.json');
  }

  const updateConfig = await askQuestion(`\n🔧 Would you like to automatically update your Claude Desktop config?\n   (${configPath}) [y/N]: `);
  
  if (!updateConfig) {
    console.log('\n⚠️  Remember to manually add the MCPs to your Claude Desktop config!');
    showManualConfigInstructions(installedMCPs);
    return;
  }

  try {
    // Create config directory if it doesn't exist
    const configDir = path.dirname(configPath);
    if (!fs.existsSync(configDir)) {
      fs.mkdirSync(configDir, { recursive: true });
    }

    // Read existing config or create new one
    let config = { mcpServers: {} };
    if (fs.existsSync(configPath)) {
      const existingConfig = fs.readFileSync(configPath, 'utf8');
      config = JSON.parse(existingConfig);
      if (!config.mcpServers) {
        config.mcpServers = {};
      }
    }

    // Add VibeMaster
    if (!config.mcpServers.vibemaster) {
      config.mcpServers.vibemaster = {
        command: 'vibemaster-mcp'
      };
    }

    // Add installed MCPs
    installedMCPs.forEach(mcp => {
      const serverName = mcp.name.replace('-mcp', '');
      if (!config.mcpServers[serverName]) {
        const mcpConfig = {
          command: 'npx',
          args: ['-y', mcp.package]
        };
        
        // Add env section with placeholder for MCPs that require API keys
        if (mcp.requiresApiKey) {
          mcpConfig.env = {
            [mcp.apiKeyName]: 'YOUR_API_KEY_HERE'
          };
        }
        
        config.mcpServers[serverName] = mcpConfig;
      }
    });

    // Write config
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
    console.log('\n✅ Claude Desktop config updated successfully!\n');
    
    // Show API key instructions if needed
    const mcpsRequiringKeys = installedMCPs.filter(mcp => mcp.requiresApiKey);
    if (mcpsRequiringKeys.length > 0) {
      console.log('🔑 API Keys Required:\n');
      console.log('   Some MCPs require API keys to function. Please update your config:\n');
      console.log(`   ${configPath}\n`);
      
      mcpsRequiringKeys.forEach(mcp => {
        console.log(`   📌 ${mcp.name}:`);
        console.log(`      • Key name: ${mcp.apiKeyName}`);
        console.log(`      • ${mcp.apiKeyInstructions}`);
        console.log(`      • Look for "${mcp.name.replace('-mcp', '')}" in your config\n`);
      });
      
      console.log('   Replace "YOUR_API_KEY_HERE" with your actual API keys.\n');
    }
    
    console.log('🔄 Please restart Claude Desktop to use the new MCPs.\n');
  } catch (error) {
    console.error('❌ Failed to update config:', error.message);
    showManualConfigInstructions(installedMCPs);
  }
}

function showManualConfigInstructions(installedMCPs) {
  console.log('\n📝 Manual configuration instructions:\n');
  console.log('   Add the following to your Claude Desktop config:\n');
  console.log('   {');
  console.log('     "mcpServers": {');
  console.log('       "vibemaster": {');
  console.log('         "command": "vibemaster-mcp"');
  console.log('       },');
  installedMCPs.forEach((mcp, index) => {
    const serverName = mcp.name.replace('-mcp', '');
    console.log(`       "${serverName}": {`);
    console.log(`         "command": "npx",`);
    console.log(`         "args": ["-y", "${mcp.package}"]`);
    
    if (mcp.requiresApiKey) {
      console.log(`         "env": {`);
      console.log(`           "${mcp.apiKeyName}": "YOUR_API_KEY_HERE"`);
      console.log(`         }`);
    }
    
    console.log(`       }${index < installedMCPs.length - 1 ? ',' : ''}`);
  });
  console.log('     }');
  console.log('   }\n');
  
  // Show API key instructions
  const mcpsRequiringKeys = installedMCPs.filter(mcp => mcp.requiresApiKey);
  if (mcpsRequiringKeys.length > 0) {
    console.log('🔑 API Keys:\n');
    mcpsRequiringKeys.forEach(mcp => {
      console.log(`   ${mcp.name}:`);
      console.log(`   • ${mcp.apiKeyInstructions}\n`);
    });
  }
}

// Main setup function
async function setup() {
  console.log('🔍 Checking for recommended MCPs...\n');

  const missingMCPs = RECOMMENDED_MCPS.filter(mcp => !isPackageInstalled(mcp.package));

  if (missingMCPs.length === 0) {
    console.log('✅ All recommended MCPs are already installed!\n');
    console.log('📖 For documentation, visit: https://github.com/SnaiilyDevelopment/VibemasterMCP\n');
    process.exit(0);
  }

  console.log('The following MCPs are recommended but not installed:\n');
  
  missingMCPs.forEach(mcp => {
    const priority = mcp.priority === 'high' ? '⭐' : mcp.priority === 'medium' ? '✨' : '💡';
    console.log(`   ${priority} ${mcp.name}`);
    console.log(`      ${mcp.description}\n`);
  });

  const installAll = await askQuestion('Would you like to install all recommended MCPs? [Y/n]: ');

  if (!installAll && installAll !== undefined) {
    console.log('\n⚠️  You can install MCPs later by running:');
    console.log('   npm install -g ' + missingMCPs.map(m => m.package).join(' '));
    console.log('\n📖 For more information, visit: https://github.com/SnaiilyDevelopment/VibemasterMCP\n');
    process.exit(0);
  }

  // Install packages
  const success = await installPackages(missingMCPs);

  if (success) {
    await updateClaudeConfig(missingMCPs);
  }

  console.log('🎉 Setup complete! Enjoy using VibeMaster MCP!\n');
  console.log('📖 Documentation: https://github.com/SnaiilyDevelopment/VibemasterMCP\n');
}

// Run setup
setup().catch(error => {
  console.error('❌ Setup failed:', error);
  process.exit(1);
});
