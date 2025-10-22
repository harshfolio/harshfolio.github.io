# Deployment Configuration

This repository uses a **dual-branch deployment strategy** with strict isolation:

## Branch Deployment Matrix

| Branch | Technology | Deploys To | Trigger | Ignored By |
|--------|-----------|------------|---------|------------|
| `main` | Next.js 15 | **Vercel** | Push to main | GitHub Pages |
| `gh-pages` | Hugo | **GitHub Pages** | Push to gh-pages | Vercel |

## Main Branch → Vercel (Next.js)

### What Deploys
- **Framework**: Next.js 15 with React 19
- **Runtime**: Bun
- **Target**: Vercel (e.g., harshsharma.vercel.app)

### Configuration
**File**: `vercel.json`
```json
{
  "git": {
    "deploymentEnabled": {
      "gh-pages": false  // ✅ Excludes gh-pages from Vercel
    }
  },
  "buildCommand": "bun run build",
  "installCommand": "bun install",
  "framework": "nextjs"
}
```

### Key Points
- ✅ **No GitHub Actions workflow** - Vercel handles deployment automatically
- ✅ **gh-pages branch excluded** - Won't trigger Vercel builds
- ✅ Uses Bun for faster installs and builds
- ✅ Includes font and static asset caching headers

### Verifying Vercel Setup
1. Go to: https://vercel.com/dashboard
2. Find your project
3. Settings → Git → Ignored Build Step
4. Should show `gh-pages` excluded

## gh-pages Branch → GitHub Pages (Hugo)

### What Deploys
- **Framework**: Hugo (static site generator)
- **Theme**: PaperMod
- **Target**: GitHub Pages (harshfolio.github.io)

### Configuration
**File**: `.github/workflows/deploy.yml`
```yaml
on:
  push:
    branches:
      - gh-pages  # ✅ Only triggers on gh-pages
  workflow_dispatch:
```

### Key Points
- ✅ **GitHub Actions workflow** - Builds and deploys Hugo site
- ✅ **Only runs on gh-pages** - Won't trigger on main branch pushes
- ✅ No Vercel configuration files
- ✅ Uses GitHub Pages environment for deployment

### Verifying GitHub Pages Setup
1. Go to: https://github.com/harshfolio/harshfolio.github.io/settings/pages
2. Source: **GitHub Actions** (not "Deploy from a branch")
3. Check: https://github.com/harshfolio/harshfolio.github.io/actions
4. Should see workflow runs only for `gh-pages` commits

## How to Deploy

### Deploy Next.js (main branch)
```bash
git checkout main
# Make changes
git add .
git commit -m "feat: your changes"
git push origin main
# ✅ Automatically deploys to Vercel
# ❌ Does NOT trigger GitHub Pages
```

### Deploy Hugo (gh-pages branch)
```bash
git checkout gh-pages
# Make changes to content/
git add .
git commit -m "content: your changes"
git push origin gh-pages
# ✅ Automatically triggers GitHub Actions → GitHub Pages
# ❌ Does NOT trigger Vercel deployment
```

## Troubleshooting

### Vercel deploying from gh-pages?
**Problem**: Vercel shouldn't build gh-pages branch
**Fix**: Check `vercel.json` has `"gh-pages": false` under `git.deploymentEnabled`

### GitHub Pages deploying from main?
**Problem**: GitHub Actions shouldn't run on main branch
**Fix**:
1. Verify `.github/workflows/deploy.yml` only exists on `gh-pages` branch
2. Check workflow has `branches: - gh-pages` trigger

### Both deploying from same branch?
**Problem**: Conflicts in deployment configuration
**Fix**: Follow this guide's branch separation strictly

## Current Status

✅ **main branch**:
- No GitHub Actions workflows
- Vercel config excludes gh-pages
- Deploys only to Vercel

✅ **gh-pages branch**:
- Has GitHub Actions workflow
- Workflow triggers only on gh-pages
- Deploys only to GitHub Pages

## Quick Reference

**Working on Next.js site?** → Use `main` branch → Pushes deploy to Vercel
**Working on Hugo blog?** → Use `gh-pages` branch → Pushes deploy to GitHub Pages

**Never mix the two!** Each branch is isolated for its specific deployment target.
