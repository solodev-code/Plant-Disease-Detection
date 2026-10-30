"use client";

import { useRef, useState } from "react";
import { Leaf, Sparkles, History, BookOpen, Microscope, Github, Heart } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ThemeToggle } from "@/components/theme-toggle";
import { PlantUploader } from "@/components/plant-detection/plant-uploader";
import { AnalysisResultView } from "@/components/plant-detection/analysis-result";
import { HistoryView } from "@/components/plant-detection/history-view";
import { DiseaseLibrary } from "@/components/plant-detection/disease-library";
import type { AnalysisResult } from "@/lib/types";

export default function Home() {
  const [tab, setTab] = useState<"analyze" | "history" | "library">("analyze");
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const handleResult = (r: AnalysisResult) => {
    setResult(r);
    // scroll to result after it renders
    requestAnimationFrame(() => {
      resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  return (
    <div className="flex min-h-screen flex-col bg-background bg-leaf-pattern">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
          <a href="/" className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
              <Leaf className="h-5 w-5" />
            </span>
            <div className="leading-tight">
              <p className="text-base font-bold tracking-tight text-foreground">
                PlantDoc <span className="text-primary">AI</span>
              </p>
              <p className="hidden text-[11px] text-muted-foreground sm:block">
                AI-powered plant disease detection
              </p>
            </div>
          </a>
          <div className="flex items-center gap-2">
            <a
              href="https://github.com/solodev-code"
              target="_blank"
              rel="noreferrer"
              className="hidden sm:inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card/60 text-muted-foreground transition-colors hover:text-foreground"
              aria-label="GitHub"
            >
              <Github className="h-4 w-4" />
            </a>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 pb-12 pt-8 sm:px-6 sm:pt-10">
        {/* Hero */}
        <section className="mb-8 text-center sm:mb-10">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            Powered by Vision AI
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-5xl">
            Diagnose plant diseases in seconds
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-muted-foreground sm:text-base">
            Upload a photo of any plant and our AI will identify the species, detect diseases, pests, and
            nutrient issues, and give you actionable treatment and prevention guidance.
          </p>
        </section>

        <Tabs value={tab} onValueChange={(v) => setTab(v as typeof tab)} className="w-full">
          <div className="flex justify-center">
            <TabsList className="rounded-full bg-card p-1 shadow-sm">
              <TabsTrigger value="analyze" className="rounded-full gap-1.5">
                <Sparkles className="h-4 w-4" />
                <span className="hidden sm:inline">Analyze</span>
              </TabsTrigger>
              <TabsTrigger value="history" className="rounded-full gap-1.5">
                <History className="h-4 w-4" />
                <span className="hidden sm:inline">History</span>
              </TabsTrigger>
              <TabsTrigger value="library" className="rounded-full gap-1.5">
                <BookOpen className="h-4 w-4" />
                <span className="hidden sm:inline">Library</span>
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Analyze tab */}
          <TabsContent value="analyze" className="mt-6 space-y-6">
            <div className="mx-auto max-w-2xl">
              <div className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
                <Microscope className="h-4 w-4 text-primary" />
                <span>For best results, photograph the affected area in good light and close up.</span>
              </div>
              <PlantUploader onResult={handleResult} />
            </div>

            {result && (
              <div ref={resultRef} className="mx-auto max-w-4xl scroll-mt-24">
                <AnalysisResultView result={result} onAnalyzeAnother={() => setResult(null)} />
              </div>
            )}

            {!result && (
              <div className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-3">
                <FeatureCard
                  icon={<Microscope className="h-5 w-5" />}
                  title="Accurate detection"
                  desc="Identify fungal, bacterial, viral infections, pests, and nutrient deficiencies."
                />
                <FeatureCard
                  icon={<History className="h-5 w-5" />}
                  title="Save your history"
                  desc="Every analysis is stored so you can track plant health over time."
                />
                <FeatureCard
                  icon={<BookOpen className="h-5 w-5" />}
                  title="Learn & prevent"
                  desc="Browse a curated library of common diseases and how to prevent them."
                />
              </div>
            )}
          </TabsContent>

          {/* History tab */}
          <TabsContent value="history" className="mt-6">
            <HistoryView />
          </TabsContent>

          {/* Library tab */}
          <TabsContent value="library" className="mt-6">
            <DiseaseLibrary />
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-border bg-card/50">
        <div className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6">
          <div className="flex flex-col items-center justify-between gap-3 text-sm text-muted-foreground sm:flex-row">
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Leaf className="h-4 w-4" />
              </span>
              <span>PlantDoc AI — keep your plants thriving.</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span>Built with</span>
              <Heart className="h-3.5 w-3.5 fill-primary text-primary" />
              <span>using Vision AI</span>
            </div>
          </div>
          <p className="mt-3 text-center text-xs text-muted-foreground/80 sm:text-left">
            AI diagnoses are estimates and not a substitute for professional agronomic advice.
          </p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-4 transition-colors hover:border-primary/30">
      <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
        {icon}
      </div>
      <h3 className="text-sm font-semibold text-foreground">{title}</h3>
      <p className="mt-1 text-xs text-muted-foreground">{desc}</p>
    </div>
  );
}
