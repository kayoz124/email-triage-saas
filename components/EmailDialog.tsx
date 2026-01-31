"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Email } from "./EmailCard";

interface EmailDialogProps {
  email: Email | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const categoryColors: Record<Email["category"], string> = {
  urgent: "bg-red-500 hover:bg-red-600",
  important: "bg-orange-500 hover:bg-orange-600",
  fyi: "bg-blue-500 hover:bg-blue-600",
  spam: "bg-gray-500 hover:bg-gray-600",
};

export function EmailDialog({ email, open, onOpenChange }: EmailDialogProps) {
  if (!email) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-2">
            <Badge className={categoryColors[email.category]}>
              {email.category}
            </Badge>
            <span className="text-sm text-muted-foreground">
              {new Date(email.receivedAt).toLocaleString()}
            </span>
          </div>
          <DialogTitle>{email.subject}</DialogTitle>
          <p className="text-sm text-muted-foreground">From: {email.from}</p>
        </DialogHeader>

        <Separator />

        {email.aiSummary && (
          <div className="bg-muted/50 p-4 rounded-lg">
            <h4 className="font-medium mb-2 text-sm">AI Summary</h4>
            <p className="text-sm">{email.aiSummary}</p>
          </div>
        )}

        <div className="prose prose-sm max-w-none">
          <p className="whitespace-pre-wrap">{email.body || email.snippet}</p>
        </div>

        {email.draftReply && (
          <>
            <Separator />
            <div className="space-y-4">
              <h4 className="font-medium">Suggested Reply</h4>
              <div className="bg-muted/50 p-4 rounded-lg">
                <p className="text-sm whitespace-pre-wrap">{email.draftReply}</p>
              </div>
              <div className="flex gap-2">
                <Button>Approve & Send</Button>
                <Button variant="outline">Edit Reply</Button>
                <Button variant="ghost">Discard</Button>
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
