"use client";

import { useCallback, useRef, useState } from "react";
import { Upload, ImageIcon, Sparkles, X, AlertCircle, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import type { AnalysisResult } from "@/lib/types";

interface PlantUploaderProps {
  onResult: (result: AnalysisResult) => void;
}

type Stage = "idle" | "ready" | "analyzing" | "error";

export function PlantUploader({ onResult }: PlantUploaderProps) {
  const [stage, setStage] = useState<Stage>("idle");
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const progressTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  const reset = useCallback(() => {
    setStage("idle");
    setPreview(null);
    setFile(null);
    setError(null);
    setProgress(0);
    if (inputRef.current) inputRef.current.value = "";
  }, []);

  const handleFile = useCallback((f: File) => {
    setError(null);
    if (!f.type.startsWith("image/")) {
      setError("Please select an image file (JPEG, PNG, WebP, etc.).");
      return;
    }
    if (f.size > 5 * 1024 * 1024) {
      setError("Image is too large. Maximum size is 5MB.");
      return;
    }
    const url = URL.createObjectURL(f);
    setPreview(url);
    setFile(f);
    setStage("ready");
  }, []);

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragActive(false);
      const f = e.dataTransfer.files?.[0];
      if (f) handleFile(f);
    },
    [handleFile]
  );

  const startAnalysis = useCallback(async () => {
    if (!file) return;
    setStage("analyzing");
    setProgress(0);
    setError(null);

    // Simulated progress while the model works (real progress comes back when complete)
    progressTimer.current = setInterval(() => {
      setProgress((p) => (p < 90 ? p + Math.random() * 7 : p));
    }, 500);

    try {
      const formData = new FormData();
      formData.append("image", file);

      const res = await fetch("/api/analyze", { method: "POST", body: formData });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || `Request failed (${res.status})`);
      }
      if (progressTimer.current) clearInterval(progressTimer.current);
      setProgress(100);
      // small delay to let progress bar fill visually
      setTimeout(() => {
        onResult(data as AnalysisResult);
        setStage("idle");
        setPreview(null);
        setFile(null);
        setProgress(0);
        if (inputRef.current) inputRef.current.value = "";
      }, 250);
    } catch (e) {
      if (progressTimer.current) clearInterval(progressTimer.current);
      setStage("error");
      setProgress(0);
      setError(e instanceof Error ? e.message : "Failed to analyze image.");
    }
  }, [file, onResult]);

  return (
    <div className="w-full">
      {stage !== "analyzing" && (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragActive(true);
          }}
          onDragLeave={() => setDragActive(false)}
          onDrop={onDrop}
          onClick={() => !preview && inputRef.current?.click()}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if ((e.key === "Enter" || e.key === " ") && !preview) inputRef.current?.click();
          }}
          className={`relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed p-6 sm:p-10 text-center transition-all cursor-pointer ${
            dragActive
              ? "border-primary bg-primary/5 scale-[1.01]"
              : "border-border hover:border-primary/60 hover:bg-accent/40"
          } ${preview ? "cursor-default" : ""}`}
        >
          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif,image/bmp"
            className="sr-only"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) handleFile(f);
            }}
          />

          {!preview ? (
            <div className="flex flex-col items-center gap-3 py-4">
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-primary/15 animate-pulse-ring" />
                <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Upload className="h-7 w-7" />
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-base font-semibold text-foreground">
                  Drag &amp; drop a plant photo here
                </p>
                <p className="text-sm text-muted-foreground">
                  or <span className="text-primary font-medium underline-offset-2 hover:underline">browse files</span> · JPEG, PNG, WebP up to 5MB
                </p>
              </div>
              <div className="mt-2 flex flex-wrap items-center justify-center gap-2 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1 rounded-full bg-accent px-2.5 py-1">
                  <Leaf className="h-3 w-3 text-primary" /> Leaves
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-accent px-2.5 py-1">
                  <ImageIcon className="h-3 w-3 text-primary" /> Stems &amp; fruit
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-accent px-2.5 py-1">
                  <Sparkles className="h-3 w-3 text-primary" /> Whole plants
                </span>
              </div>
            </div>
          ) : (
            <div className="w-full">
              <div className="relative mx-auto max-w-md overflow-hidden rounded-xl border border-border bg-card">
                <img src={preview} alt="Plant preview" className="max-h-72 w-full object-contain bg-black/5" />
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    reset();
                  }}
                  className="absolute right-2 top-2 rounded-full bg-background/80 p-1.5 text-foreground shadow backdrop-blur transition hover:bg-background"
                  aria-label="Remove image"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="mt-4 flex flex-col items-center gap-3">
                <p className="text-sm text-muted-foreground">
                  {file?.name} · {file ? (file.size / 1024).toFixed(0) : 0} KB
                </p>
                <div className="flex flex-wrap items-center justify-center gap-2">
                  <Button onClick={startAnalysis} size="lg" className="rounded-full">
                    <Sparkles className="mr-2 h-4 w-4" />
                    Analyze with AI
                  </Button>
                  <Button onClick={reset} variant="outline" size="lg" className="rounded-full">
                    Choose another
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {stage === "analyzing" && (
        <div className="rounded-2xl border border-border bg-card p-6 sm:p-10">
          <div className="relative mx-auto max-w-md overflow-hidden rounded-xl">
            {preview && (
              <img src={preview} alt="Analyzing plant" className="max-h-80 w-full object-contain bg-black/5" />
            )}
            {/* scanning line overlay */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              <div className="absolute inset-x-0 h-16 bg-gradient-to-b from-primary/0 via-primary/40 to-primary/0 animate-scan-line" />
            </div>
            <div className="absolute left-3 top-3 flex items-center gap-2 rounded-full bg-background/85 px-3 py-1 text-xs font-medium text-primary backdrop-blur">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              AI analyzing…
            </div>
          </div>
          <div className="mx-auto mt-5 max-w-md space-y-2">
            <Progress value={progress} className="h-2" />
            <p className="text-center text-xs text-muted-foreground">
              Identifying plant, detecting symptoms, and preparing a diagnosis…
            </p>
          </div>
        </div>
      )}

      {stage === "error" && (
        <div className="rounded-2xl border border-destructive/40 bg-destructive/5 p-4 sm:p-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-destructive" />
            <div className="space-y-2">
              <p className="font-medium text-destructive">Analysis failed</p>
              <p className="text-sm text-muted-foreground">{error}</p>
            </div>
          </div>
          <div className="mt-4 flex gap-2">
            <Button onClick={() => setStage("ready")} variant="outline" size="sm">
              Retry
            </Button>
            <Button onClick={reset} variant="ghost" size="sm">
              Start over
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
