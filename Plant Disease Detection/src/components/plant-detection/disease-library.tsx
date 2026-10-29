"use client";

import { useEffect, useMemo, useState } from "react";
import {
  BookOpen,
  Bug,
  ChevronDown,
  Dna,
  Droplets,
  FlaskConical,
  Leaf,
  Loader2,
  Microscope,
  Search,
  ShieldPlus,
  ShieldCheck,
  Stethoscope,
  Lightbulb,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import type { DiseaseInfo } from "@/lib/types";

const categoryIcon = (cat: string) => {
  switch (cat) {
    case "Fungal":
      return <FlaskConical className="h-3.5 w-3.5" />;
    case "Bacterial":
      return <Microscope className="h-3.5 w-3.5" />;
    case "Viral":
      return <Dna className="h-3.5 w-3.5" />;
    case "Pest":
      return <Bug className="h-3.5 w-3.5" />;
    case "Nutrient":
      return <Droplets className="h-3.5 w-3.5" />;
    default:
      return <Leaf className="h-3.5 w-3.5" />;
  }
};

const categoryColor = (cat: string) => {
  switch (cat) {
    case "Fungal":
      return "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20";
    case "Bacterial":
      return "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20";
    case "Viral":
      return "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20";
    case "Pest":
      return "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20";
    case "Nutrient":
      return "bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20";
    default:
      return "bg-primary/10 text-primary border-primary/20";
  }
};

const severityStyle = (sev?: string) => {
  switch (sev) {
    case "Severe":
      return "bg-destructive/15 text-destructive";
    case "Moderate":
      return "bg-amber-500/15 text-amber-600 dark:text-amber-400";
    case "Low":
      return "bg-primary/15 text-primary";
    default:
      return "bg-muted text-muted-foreground";
  }
};

function DiseaseCard({ disease }: { disease: DiseaseInfo }) {
  return (
    <Collapsible className="overflow-hidden rounded-2xl border border-border bg-card transition-all hover:border-primary/40 hover:shadow-sm">
      <CollapsibleTrigger asChild>
        <button className="flex w-full items-start gap-3 p-4 text-left">
          <div className={`mt-0.5 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl border ${categoryColor(disease.category)}`}>
            {categoryIcon(disease.category)}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-1.5">
              <h3 className="text-base font-semibold text-foreground">{disease.name}</h3>
              {disease.severity && (
                <span className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${severityStyle(disease.severity)}`}>
                  {disease.severity}
                </span>
              )}
            </div>
            <p className="mt-0.5 line-clamp-1 text-xs italic text-muted-foreground">{disease.scientificName}</p>
            <div className="mt-2 flex flex-wrap gap-1">
              {disease.affectedPlants.slice(0, 3).map((p) => (
                <span key={p} className="rounded-full bg-accent px-2 py-0.5 text-[11px] text-accent-foreground">
                  {p}
                </span>
              ))}
              {disease.affectedPlants.length > 3 && (
                <span className="rounded-full bg-accent px-2 py-0.5 text-[11px] text-muted-foreground">
                  +{disease.affectedPlants.length - 3}
                </span>
              )}
            </div>
          </div>
          <ChevronDown className="mt-1 h-5 w-5 flex-shrink-0 text-muted-foreground transition-transform [[data-state=open]>&]:rotate-180" />
        </button>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="space-y-4 border-t border-border bg-muted/30 p-4">
          <p className="text-sm leading-relaxed text-muted-foreground">{disease.description}</p>
          <div className="grid gap-4 sm:grid-cols-2">
            <InfoList title="Symptoms" icon={<Stethoscope className="h-4 w-4" />} items={disease.symptoms} accent="bg-amber-500/15 text-amber-600 dark:text-amber-400" />
            <InfoList title="Causes" icon={<Microscope className="h-4 w-4" />} items={disease.causes} accent="bg-rose-500/15 text-rose-600 dark:text-rose-400" />
            <InfoList title="Treatment" icon={<ShieldPlus className="h-4 w-4" />} items={disease.treatment} accent="bg-primary/15 text-primary" />
            <InfoList title="Prevention" icon={<Lightbulb className="h-4 w-4" />} items={disease.prevention} accent="bg-sky-500/15 text-sky-600 dark:text-sky-400" />
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}

function InfoList({
  title,
  icon,
  items,
  accent,
}: {
  title: string;
  icon: React.ReactNode;
  items: string[];
  accent: string;
}) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center gap-2">
        <span className={`flex h-6 w-6 items-center justify-center rounded-md ${accent}`}>{icon}</span>
        <h4 className="text-xs font-semibold uppercase tracking-wide text-foreground">{title}</h4>
      </div>
      <ul className="space-y-1 pl-8">
        {items.map((item, i) => (
          <li key={i} className="flex gap-2 text-xs text-muted-foreground">
            <span className="mt-1.5 h-0.5 w-0.5 flex-shrink-0 rounded-full bg-muted-foreground" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function DiseaseLibrary() {
  const [diseases, setDiseases] = useState<DiseaseInfo[] | null>(null);
  const [categories, setCategories] = useState<string[]>(["All"]);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/diseases");
        const data = await res.json();
        setDiseases(data.items ?? []);
        setCategories(data.categories ?? ["All"]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const filtered = useMemo(() => {
    if (!diseases) return [];
    const q = query.trim().toLowerCase();
    return diseases.filter((d) => {
      const matchesCat = activeCategory === "All" || d.category === activeCategory;
      const matchesQuery =
        !q ||
        d.name.toLowerCase().includes(q) ||
        d.scientificName.toLowerCase().includes(q) ||
        d.affectedPlants.some((p) => p.toLowerCase().includes(q)) ||
        d.description.toLowerCase().includes(q);
      return matchesCat && matchesQuery;
    });
  }, [diseases, activeCategory, query]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold">Disease Library</h3>
          {diseases && <Badge variant="secondary" className="rounded-full">{filtered.length}</Badge>}
        </div>
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search diseases or plants…"
            className="rounded-full pl-9"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <Button
            key={cat}
            variant={activeCategory === cat ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveCategory(cat)}
            className="gap-1.5 rounded-full"
          >
            {cat !== "All" && categoryIcon(cat)}
            {cat}
          </Button>
        ))}
      </div>

      {loading && (
        <div className="flex items-center justify-center gap-2 rounded-xl border border-border bg-card p-10 text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" /> Loading library…
        </div>
      )}

      {!loading && filtered.length === 0 && (
        <div className="flex flex-col items-center gap-2 rounded-xl border border-dashed border-border bg-card/50 p-10 text-center text-muted-foreground">
          <ShieldCheck className="h-8 w-8 text-primary/50" />
          <p>No diseases match your search. Try a different term or category.</p>
        </div>
      )}

      {filtered.length > 0 && (
        <div className="grid gap-3 sm:grid-cols-2">
          {filtered.map((d) => (
            <DiseaseCard key={d.id} disease={d} />
          ))}
        </div>
      )}
    </div>
  );
}
