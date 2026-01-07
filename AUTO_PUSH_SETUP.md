# Auto-Push to GitHub Setup

This project has been configured with automatic GitHub updates. You have three options:

## Option 1: Automatic Push on Every Commit (Recommended for Quick Updates)

A Git hook has been set up that automatically pushes to GitHub after every commit.

**How it works:**
- After you commit changes, they are automatically pushed to GitHub
- No extra steps needed!

**To use:**
```bash
git add .
git commit -m "Your commit message"
# Automatically pushes to GitHub!
```

## Option 2: Manual Auto-Push Script

Use the `auto-push.js` script to commit and push all changes at once.

**To use:**
```bash
npm run auto-push
# Or with a custom message:
node auto-push.js "Your custom commit message"
```

This will:
1. Stage all changes
2. Commit with a message
3. Push to GitHub

## Option 3: File Watcher (Auto-commit and push on file changes)

The file watcher automatically commits and pushes changes whenever you save files.

**To use:**
```bash
npm run watch-push
```

This will:
- Watch for file changes
- Wait 5 seconds after the last change
- Automatically commit and push to GitHub

**To stop:** Press `Ctrl+C`

## Important Notes

⚠️ **Warning:** Automatic pushing can:
- Push incomplete or broken code
- Create many small commits
- Push sensitive information if not careful

**Best Practices:**
1. Test your code before committing
2. Use meaningful commit messages
3. Review changes before pushing
4. Consider using Option 2 (manual script) for more control

## Disabling Auto-Push

To disable the automatic post-commit hook:
```bash
# On Windows (PowerShell):
Remove-Item .git/hooks/post-commit

# On Mac/Linux:
rm .git/hooks/post-commit
```

## Current Setup

- ✅ Post-commit hook: Enabled (auto-pushes after commit)
- ✅ Auto-push script: Available (`npm run auto-push`)
- ✅ File watcher: Available (`npm run watch-push`)

Choose the option that works best for your workflow!

