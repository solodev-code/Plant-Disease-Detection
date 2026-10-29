import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export const runtime = "nodejs";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const row = await db.analysis.findUnique({ where: { id } });

    if (!row) {
      return NextResponse.json({ error: "Analysis not found." }, { status: 404 });
    }

    const parseArray = (s: string): string[] => {
      try {
        const parsed = JSON.parse(s);
        return Array.isArray(parsed) ? parsed.map(String) : [];
      } catch {
        return [];
      }
    };

    return NextResponse.json({
      id: row.id,
      createdAt: row.createdAt.toISOString(),
      isPlant: row.isPlant,
      isHealthy: row.isHealthy,
      plantType: row.plantType,
      disease: {
        name: row.diseaseName,
        scientificName: row.scientificName,
        confidence: row.confidence,
        severity: row.severity,
        category: row.category,
      },
      description: row.description,
      symptoms: parseArray(row.symptoms),
      causes: parseArray(row.causes),
      treatment: parseArray(row.treatment),
      prevention: parseArray(row.prevention),
      imageData: row.imageData,
    });
  } catch (error) {
    console.error("[/api/analyses/[id] GET] error:", error);
    return NextResponse.json({ error: "Failed to fetch analysis." }, { status: 500 });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const existing = await db.analysis.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Analysis not found." }, { status: 404 });
    }
    await db.analysis.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[/api/analyses/[id] DELETE] error:", error);
    return NextResponse.json({ error: "Failed to delete analysis." }, { status: 500 });
  }
}
