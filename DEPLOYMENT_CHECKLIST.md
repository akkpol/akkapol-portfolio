# DEPLOYMENT_BLOCKED - Quick Fix Checklist ✅

## Current Status
✅ **Code fix is already applied** - `auth.config.ts` has proper validation
⚠️ **Issue**: Environment variables must be set in Vercel Dashboard

## Quick Fix Steps

### 1. Verify Environment Variables in Vercel
Go to: [Vercel Dashboard](https://vercel.com/dashboard) → Your Project → **Settings** → **Environment Variables**

Ensure these 5 variables are set for **ALL environments** (Production, Preview, Development):

- [ ] `NEXTAUTH_URL` = `https://akkapol-portfolio.vercel.app` (เปลี่ยนเป็น URL จริงของคุณ)
- [ ] `NEXTAUTH_SECRET` = (your secret from `.env.local`)
- [ ] `GOOGLE_CLIENT_ID` = (from Google Cloud Console)
- [ ] `GOOGLE_CLIENT_SECRET` = (from Google Cloud Console)
- [ ] `ADMIN_EMAILS` = `akkapol.kumpapug@gmail.com`

### 2. Redeploy
After setting environment variables:
- Go to **Deployments** tab
- Click **...** on latest deployment
- Click **Redeploy**

OR simply push new code:
```bash
git push origin master
```

### 3. Verify Build Success
- Check deployment status turns **Ready** (green)
- No more **Error** (red) status

## Why This Happens

**The Error Chain:**
```
Missing Env Var → Validation Throws → Build Fails → DEPLOYMENT_BLOCKED
```

**Why it's good:**
- Prevents broken apps from going live
- Forces proper configuration
- Security: ensures secrets are set

## Prevention

**Before every deployment, check:**
1. ✅ All required env vars are in Vercel
2. ✅ Values are correct (no typos, no extra spaces)
3. ✅ Set for all environments (Production, Preview, Development)
4. ✅ Code has validation (already done ✅)

## Quick Test

Run locally to verify:
```bash
# Remove .env.local temporarily
mv .env.local .env.local.backup

# Try to build - should fail with clear error
npm run build

# Restore
mv .env.local.backup .env.local
```

This simulates what happens on Vercel if env vars are missing.

