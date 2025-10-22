# Deployment Guide

## Vercel Deployment

### Initial Setup

1. Push code to GitHub:
   ```bash
   git push origin nextjs-beta
   ```

2. Import to Vercel:
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository
   - Select `nextjs-beta` branch

3. Configure Build Settings:
   - **Framework Preset:** Next.js
   - **Build Command:** `bun run build`
   - **Install Command:** `bun install`
   - **Output Directory:** `.next`

4. Add Environment Variables (if needed):
   - `NEXT_PUBLIC_SITE_URL`
   - Analytics keys (optional)

5. Deploy!

### Multiple Deployments Strategy

**Production:**
- Branch: `main`
- Domain: `harshfolio.github.io` (or custom domain)
- Auto-deploy on push

**Beta/Preview:**
- Branch: `nextjs-beta`
- Domain: `nextjs-beta-harshfolio.vercel.app`
- Auto-deploy on push

**Feature Branches:**
- Branch: `feature/*`
- Domain: Auto-generated preview URLs
- Auto-deploy on PR

### Custom Domain Setup

1. Add domain in Vercel project settings
2. Update DNS records:
   - Type: `CNAME`
   - Name: `www` or `@`
   - Value: `cname.vercel-dns.com`

3. Wait for SSL certificate (automatic)

### Performance Monitoring

Enable in Vercel dashboard:
- **Speed Insights:** Track Core Web Vitals
- **Analytics:** Privacy-friendly page views

## GitHub Pages (Legacy Hugo)

The Hugo site remains on `main` branch. To switch fully to Next.js:

1. Merge `nextjs-beta` → `main`
2. Update GitHub Pages settings to use Vercel instead
3. Archive Hugo files

## Environment Variables

Required:
- `NEXT_PUBLIC_SITE_URL` - Your site URL

Optional:
- `NEXT_PUBLIC_VERCEL_ANALYTICS_ID` - Vercel Analytics

## Troubleshooting

**Build fails on Vercel:**
- Check Bun version matches local
- Verify all dependencies in package.json
- Check build logs for TypeScript errors

**Images not loading:**
- Verify files are in `public/` directory
- Check Next.js Image component `src` paths

**Content not updating:**
- Velite runs during build, not runtime
- Clear `.velite/` and rebuild
