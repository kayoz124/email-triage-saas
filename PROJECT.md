# Email Triage SaaS - Project Brief

## Product Vision
AI-powered email assistant that monitors Gmail 24/7, categorizes by urgency, drafts responses, and surfaces only what matters.

## Target Market
- Executives, founders, busy professionals
- Anyone drowning in email (50+ daily)
- Price: $99/mo individual, $299/mo team

## MVP Features (v0.1 - 3 weeks)
1. Gmail OAuth integration
2. AI email categorization (Urgent/Important/FYI/Spam)
3. Daily digest emails
4. Response drafting (approve before send)
5. Simple web dashboard
6. User settings/preferences

## Tech Stack
- **Frontend:** Next.js 14 (App Router), Tailwind CSS, shadcn/ui
- **Backend:** Next.js API routes, PostgreSQL (Supabase)
- **Auth:** NextAuth.js with Google OAuth
- **AI:** Anthropic Claude API (already have access)
- **Deployment:** Vercel (free tier → start)
- **Email:** Gmail API + Resend (for digests)

## Revenue Model
- $99/mo individual
- $299/mo team (5 users)
- Target: 100 users = $118k/year

## Timeline
- Week 1: Scaffolding + Auth + Gmail OAuth
- Week 2: AI categorization + Dashboard
- Week 3: Response drafting + Polish
- Week 4: Launch on Product Hunt

## Success Metrics
- Beta signup conversion >10%
- Daily active usage >60%
- Paid conversion >5%
- Churn <5%/mo

---

**Status:** Ready to build
**Next:** GitHub repo creation
