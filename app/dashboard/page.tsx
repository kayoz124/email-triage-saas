"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CategoryFilter, Category } from "@/components/CategoryFilter";
import { EmailList } from "@/components/EmailList";
import { EmailDialog } from "@/components/EmailDialog";
import { Email } from "@/components/EmailCard";

// Placeholder data
const placeholderEmails: Email[] = [
  {
    id: "1",
    from: "boss@company.com",
    subject: "Urgent: Q4 Report Review Needed",
    snippet: "Please review the attached Q4 report before EOD today. We need your sign-off before the board meeting tomorrow.",
    category: "urgent",
    receivedAt: new Date().toISOString(),
    isRead: false,
    body: "Hi,\n\nPlease review the attached Q4 report before EOD today. We need your sign-off before the board meeting tomorrow.\n\nThe key metrics look good but I want your input on the projections section.\n\nThanks,\nJohn",
    aiSummary: "Your boss needs you to review and approve the Q4 report today before tomorrow's board meeting. Focus on the projections section.",
    draftReply: "Hi John,\n\nI'll review the Q4 report this afternoon and have my feedback to you by 5 PM. I'll pay particular attention to the projections section as you mentioned.\n\nBest regards",
  },
  {
    id: "2",
    from: "client@bigcorp.com",
    subject: "Contract Renewal Discussion",
    snippet: "I'd like to schedule a call to discuss our upcoming contract renewal and potential expansion of services.",
    category: "important",
    receivedAt: new Date(Date.now() - 3600000).toISOString(),
    isRead: false,
    body: "Hello,\n\nI'd like to schedule a call to discuss our upcoming contract renewal and potential expansion of services.\n\nWe've been very happy with your team's work this year and are considering increasing our engagement.\n\nPlease let me know your availability for next week.\n\nBest,\nSarah",
    aiSummary: "Client wants to discuss contract renewal and potentially expand the engagement. They're satisfied with your work.",
    draftReply: "Hi Sarah,\n\nThank you for reaching out! I'm glad to hear you've been happy with our collaboration.\n\nI'm available next week on Tuesday or Thursday afternoon. Would either of those work for you?\n\nLooking forward to discussing the renewal and expansion opportunities.\n\nBest regards",
  },
  {
    id: "3",
    from: "hr@company.com",
    subject: "Updated PTO Policy",
    snippet: "Please find attached the updated PTO policy effective January 1st. Key changes include increased carryover days.",
    category: "fyi",
    receivedAt: new Date(Date.now() - 7200000).toISOString(),
    isRead: true,
    body: "Hi Team,\n\nPlease find attached the updated PTO policy effective January 1st.\n\nKey changes include:\n- Increased carryover days from 5 to 10\n- New mental health days (3 per year)\n- Simplified request process\n\nBest,\nHR Team",
    aiSummary: "HR updated the PTO policy with more carryover days (10 instead of 5) and new mental health days. Effective January 1st.",
  },
  {
    id: "4",
    from: "newsletter@techsite.com",
    subject: "This week in tech: AI breakthroughs",
    snippet: "Your weekly roundup of the biggest tech news, including major AI announcements from leading companies.",
    category: "fyi",
    receivedAt: new Date(Date.now() - 86400000).toISOString(),
    isRead: true,
    body: "This week's top stories:\n\n1. New AI model released\n2. Startup raises $100M\n3. Tech earnings beat expectations\n\nRead more on our website.",
    aiSummary: "Weekly tech newsletter covering AI news and industry updates.",
  },
  {
    id: "5",
    from: "team@startup.com",
    subject: "Meeting Notes: Product Roadmap",
    snippet: "Here are the notes from yesterday's product roadmap discussion. Please review and add any comments.",
    category: "important",
    receivedAt: new Date(Date.now() - 172800000).toISOString(),
    isRead: true,
    body: "Team,\n\nHere are the notes from yesterday's product roadmap discussion:\n\n1. Q1 Focus: Mobile app improvements\n2. Q2 Focus: API v2 launch\n3. Q3 Focus: Enterprise features\n\nPlease add any comments to the shared doc.\n\nBest,\nProduct Team",
    aiSummary: "Meeting notes outlining product roadmap: Q1 mobile, Q2 API v2, Q3 enterprise features. They want your input.",
  },
];

const archivedEmails: Email[] = [
  {
    id: "6",
    from: "promo@store.com",
    subject: "50% off everything!",
    snippet: "Limited time offer - shop now and save big on all items.",
    category: "spam",
    receivedAt: new Date(Date.now() - 259200000).toISOString(),
    isRead: true,
  },
];

export default function DashboardPage() {
  const [activeCategory, setActiveCategory] = useState<Category>("urgent");
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const getEmailsForCategory = (category: Category): Email[] => {
    if (category === "archived") {
      return archivedEmails;
    }
    return placeholderEmails.filter((email) => email.category === category);
  };

  const counts = {
    urgent: placeholderEmails.filter((e) => e.category === "urgent" && !e.isRead).length,
    important: placeholderEmails.filter((e) => e.category === "important" && !e.isRead).length,
    fyi: placeholderEmails.filter((e) => e.category === "fyi" && !e.isRead).length,
    archived: archivedEmails.length,
  };

  const handleEmailClick = (email: Email) => {
    setSelectedEmail(email);
    setDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <Link href="/" className="text-xl font-bold">
              EmailTriage
            </Link>
            <div className="flex items-center gap-4">
              <Link href="/settings">
                <Button variant="ghost">Settings</Button>
              </Link>
              <Link href="/api/auth/signout">
                <Button variant="outline">Sign Out</Button>
              </Link>
            </div>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Inbox</h1>
          <p className="text-muted-foreground">
            {placeholderEmails.filter((e) => !e.isRead).length} unread emails
          </p>
        </div>

        <div className="mb-6">
          <CategoryFilter
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
            counts={counts}
          />
        </div>

        <EmailList
          emails={getEmailsForCategory(activeCategory)}
          onEmailClick={handleEmailClick}
        />

        <EmailDialog
          email={selectedEmail}
          open={dialogOpen}
          onOpenChange={setDialogOpen}
        />
      </main>
    </div>
  );
}
