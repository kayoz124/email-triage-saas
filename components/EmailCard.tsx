"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export interface Email {
  id: string;
  from: string;
  subject: string;
  snippet: string;
  category: "urgent" | "important" | "fyi" | "spam";
  receivedAt: string;
  isRead: boolean;
  body?: string;
  aiSummary?: string;
  draftReply?: string;
}

interface EmailCardProps {
  email: Email;
  onClick: (email: Email) => void;
}

const categoryColors: Record<Email["category"], string> = {
  urgent: "bg-red-500 hover:bg-red-600",
  important: "bg-orange-500 hover:bg-orange-600",
  fyi: "bg-blue-500 hover:bg-blue-600",
  spam: "bg-gray-500 hover:bg-gray-600",
};

export function EmailCard({ email, onClick }: EmailCardProps) {
  return (
    <Card
      className={`cursor-pointer transition-colors hover:bg-muted/50 ${
        !email.isRead ? "border-l-4 border-l-primary" : ""
      }`}
      onClick={() => onClick(email)}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className={`font-medium truncate ${!email.isRead ? "font-semibold" : ""}`}>
                {email.from}
              </span>
              <Badge className={categoryColors[email.category]}>
                {email.category}
              </Badge>
            </div>
            <h3 className={`text-sm truncate ${!email.isRead ? "font-semibold" : ""}`}>
              {email.subject}
            </h3>
            <p className="text-sm text-muted-foreground truncate mt-1">
              {email.snippet}
            </p>
          </div>
          <span className="text-xs text-muted-foreground whitespace-nowrap">
            {new Date(email.receivedAt).toLocaleDateString()}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
