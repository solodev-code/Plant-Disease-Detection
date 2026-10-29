"use client";

import { useEffect, useState } from "react";
import { History, Inbox, Loader2, RefreshCw, Trash2, Eye, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { AnalysisResultView } from "@/components/plant-detection/analysis-result";
import type { AnalysisResult, HistoryItem } from "@/lib/types";
import { formatDistanceToNow } from "date-fns";

const severityStyle = (sev?: string | null) => {
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

export function HistoryView() {
  const [items, setItems] = useState<HistoryItem[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<AnalysisResult | null>(null);
  const [loadingDetail, setLoadingDetail] = useState(false);

  const fetchHistory = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/analyses");
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Failed to load history");
      setItems(data.items ?? []);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load history");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const openDetail = async (id: string) => {
    setLoadingDetail(true);
    setSelected(null);
    try {
      const res = await fetch(`/api/analyses/${id}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Failed to load analysis");
      setSelected(data as AnalysisResult);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load analysis");
    } finally {
      setLoadingDetail(false);
    }
  };

  const deleteItem = async (id: string) => {
    try {
      const res = await fetch(`/api/analyses/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");
      setItems((prev) => (prev ? prev.filter((i) => i.id !== id) : prev));
      if (selected?.id === id) setSelected(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to delete");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <History className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold">Analysis History</h3>
          {items && <Badge variant="secondary" className="rounded-full">{items.length}</Badge>}
        </div>
        <Button variant="outline" size="sm" onClick={fetchHistory} disabled={loading} className="rounded-full">
          <RefreshCw className={`mr-1.5 h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </div>

      {error && (
        <div className="flex items-start gap-2 rounded-lg border border-destructive/40 bg-destructive/5 p-3 text-sm text-destructive">
          <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {loading && (
        <div className="flex items-center justify-center gap-2 rounded-xl border border-border bg-card p-10 text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" /> Loading history…
        </div>
      )}

      {!loading && items && items.length === 0 && (
        <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border bg-card/50 p-10 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Inbox className="h-6 w-6" />
          </div>
          <div>
            <p className="font-medium text-foreground">No analyses yet</p>
            <p className="text-sm text-muted-foreground">Upload a plant photo on the Analyze tab to start your diagnosis history.</p>
          </div>
        </div>
      )}

      {items && items.length > 0 && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <Card key={item.id} className="group overflow-hidden border-border transition-all hover:border-primary/40 hover:shadow-sm">
              <div className="relative aspect-[4/3] overflow-hidden bg-muted/40">
                <img
                  src={item.imageData}
                  alt={item.diseaseName}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <Badge className="bg-background/85 text-foreground backdrop-blur">{item.plantType}</Badge>
                    {item.isHealthy ? (
                      <Badge className="bg-primary/85 text-primary-foreground backdrop-blur">Healthy</Badge>
                    ) : item.severity ? (
                      <Badge className={`${severityStyle(item.severity)} backdrop-blur`}>{item.severity}</Badge>
                    ) : null}
                    {!item.isPlant && (
                      <Badge className="bg-amber-500/85 text-white backdrop-blur">Not a plant</Badge>
                    )}
                  </div>
                </div>
                <div className="absolute right-2 top-2 rounded-full bg-background/85 px-2 py-0.5 text-xs font-semibold text-primary backdrop-blur">
                  {item.confidence}%
                </div>
              </div>
              <CardContent className="space-y-2 p-3">
                <div>
                  <p className="line-clamp-1 text-sm font-semibold text-foreground">{item.diseaseName}</p>
                  <p className="line-clamp-1 text-xs text-muted-foreground">
                    {item.scientificName && item.scientificName !== "Unknown" ? item.scientificName : item.category ?? "Diagnosis"}
                  </p>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(item.createdAt), { addSuffix: true })}
                  </span>
                  <div className="flex items-center gap-1">
                    <Button size="sm" variant="ghost" className="h-8 gap-1 px-2" onClick={() => openDetail(item.id)}>
                      <Eye className="h-3.5 w-3.5" /> View
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button size="sm" variant="ghost" className="h-8 px-2 text-muted-foreground hover:text-destructive">
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete this analysis?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This will permanently remove the analysis of {item.plantType} ({item.diseaseName}) from your history. This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            onClick={() => deleteItem(item.id)}
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={!!selected || loadingDetail} onOpenChange={(o) => !o && setSelected(null)}>
        <DialogContent className="max-h-[90vh] max-w-3xl overflow-y-auto custom-scroll">
          <DialogHeader>
            <DialogTitle className="sr-only">Analysis detail</DialogTitle>
            <DialogDescription className="sr-only">
              Full AI diagnosis including detected disease, symptoms, causes, treatment, and prevention tips.
            </DialogDescription>
          </DialogHeader>
          {loadingDetail && (
            <div className="flex items-center justify-center gap-2 p-10 text-muted-foreground">
              <Loader2 className="h-5 w-5 animate-spin" /> Loading…
            </div>
          )}
          {selected && <AnalysisResultView result={selected} compact />}
        </DialogContent>
      </Dialog>
    </div>
  );
}
