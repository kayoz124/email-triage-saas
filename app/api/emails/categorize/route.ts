import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { PrismaClient } from '@prisma/client';
import { categorizeEmail, draftReply } from '@/lib/ai-categorize';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { emailId } = await req.json();

  const email = await prisma.email.findUnique({
    where: { id: emailId },
    include: { user: true },
  });

  if (!email || email.user.email !== session.user.email) {
    return NextResponse.json({ error: 'Email not found' }, { status: 404 });
  }

  // Categorize with AI
  const result = await categorizeEmail({
    from: email.from,
    subject: email.subject,
    snippet: email.snippet,
    body: email.body || undefined,
  });

  // Update email with category and summary
  const updated = await prisma.email.update({
    where: { id: emailId },
    data: {
      category: result.category,
      aiSummary: result.summary,
      processedAt: new Date(),
    },
  });

  return NextResponse.json(updated);
}

// Batch categorize all uncategorized emails
export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: { emails: { where: { processedAt: null }, take: 50 } },
  });

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  const results = [];
  for (const email of user.emails) {
    const result = await categorizeEmail({
      from: email.from,
      subject: email.subject,
      snippet: email.snippet,
      body: email.body || undefined,
    });

    const updated = await prisma.email.update({
      where: { id: email.id },
      data: {
        category: result.category,
        aiSummary: result.summary,
        processedAt: new Date(),
      },
    });

    results.push(updated);
  }

  return NextResponse.json({ categorized: results.length, emails: results });
}
