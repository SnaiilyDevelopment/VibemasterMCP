#!/usr/bin/env node

import { execSync } from 'child_process';
import path from 'path';

console.log('\n🎉 VibeMaster MCP installed successfully!\n');

// Check if this is a global install or in CI environment
const isGlobal = process.env.npm_config_global === 'true';
const isCI = process.env.CI === 'true';

if (isCI) {
  console.log('ℹ️  CI environment detected. Skipping MCP recommendations.\n');
  process.exit(0);
}

if (!isGlobal) {
  console.log('💡 Next steps:\n');
  console.log('   1. Build the project:');
  console.log('      npm run build\n');
  console.log('   2. Run the interactive setup to install recommended MCPs:');
  console.log('      npm run setup\n');
  console.log('📖 Documentation: https://github.com/SnaiilyDevelopment/VibemasterMCP\n');
  process.exit(0);
}

// For global installs
console.log('✅ VibeMaster is now available globally!\n');
console.log('💡 To install recommended MCPs, run:\n');
console.log('   npm run setup\n');
console.log('📖 Documentation: https://github.com/SnaiilyDevelopment/VibemasterMCP\n');

