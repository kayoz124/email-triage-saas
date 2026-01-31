import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';

export async function getGmailClient(accessToken: string) {
  const oauth2Client = new OAuth2Client();
  oauth2Client.setCredentials({ access_token: accessToken });
  
  return google.gmail({ version: 'v1', auth: oauth2Client });
}

export async function fetchEmails(accessToken: string, maxResults = 50) {
  const gmail = await getGmailClient(accessToken);
  
  const response = await gmail.users.messages.list({
    userId: 'me',
    maxResults,
    q: 'is:unread',
  });

  const messages = response.data.messages || [];
  const emails = [];

  for (const message of messages) {
    const detail = await gmail.users.messages.get({
      userId: 'me',
      id: message.id!,
      format: 'full',
    });

    const headers = detail.data.payload?.headers || [];
    const getHeader = (name: string) =>
      headers.find((h) => h.name?.toLowerCase() === name.toLowerCase())?.value || '';

    let body = '';
    if (detail.data.payload?.parts) {
      const textPart = detail.data.payload.parts.find((p) => p.mimeType === 'text/plain');
      if (textPart?.body?.data) {
        body = Buffer.from(textPart.body.data, 'base64').toString('utf-8');
      }
    } else if (detail.data.payload?.body?.data) {
      body = Buffer.from(detail.data.payload.body.data, 'base64').toString('utf-8');
    }

    emails.push({
      gmailId: detail.data.id!,
      threadId: detail.data.threadId!,
      from: getHeader('from'),
      to: getHeader('to'),
      subject: getHeader('subject'),
      snippet: detail.data.snippet || '',
      body: body.substring(0, 10000), // Limit body size
      receivedAt: new Date(parseInt(detail.data.internalDate || '0')),
    });
  }

  return emails;
}

export async function syncEmails(userId: string, accessToken: string) {
  const emails = await fetchEmails(accessToken);
  
  // Import prisma here to avoid circular dependencies
  const { PrismaClient } = await import('@prisma/client');
  const prisma = new PrismaClient();

  for (const email of emails) {
    await prisma.email.upsert({
      where: { gmailId: email.gmailId },
      update: {},
      create: {
        ...email,
        userId,
        category: 'fyi', // Will be categorized by AI
      },
    });
  }

  await prisma.$disconnect();
  return emails.length;
}

export async function watchInbox(accessToken: string) {
  const gmail = await getGmailClient(accessToken);
  
  // Set up Gmail push notifications
  // For MVP, we'll poll instead - real-time push requires webhook setup
  return { status: 'polling-mode' };
}
