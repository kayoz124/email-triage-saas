# Deploy to Vercel (2 minutes)

## Quick Deploy

1. Go to https://vercel.com/new
2. Sign in with GitHub
3. Import `kayoz124/email-triage-saas`
4. Add environment variables (use the same ones from your local .env.local):
   ```
   NEXTAUTH_SECRET=<generate with: openssl rand -base64 32>
   NEXTAUTH_URL=<will be auto-filled after first deploy>
   GOOGLE_CLIENT_ID=<your Google OAuth client ID>
   GOOGLE_CLIENT_SECRET=<your Google OAuth secret>
   ANTHROPIC_API_KEY=<your Anthropic API key>
   DATABASE_URL=file:./prisma/dev.db
   ```
5. Click **Deploy**

## After First Deploy

1. Copy your Vercel URL (e.g., `https://email-triage-saas.vercel.app`)
2. Go to https://console.cloud.google.com/apis/credentials?project=seventh-hallway-486020-t4
3. Edit your OAuth Client
4. Add to **Authorized redirect URIs**:
   ```
   https://your-vercel-url.vercel.app/api/auth/callback/google
   ```
5. Save
6. Redeploy on Vercel (or wait for auto-deploy)

## Test

1. Visit your Vercel URL
2. Click "Start Free Trial"
3. Sign in with Google (your Gmail)
4. App will sync your emails
5. Go to Dashboard → see categorized emails

---

**Deploy time**: ~2 minutes
**First sync**: ~30 seconds (depends on email count)
