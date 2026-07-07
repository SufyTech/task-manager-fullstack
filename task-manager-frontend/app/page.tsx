import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Shield, Layers } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <nav className="flex items-center justify-between px-6 py-5 border-b">
        <span className="font-semibold text-lg">Task Manager</span>
        <Link href="/login">
          <Button variant="outline" size="sm">
            Log in
          </Button>
        </Link>
      </nav>

      <main className="flex-1 flex flex-col items-center justify-center text-center px-6 py-20">
        <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight max-w-2xl">
          Organize your tasks. Securely. Simply.
        </h1>
        <p className="text-muted-foreground mt-4 max-w-md">
          A full-stack task manager with real authentication, categories, and
          per-user data isolation — built with FastAPI, Next.js, and Supabase.
        </p>
        <Link href="/login" className="mt-8">
          <Button size="lg">Get Started</Button>
        </Link>

        <div className="grid sm:grid-cols-3 gap-8 mt-20 max-w-3xl text-left">
          <div className="flex flex-col gap-2">
            <Shield className="w-5 h-5 text-muted-foreground" />
            <h3 className="font-medium">Secure by default</h3>
            <p className="text-sm text-muted-foreground">
              JWT authentication and Row Level Security ensure your data is only
              ever visible to you.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <Layers className="w-5 h-5 text-muted-foreground" />
            <h3 className="font-medium">Organized by category</h3>
            <p className="text-sm text-muted-foreground">
              Group tasks into categories to keep work and personal life
              separate.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <CheckCircle2 className="w-5 h-5 text-muted-foreground" />
            <h3 className="font-medium">Simple, fast CRUD</h3>
            <p className="text-sm text-muted-foreground">
              Create, update, filter, and complete tasks with a clean,
              responsive interface.
            </p>
          </div>
        </div>
      </main>

      <footer className="text-center text-xs text-muted-foreground py-6 border-t">
        Built by Sufiyan Khan — FastAPI · Next.js · Supabase
      </footer>
    </div>
  );
}
