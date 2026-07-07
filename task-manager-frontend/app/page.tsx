import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Shield, Layers, ArrowRight } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-muted/30">
      <nav className="flex items-center justify-between px-6 sm:px-10 py-5 border-b bg-background/80 backdrop-blur-sm sticky top-0 z-10">
        <span className="font-semibold text-lg tracking-tight">
          Task<span className="text-primary">Manager</span>
        </span>
        <Link href="/login">
          <Button variant="outline" size="sm">
            Log in
          </Button>
        </Link>
      </nav>

      <main className="flex-1 flex flex-col items-center px-6 py-24 sm:py-32">
        <div className="inline-flex items-center gap-2 text-xs font-medium text-muted-foreground border rounded-full px-3 py-1 mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
          Live full-stack demo
        </div>

        <h1 className="text-4xl sm:text-6xl font-semibold tracking-tight max-w-2xl text-center leading-[1.1]">
          Organize your tasks.
          <br />
          <span className="text-muted-foreground">Securely. Simply.</span>
        </h1>
        <p className="text-muted-foreground mt-6 max-w-lg text-center text-base sm:text-lg">
          A full-stack task manager with real authentication, categories, and
          strict per-user data isolation — built with FastAPI, Next.js, and
          Supabase.
        </p>
        <Link href="/login" className="mt-10">
          <Button size="lg" className="gap-2">
            Get Started
            <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>

        <div className="grid sm:grid-cols-3 gap-6 mt-28 max-w-4xl w-full">
          <div className="flex flex-col gap-3 p-6 rounded-xl border bg-background">
            <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
              <Shield className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="font-medium">Secure by default</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              JWT authentication and Row Level Security ensure your data is
              only ever visible to you.
            </p>
          </div>
          <div className="flex flex-col gap-3 p-6 rounded-xl border bg-background">
            <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
              <Layers className="w-5 h-5 text-purple-600" />
            </div>
            <h3 className="font-medium">Organized by category</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Group tasks into categories to keep work and personal life
              separate.
            </p>
          </div>
          <div className="flex flex-col gap-3 p-6 rounded-xl border bg-background">
            <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
            </div>
            <h3 className="font-medium">Simple, fast CRUD</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Create, update, filter, and complete tasks with a clean,
              responsive interface.
            </p>
          </div>
        </div>
      </main>

      <footer className="text-center text-xs text-muted-foreground py-8 border-t">
        Built by Sufiyan Khan — FastAPI · Next.js · Supabase ·{" "}
        <a
          href="https://github.com/SufyTech/task-manager-fullstack"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-foreground"
        >
          View source
        </a>
      </footer>
    </div>
  );
}