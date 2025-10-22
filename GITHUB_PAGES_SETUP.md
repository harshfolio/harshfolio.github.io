# GitHub Pages Setup - Action Required

## What Was Fixed

### Issues Resolved:
1. ✅ **Missing `content/posts/_index.md`** - Hugo requires this for section list pages
2. ✅ **GitHub Actions workflow** - Correctly configured to deploy from `gh-pages` branch
3. ✅ **Theme submodule** - PaperMod theme properly initialized
4. ✅ **Deployment workflow** - Triggered by push to `gh-pages`

### Current Branch Structure:
- **`gh-pages`** → Hugo site (deploys to GitHub Pages at harshfolio.github.io)
- **`main`** → Next.js site (deploys to Vercel)

## Critical: Verify Repository Settings

You MUST verify GitHub Pages is configured correctly:

### Step 1: Check GitHub Pages Source
1. Go to: https://github.com/harshfolio/harshfolio.github.io/settings/pages
2. Under **"Build and deployment"**:
   - **Source** must be: **GitHub Actions** (NOT "Deploy from a branch")

   If it says "Deploy from a branch":
   - Click the dropdown
   - Select **"GitHub Actions"**
   - Click Save

### Step 2: Verify Workflow Ran Successfully
1. Go to: https://github.com/harshfolio/harshfolio.github.io/actions
2. Look for the most recent workflow run (should be "Deploy Hugo site to GitHub Pages")
3. Status should be green ✓ (success)
4. If red ✗ (failed):
   - Click on the failed run
   - Check the logs for errors
   - Common issues:
     - Theme submodule not initialized (run: `git submodule update --init --recursive`)
     - Hugo version mismatch
     - Missing dependencies

### Step 3: Verify Site Deployment
1. Visit: https://harshfolio.github.io/
2. Click "Blog" or visit: https://harshfolio.github.io/posts/
3. You should see:
   - Blog listing page with 2 posts
   - "Building a Medical AI Assistant" post
   - "Building a modern analytics stack" post

## If Deployment Fails

### Check Permissions
GitHub Actions needs these permissions:
1. Go to: https://github.com/harshfolio/harshfolio.github.io/settings/actions
2. Under **"Workflow permissions"**:
   - Select: **"Read and write permissions"**
   - Check: ✓ **"Allow GitHub Actions to create and approve pull requests"**
3. Click Save

### Re-run Workflow Manually
If automatic deployment didn't trigger:
1. Go to: https://github.com/harshfolio/harshfolio.github.io/actions
2. Click on "Deploy Hugo site to GitHub Pages"
3. Click "Run workflow" dropdown on the right
4. Select branch: `gh-pages`
5. Click "Run workflow"

## Expected Deployment Timeline

- **Trigger**: Push to `gh-pages` branch
- **Build time**: 1-2 minutes (Hugo build + theme setup)
- **Deploy time**: 30-60 seconds
- **Total**: 2-3 minutes from push to live

## Verification Checklist

- [ ] GitHub Pages source set to "GitHub Actions"
- [ ] Latest workflow run succeeded (green checkmark)
- [ ] https://harshfolio.github.io/ loads correctly
- [ ] https://harshfolio.github.io/posts/ shows blog listing
- [ ] Both blog posts are accessible
- [ ] No 404 errors

## Current Status

**Latest commit**: `1fe354c` - Deployment docs added
**Deployment triggered**: Just now (on push)
**Expected live**: Within 3 minutes

Check the Actions tab for real-time build status!
