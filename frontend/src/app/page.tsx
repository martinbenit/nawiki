import { ScientificHubBoard } from "@/components/ScientificHubBoard";
import { PeerReviewPanel } from "@/components/PeerReviewPanel";
import { CRUDModals } from "@/components/CRUDModals";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { BookOpen } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-background flex flex-col font-sans">
      <header className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl tracking-tight text-primary">
            <BookOpen className="h-6 w-6" />
            <span>NAWIKI</span>
          </div>
          
          <div className="flex items-center gap-4">
            <CRUDModals />
            <ThemeSwitcher />
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8 space-y-12">
        
        <section>
          <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight mb-2">Scientific Hub</h1>
              <p className="text-muted-foreground">Vetted knowledge repositories with Rackoot-style interactive cards.</p>
            </div>
          </div>
          <ScientificHubBoard />
        </section>

        <section className="pt-8 border-t border-border">
          <div className="mb-6">
            <h2 className="text-2xl font-bold tracking-tight mb-2">Peer Review Panel</h2>
            <p className="text-muted-foreground">Interactive split-screen for document review and real-time feedback.</p>
          </div>
          <PeerReviewPanel />
        </section>

      </main>
      
      <footer className="border-t border-border py-6 mt-auto">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} NAWIKI Platform. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
