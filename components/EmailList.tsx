"use client";

import { EmailCard, Email } from "./EmailCard";

interface EmailListProps {
  emails: Email[];
  onEmailClick: (email: Email) => void;
}

export function EmailList({ emails, onEmailClick }: EmailListProps) {
  if (emails.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <p className="text-muted-foreground">No emails in this category</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {emails.map((email) => (
        <EmailCard key={email.id} email={email} onClick={onEmailClick} />
      ))}
    </div>
  );
}
