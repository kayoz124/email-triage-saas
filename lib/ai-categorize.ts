import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export type EmailCategory = 'urgent' | 'important' | 'fyi' | 'spam';

interface EmailData {
  from: string;
  subject: string;
  snippet: string;
  body?: string;
}

export async function categorizeEmail(email: EmailData): Promise<{
  category: EmailCategory;
  summary: string;
  confidence: number;
}> {
  const prompt = `Categorize this email into one of four categories:

**urgent** - Needs immediate attention (deadlines, time-sensitive requests, critical issues)
**important** - Needs attention soon (meetings, decisions, valuable info)
**fyi** - Good to know but not urgent (newsletters, updates, confirmations)
**spam** - Promotional, irrelevant, or low-value

Email details:
From: ${email.from}
Subject: ${email.subject}
Preview: ${email.snippet}
${email.body ? `Body: ${email.body.substring(0, 1000)}` : ''}

Respond in JSON format:
{
  "category": "urgent|important|fyi|spam",
  "summary": "One sentence summary of why this email matters",
  "confidence": 0.0-1.0
}`;

  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4',
    max_tokens: 300,
    messages: [{ role: 'user', content: prompt }],
  });

  const text = response.content[0].type === 'text' ? response.content[0].text : '{}';
  const result = JSON.parse(text);

  return {
    category: result.category || 'fyi',
    summary: result.summary || 'Email received',
    confidence: result.confidence || 0.5,
  };
}

export async function draftReply(email: EmailData, userContext?: string): Promise<string> {
  const prompt = `Draft a professional reply to this email. Keep it concise and actionable.

From: ${email.from}
Subject: ${email.subject}
Body: ${email.body?.substring(0, 2000) || email.snippet}

${userContext ? `User context: ${userContext}` : ''}

Write only the email body (no subject line or greeting). Make it sound natural and helpful.`;

  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4',
    max_tokens: 500,
    messages: [{ role: 'user', content: prompt }],
  });

  return response.content[0].type === 'text' ? response.content[0].text : '';
}

export async function generateDigest(emails: EmailData[]): Promise<string> {
  const emailList = emails.map((e, i) => 
    `${i + 1}. From: ${e.from}\n   Subject: ${e.subject}\n   Preview: ${e.snippet}\n`
  ).join('\n');

  const prompt = `Create a brief daily email digest summarizing these ${emails.length} emails. Group by importance and highlight what needs attention.

${emailList}

Format as a clean, scannable summary with bullet points.`;

  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4',
    max_tokens: 1000,
    messages: [{ role: 'user', content: prompt }],
  });

  return response.content[0].type === 'text' ? response.content[0].text : '';
}
