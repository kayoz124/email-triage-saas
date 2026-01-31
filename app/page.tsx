import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <h1 className="text-xl font-bold">EmailTriage</h1>
          <Link href="/api/auth/signin/google">
            <Button variant="outline">Sign In</Button>
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-20">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-5xl font-bold tracking-tight mb-6">
            Your AI Email Assistant
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Stop drowning in emails. Let AI categorize, summarize, and draft
            replies so you can focus on what matters.
          </p>
          <Link href="/api/auth/signin/google">
            <Button size="lg" className="text-lg px-8 py-6">
              Start Free Trial
            </Button>
          </Link>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-2xl">📊</span>
                Smart Categorization
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                AI automatically sorts your emails into Urgent, Important, FYI, and
                Spam categories so you know what needs attention first.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-2xl">✍️</span>
                Auto-Drafted Replies
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Get AI-generated reply suggestions that match your tone. Review,
                edit if needed, and send with one click.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-2xl">📬</span>
                Daily Digests
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Get a summary of your inbox delivered when you want it. Stay
                informed without constant interruptions.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-20">
          <h3 className="text-3xl font-bold mb-4">
            Ready to take control of your inbox?
          </h3>
          <p className="text-muted-foreground mb-8">
            Join thousands of professionals who save hours every week.
          </p>
          <Link href="/api/auth/signin/google">
            <Button size="lg" variant="default">
              Get Started Free
            </Button>
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 border-t mt-20">
        <p className="text-center text-muted-foreground">
          &copy; {new Date().getFullYear()} EmailTriage. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
