# Deployment Guide

## GitHub Pages Setup

This Hugo site deploys from the `gh-pages` branch via GitHub Actions.

### Branch Structure
- `gh-pages` - Hugo site (deploys to GitHub Pages)
- `main` - Next.js site (deploys to Vercel)

### Deployment Process
1. Push to `gh-pages` branch
2. GitHub Actions workflow (`.github/workflows/deploy.yml`) triggers
3. Hugo builds the site with production settings
4. Artifacts uploaded to GitHub Pages

### Required GitHub Settings
Go to Repository Settings → Pages:
- **Source**: GitHub Actions
- **Branch**: Not applicable (Actions handles deployment)

### Viewing Deployment Status
- Check: https://github.com/harshfolio/harshfolio.github.io/actions
- Site URL: https://harshfolio.github.io/

### Troubleshooting
If deployment fails:
1. Check GitHub Actions logs
2. Verify PaperMod theme submodule: `git submodule status`
3. Ensure `content/posts/_index.md` exists
4. Check Hugo version in workflow matches project needs
