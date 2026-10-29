import { NextResponse } from "next/server";
import { diseaseLibrary, diseaseCategories } from "@/lib/diseases";

export const runtime = "nodejs";

export async function GET() {
  return NextResponse.json({ items: diseaseLibrary, categories: [...diseaseCategories] });
}
