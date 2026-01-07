#!/usr/bin/env node
/**
 * File watcher that automatically commits and pushes changes
 * Watches for file changes and pushes to GitHub after a delay
 * 
 * Usage: npm run watch-push
 */

const { execSync, spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

let pushTimeout;
const DEBOUNCE_DELAY = 5000; // Wait 5 seconds after last change before pushing

console.log('👀 Watching for file changes...');
console.log('📝 Changes will be auto-committed and pushed after 5 seconds of inactivity');
console.log('Press Ctrl+C to stop\n');

// Watch the entire project directory (excluding node_modules and .git)
const watchDir = process.cwd();
const ignoredDirs = ['node_modules', '.git', 'dist', 'build', '.next'];

function shouldIgnore(filePath) {
  return ignoredDirs.some(dir => filePath.includes(dir));
}

function getCommitMessage() {
  const date = new Date();
  return `Auto-update: ${date.toLocaleString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric', 
    hour: '2-digit', 
    minute: '2-digit' 
  })}`;
}

function pushChanges() {
  try {
    console.log('\n📦 Detected changes, preparing to push...');
    
    // Check if there are changes
    const status = execSync('git status --porcelain', { encoding: 'utf-8' });
    if (!status.trim()) {
      console.log('✅ No changes to commit\n');
      return;
    }

    console.log('📝 Staging all changes...');
    execSync('git add -A', { stdio: 'inherit' });

    const commitMsg = getCommitMessage();
    console.log(`💾 Committing: "${commitMsg}"`);
    execSync(`git commit -m "${commitMsg}"`, { stdio: 'inherit' });

    console.log('🚀 Pushing to GitHub...');
    const branch = execSync('git rev-parse --abbrev-ref HEAD', { encoding: 'utf-8' }).trim();
    execSync(`git push origin ${branch}`, { stdio: 'inherit' });

    console.log('✅ Successfully pushed to GitHub!\n');
  } catch (error) {
    console.error('❌ Error pushing:', error.message);
    console.log('⚠️  You may need to push manually\n');
  }
}

// Watch for changes
fs.watch(watchDir, { recursive: true }, (eventType, filename) => {
  if (!filename || shouldIgnore(filename)) return;
  
  // Ignore temporary files
  if (filename.endsWith('.tmp') || filename.endsWith('~')) return;
  
  console.log(`📝 Change detected: ${filename}`);
  
  // Clear existing timeout
  if (pushTimeout) {
    clearTimeout(pushTimeout);
  }
  
  // Set new timeout
  pushTimeout = setTimeout(pushChanges, DEBOUNCE_DELAY);
});

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\n\n👋 Stopping file watcher...');
  if (pushTimeout) {
    clearTimeout(pushTimeout);
    pushChanges(); // Push any pending changes
  }
  process.exit(0);
});

