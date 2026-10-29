"use client";

import {
  Activity,
  AlertTriangle,
  Bug,
  Dna,
  Droplets,
  FlaskConical,
  Leaf,
  Lightbulb,
  Microscope,
  ShieldCheck,
  ShieldPlus,
  Stethoscope,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ConfidenceRing } from "@/components/plant-detection/confidence-ring";
import type { AnalysisResult } from "@/lib/types";

interface AnalysisResultViewProps {
  result: AnalysisResult;
  onAnalyzeAnother?: () => void;
  compact?: boolean;
}

const severityStyle = (sev?: string | null) => {
  switch (sev) {
    case "Severe":
      return "bg-destructive/15 text-destructive border-destructive/30";
    case "Moderate":
      return "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30";
    case "Low":
      return "bg-primary/15 text-primary border-primary/30";
    default:
      return "bg-muted text-muted-foreground border-border";
  }
};

const categoryIcon = (cat?: string | null) => {
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

function InfoSection({
  title,
  icon,
  items,
  accent,
}: {
  title: string;
  icon: React.ReactNode;
  items: string[];
  accent?: string;
}) {
  if (!items.length) return null;
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <span className={`flex h-7 w-7 items-center justify-center rounded-lg ${accent ?? "bg-primary/10 text-primary"}`}>
          {icon}
        </span>
        <h4 className="text-sm font-semibold text-foreground">{title}</h4>
      </div>
      <ul className="space-y-1.5 pl-9">
        {items.map((item, i) => (
          <li key={i} className="flex gap-2 text-sm text-muted-foreground">
            <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-primary/50" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function AnalysisResultView({ result, onAnalyzeAnother, compact }: AnalysisResultViewProps) {
  const { disease, isPlant, isHealthy, plantType, description, symptoms, causes, treatment, prevention, imageData } = result;

  // Special case: not a plant
  if (!isPlant) {
    return (
      <Card className="overflow-hidden border-amber-500/30 bg-amber-500/5">
        <CardContent className="p-6">
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-amber-500/15 text-amber-600">
              <AlertTriangle className="h-7 w-7" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">No plant detected</h3>
              <p className="mt-1 max-w-md text-sm text-muted-foreground">
                {description || "The uploaded image does not appear to contain a plant. Please upload a clear photo of a leaf, stem, fruit, or whole plant."}
              </p>
            </div>
            {onAnalyzeAnother && (
              <Button onClick={onAnalyzeAnother} variant="outline">
                Try another image
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={`overflow-hidden border-primary/20 ${compact ? "" : "shadow-sm"}`}>
      <div className="grid gap-0 md:grid-cols-[40%_1fr]">
        {/* Image side */}
        <div className="relative flex items-center justify-center bg-muted/40 p-4 md:p-6">
          <div className="relative">
            <img
              src={imageData}
              alt={`${plantType} - ${disease.name}`}
              className="max-h-72 w-full rounded-xl object-contain md:max-h-80"
            />
            <div className="absolute right-2 top-2">
              <ConfidenceRing value={disease.confidence} size={64} stroke={6} label="conf." />
            </div>
          </div>
        </div>

        {/* Summary side */}
        <div className="space-y-4 p-5 sm:p-6">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline" className="gap-1 rounded-full bg-primary/5 text-primary">
              <Leaf className="h-3 w-3" /> {plantType || "Unknown plant"}
            </Badge>
            {disease.category && (
              <Badge variant="outline" className="gap-1 rounded-full">
                {categoryIcon(disease.category)} {disease.category}
              </Badge>
            )}
            {disease.severity && (
              <Badge variant="outline" className={`gap-1 rounded-full ${severityStyle(disease.severity)}`}>
                <Activity className="h-3 w-3" /> {disease.severity} severity
              </Badge>
            )}
            {isHealthy && (
              <Badge variant="outline" className="gap-1 rounded-full bg-primary/15 text-primary">
                <ShieldCheck className="h-3 w-3" /> Healthy
              </Badge>
            )}
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold tracking-tight">{disease.name}</h2>
            </div>
            {disease.scientificName && disease.scientificName !== "Unknown" && (
              <p className="mt-0.5 text-sm italic text-muted-foreground">{disease.scientificName}</p>
            )}
          </div>

          {description && <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>}

          <div className="flex flex-wrap items-center gap-3 rounded-xl bg-primary/5 p-3">
            <ConfidenceRing value={disease.confidence} size={80} stroke={8} label="confidence" />
            <div className="space-y-1 text-sm">
              <p className="font-medium text-foreground">AI Confidence Level</p>
              <p className="text-muted-foreground">
                {disease.confidence >= 80
                  ? "High confidence — diagnosis is very likely accurate."
                  : disease.confidence >= 55
                  ? "Moderate confidence — consider verifying with a specialist."
                  : "Low confidence — results are uncertain. Try a clearer, closer-up image."}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed sections */}
      <CardContent className="grid gap-6 border-t bg-card/50 p-5 sm:p-6 md:grid-cols-2">
        <InfoSection
          title="Symptoms Observed"
          icon={<Stethoscope className="h-4 w-4" />}
          items={symptoms}
          accent="bg-amber-500/15 text-amber-600 dark:text-amber-400"
        />
        <InfoSection
          title="Likely Causes"
          icon={<Microscope className="h-4 w-4" />}
          items={causes}
          accent="bg-rose-500/15 text-rose-600 dark:text-rose-400"
        />
        <InfoSection
          title="Recommended Treatment"
          icon={<ShieldPlus className="h-4 w-4" />}
          items={treatment}
          accent="bg-primary/15 text-primary"
        />
        <InfoSection
          title="Prevention Tips"
          icon={<Lightbulb className="h-4 w-4" />}
          items={prevention}
          accent="bg-sky-500/15 text-sky-600 dark:text-sky-400"
        />
      </CardContent>

      {!compact && onAnalyzeAnother && (
        <CardContent className="flex justify-center pb-6">
          <Button onClick={onAnalyzeAnother} variant="outline" className="rounded-full">
            <Leaf className="mr-2 h-4 w-4" /> Analyze another plant
          </Button>
        </CardContent>
      )}
    </Card>
  );
}

