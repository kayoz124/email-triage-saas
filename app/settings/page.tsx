"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

export default function SettingsPage() {
  const [isGmailConnected] = useState(false);
  const [digestFrequency, setDigestFrequency] = useState("daily");
  const [autoArchiveFyi, setAutoArchiveFyi] = useState(false);
  const [draftReplies, setDraftReplies] = useState(true);

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
              <Link href="/dashboard">
                <Button variant="ghost">Dashboard</Button>
              </Link>
              <Link href="/api/auth/signout">
                <Button variant="outline">Sign Out</Button>
              </Link>
            </div>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Settings</h1>
          <p className="text-muted-foreground">
            Manage your email triage preferences
          </p>
        </div>

        <div className="space-y-6">
          {/* Gmail Connection */}
          <Card>
            <CardHeader>
              <CardTitle>Gmail Connection</CardTitle>
              <CardDescription>
                Connect your Gmail account to start triaging emails
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      isGmailConnected ? "bg-green-500" : "bg-red-500"
                    }`}
                  />
                  <span>
                    {isGmailConnected ? "Connected" : "Not connected"}
                  </span>
                </div>
                <Button variant={isGmailConnected ? "outline" : "default"}>
                  {isGmailConnected ? "Disconnect" : "Connect Gmail"}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Digest Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Email Digest</CardTitle>
              <CardDescription>
                Configure how often you receive email summaries
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <Label htmlFor="digest-frequency">Digest Frequency</Label>
                <Select value={digestFrequency} onValueChange={setDigestFrequency}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hourly">Hourly</SelectItem>
                    <SelectItem value="twice-daily">Twice Daily</SelectItem>
                    <SelectItem value="daily">Daily</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* AI Features */}
          <Card>
            <CardHeader>
              <CardTitle>AI Features</CardTitle>
              <CardDescription>
                Customize how AI helps manage your inbox
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="auto-archive">Auto-archive FYI emails</Label>
                  <p className="text-sm text-muted-foreground">
                    Automatically archive emails categorized as FYI
                  </p>
                </div>
                <Switch
                  id="auto-archive"
                  checked={autoArchiveFyi}
                  onCheckedChange={setAutoArchiveFyi}
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="draft-replies">Generate draft replies</Label>
                  <p className="text-sm text-muted-foreground">
                    AI will suggest reply drafts for important emails
                  </p>
                </div>
                <Switch
                  id="draft-replies"
                  checked={draftReplies}
                  onCheckedChange={setDraftReplies}
                />
              </div>
            </CardContent>
          </Card>

          {/* Save Button */}
          <div className="flex justify-end">
            <Button>Save Changes</Button>
          </div>
        </div>
      </main>
    </div>
  );
}
