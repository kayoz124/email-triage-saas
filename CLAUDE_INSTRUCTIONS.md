# Instructions for Claude.ai

## Context
Building an AI email triage SaaS (see PROJECT.md). You're handling the initial scaffolding, I'll integrate the AI/Gmail logic.

## What to Build

### 1. Next.js 14 App (App Router)
```bash
npx create-next-app@latest email-triage --typescript --tailwind --app --no-src-dir
```

### 2. Core Dependencies
```bash
npm install @supabase/supabase-js next-auth @auth/supabase-adapter resend
npm install -D prisma @prisma/client
```

### 3. Database Schema (Prisma)
Create `prisma/schema.prisma`:

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model User {
  id            String    @id @default(cuid())
  email         String    @unique
  name          String?
  image         String?
  gmailToken    String?   // Encrypted Gmail OAuth token
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  
  emails        Email[]
  preferences   UserPreferences?
}

model Email {
  id            String    @id @default(cuid())
  userId        String
  user          User      @relation(fields: [userId], references: [id])
  
  gmailId       String    @unique
  threadId      String
  from          String
  to            String
  subject       String
  snippet       String
  body          String?   @db.Text
  
  category      String    // urgent, important, fyi, spam
  aiSummary     String?   @db.Text
  draftReply    String?   @db.Text
  
  isRead        Boolean   @default(false)
  isArchived    Boolean   @default(false)
  receivedAt    DateTime
  processedAt   DateTime?
  
  createdAt     DateTime  @default(now())
  
  @@index([userId, category])
  @@index([userId, receivedAt])
}

model UserPreferences {
  id                String   @id @default(cuid())
  userId            String   @unique
  user              User     @relation(fields: [userId], references: [id])
  
  digestFrequency   String   @default("daily") // daily, twice-daily, hourly
  autoArchiveFyi    Boolean  @default(false)
  draftReplies      Boolean  @default(true)
  
  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt
}
```

### 4. File Structure
```
email-triage/
├── app/
│   ├── api/
│   │   ├── auth/[...nextauth]/route.ts
│   │   ├── gmail/
│   │   │   ├── oauth/route.ts
│   │   │   └── webhook/route.ts
│   │   └── emails/
│   │       ├── categorize/route.ts
│   │       └── draft/route.ts
│   ├── dashboard/
│   │   └── page.tsx
│   ├── settings/
│   │   └── page.tsx
│   └── page.tsx (landing page)
├── components/
│   ├── ui/ (shadcn components)
│   ├── EmailList.tsx
│   ├── EmailCard.tsx
│   └── CategoryFilter.tsx
├── lib/
│   ├── auth.ts
│   ├── db.ts
│   └── gmail.ts (stub - Jarvis will implement)
└── prisma/
    └── schema.prisma
```

### 5. Landing Page
Simple hero + 3 features + CTA:
- "Your AI Email Assistant"
- Feature 1: Smart categorization
- Feature 2: Auto-drafted replies
- Feature 3: Daily digests
- CTA: "Start Free Trial" → /api/auth/signin

### 6. Dashboard Page
- Tabs: Urgent | Important | FYI | Archived
- Email list (subject, from, snippet, category badge)
- Click email → modal with full content + draft reply
- Approve/Edit/Discard reply buttons

### 7. Settings Page
- Gmail connection status
- Digest frequency selector
- Toggle: Auto-archive FYI emails
- Toggle: Generate draft replies

## What NOT to Implement
- Actual Gmail OAuth flow (Jarvis handles this)
- AI categorization logic (Jarvis handles this)
- Email fetching/syncing (Jarvis handles this)

Just create the UI, routes, and database schema. Use placeholder data in components.

## Environment Variables Template
Create `.env.example`:
```
DATABASE_URL="postgresql://..."
NEXTAUTH_SECRET="..."
NEXTAUTH_URL="http://localhost:3000"
GOOGLE_CLIENT_ID="..."
GOOGLE_CLIENT_SECRET="..."
ANTHROPIC_API_KEY="..."
RESEND_API_KEY="..."
```

## Deliverable
Push to GitHub repo: `anthonypetti/email-triage-saas` (create if doesn't exist)

Branch: `main`
First commit: "Initial Next.js scaffolding + DB schema"

---

**Questions? Ask Anthony. When done, Jarvis takes over for AI integration.**
