import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { PrismaClient } from '@prisma/client';
import { draftReply } from '@/lib/ai-categorize';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { emailId, userContext } = await req.json();

  const email = await prisma.email.findUnique({
    where: { id: emailId },
    include: { user: true },
  });

  if (!email || email.user.email !== session.user.email) {
    return NextResponse.json({ error: 'Email not found' }, { status: 404 });
  }

  const draft = await draftReply({
    from: email.from,
    subject: email.subject,
    snippet: email.snippet,
    body: email.body || undefined,
  }, userContext);

  // Save draft to database
  const updated = await prisma.email.update({
    where: { id: emailId },
    data: { draftReply: draft },
  });

  return NextResponse.json({ draft, email: updated });
}
