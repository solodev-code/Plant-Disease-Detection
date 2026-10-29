import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export const runtime = "nodejs";

export interface AnalysisListItem {
  id: string;
  plantType: string;
  diseaseName: string;
  scientificName: string | null;
  confidence: number;
  severity: string | null;
  category: string | null;
  isPlant: boolean;
  isHealthy: boolean;
  description: string | null;
  imageData: string;
  createdAt: string;
}

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const limit = Math.min(Number(url.searchParams.get("limit") ?? "50"), 100);

    const rows = await db.analysis.findMany({
      orderBy: { createdAt: "desc" },
      take: limit,
    });

    const items: AnalysisListItem[] = rows.map((r) => ({
      id: r.id,
      plantType: r.plantType,
      diseaseName: r.diseaseName,
      scientificName: r.scientificName,
      confidence: r.confidence,
      severity: r.severity,
      category: r.category,
      isPlant: r.isPlant,
      isHealthy: r.isHealthy,
      description: r.description,
      imageData: r.imageData,
      createdAt: r.createdAt.toISOString(),
    }));

    return NextResponse.json({ items, total: items.length });
  } catch (error) {
    console.error("[/api/analyses] error:", error);
    return NextResponse.json({ error: "Failed to fetch analyses." }, { status: 500 });
  }
}
