#!/usr/bin/env node
/**
 * Auto-push script for GitHub
 * Run this script to automatically commit and push all changes
 * 
 * Usage: node auto-push.js [commit-message]
 */

const { execSync } = require('child_process');
const fs = require('fs');

// Get commit message from command line or use default
const commitMessage = process.argv[2] || `Auto-update: ${new Date().toLocaleString()}`;

try {
  console.log('📦 Checking for changes...');
  
  // Check if there are any changes
  const status = execSync('git status --porcelain', { encoding: 'utf-8' });
  
  if (!status.trim()) {
    console.log('✅ No changes to commit');
    return;
  }

  console.log('📝 Staging all changes...');
  execSync('git add -A', { stdio: 'inherit' });

  console.log(`💾 Committing changes: "${commitMessage}"`);
  execSync(`git commit -m "${commitMessage}"`, { stdio: 'inherit' });

  console.log('🚀 Pushing to GitHub...');
  const branch = execSync('git rev-parse --abbrev-ref HEAD', { encoding: 'utf-8' }).trim();
  execSync(`git push origin ${branch}`, { stdio: 'inherit' });

  console.log('✅ Successfully pushed to GitHub!');
} catch (error) {
  console.error('❌ Error:', error.message);
  process.exit(1);
}

