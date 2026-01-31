import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { syncEmails } from '@/lib/gmail';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user?.gmailToken) {
    return NextResponse.json({ error: 'Gmail not connected' }, { status: 400 });
  }

  try {
    const count = await syncEmails(user.id, user.gmailToken);
    return NextResponse.json({ success: true, synced: count });
  } catch (error) {
    console.error('Gmail sync error:', error);
    return NextResponse.json({ error: 'Sync failed' }, { status: 500 });
  }
}
