import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { analyzePlantImage } from "@/lib/vlm";
import { processImage, ACCEPTED_CONTENT_TYPES } from "@/lib/image";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("image");

    if (!file || !(file instanceof File)) {
      return NextResponse.json(
        { error: "No image provided. Please upload a plant image." },
        { status: 400 }
      );
    }

    if (!ACCEPTED_CONTENT_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: `Unsupported file type: ${file.type || "unknown"}. Please upload a JPEG, PNG, WebP, GIF, or BMP image.` },
        { status: 400 }
      );
    }

    // 5MB max upload
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: "Image too large. Maximum size is 5MB." },
        { status: 400 }
      );
    }

    const rawBuffer = Buffer.from(await file.arrayBuffer());

    // Resize + compress to JPEG data URL for both DB storage and VLM analysis
    let imageDataUrl: string;
    try {
      imageDataUrl = await processImage(rawBuffer, file.type);
    } catch {
      return NextResponse.json(
        { error: "Could not process the uploaded image. Please try a different file." },
        { status: 400 }
      );
    }

    // Run AI analysis (this may take several seconds)
    const analysis = await analyzePlantImage(imageDataUrl);

    // Persist the result so it appears in history
    const saved = await db.analysis.create({
      data: {
        plantType: analysis.plantType,
        diseaseName: analysis.disease.name,
        scientificName: analysis.disease.scientificName,
        confidence: analysis.disease.confidence,
        severity: analysis.disease.severity,
        category: analysis.disease.category,
        isPlant: analysis.isPlant,
        isHealthy: analysis.isHealthy,
        symptoms: JSON.stringify(analysis.symptoms),
        causes: JSON.stringify(analysis.causes),
        treatment: JSON.stringify(analysis.treatment),
        prevention: JSON.stringify(analysis.prevention),
        description: analysis.description,
        imageData: imageDataUrl,
      },
    });

    return NextResponse.json({
      id: saved.id,
      createdAt: saved.createdAt,
      ...analysis,
    });
  } catch (error) {
    console.error("[/api/analyze] error:", error);
    const message = error instanceof Error ? error.message : "Failed to analyze the image.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
