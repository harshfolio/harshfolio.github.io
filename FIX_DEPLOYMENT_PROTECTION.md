# 🚨 URGENT: Fix GitHub Pages Deployment Protection

## Current Issue
The `gh-pages` branch is **blocked** from deploying to GitHub Pages due to environment protection rules.

**Error Message:**
```
Branch "gh-pages" is not allowed to deploy to github-pages due to environment protection rules.
```

## Fix Required (30 seconds)

### Step 1: Go to Environment Settings
Visit: https://github.com/harshfolio/harshfolio.github.io/settings/environments

### Step 2: Click on "github-pages" Environment
You should see an environment called `github-pages` - click on it.

### Step 3: Fix Deployment Branches

Under **"Deployment branches"**, you'll see current protection rules.

**Option A: Allow All Branches (Simplest)**
- Click "Deployment branches" dropdown
- Select: **"All branches"**
- Click "Save protection rules"

**Option B: Allow Specific Branch (Most Secure)**
- Click "Deployment branches" dropdown  
- Select: **"Selected branches"**
- Click "Add deployment branch rule"
- Enter: `gh-pages`
- Click "Add rule"
- Click "Save protection rules"

### Step 4: Re-run Failed Workflow
1. Go to: https://github.com/harshfolio/harshfolio.github.io/actions
2. Find the failed workflow run
3. Click "Re-run jobs" → "Re-run failed jobs"

**OR** just push any small change to `gh-pages`:
```bash
git checkout gh-pages
echo "" >> README.md
git commit -am "trigger: test deployment"
git push origin gh-pages
```

## Expected Result

✅ Workflow completes successfully
✅ Site deploys to https://harshfolio.github.io/
✅ Blog posts visible at https://harshfolio.github.io/posts/

## What We Fixed Today

### ✅ Completed Fixes:

1. **Main Branch (Next.js → Vercel)**
   - ✅ Removed conflicting GitHub Pages workflow
   - ✅ Verified `vercel.json` excludes `gh-pages` branch
   - ✅ Main branch now deploys ONLY to Vercel

2. **gh-pages Branch (Hugo → GitHub Pages)**
   - ✅ Workflow triggers ONLY on `gh-pages` pushes
   - ✅ Restored required `environment: github-pages` config
   - ✅ Added missing `content/posts/_index.md`

### ⚠️ Manual Fix Required:

**Environment Protection Rules** - This can ONLY be fixed via GitHub web UI (above steps).

## After Fix: Deployment Matrix

| Branch | Technology | Deploys To | Status |
|--------|-----------|------------|--------|
| `main` | Next.js 15 | Vercel | ✅ Ready |
| `gh-pages` | Hugo | GitHub Pages | ⏳ Waiting for protection rules fix |

## Quick Test After Fix

```bash
# Test Hugo deployment
git checkout gh-pages
echo "# Test" >> test.md
git add test.md
git commit -m "test: verify deployment"
git push origin gh-pages
# Should trigger GitHub Actions → Deploy successfully

# Test Next.js deployment  
git checkout main
# Make any change
git push origin main
# Should trigger Vercel → Deploy successfully
# Should NOT trigger GitHub Actions ✅
```

## Documentation

Full deployment guide available in:
- `DEPLOYMENT.md` (on main branch)
- `GITHUB_PAGES_SETUP.md` (on gh-pages branch)

---

**After fixing environment protection, both branches will deploy independently with zero conflicts! 🚀**
