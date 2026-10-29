import ZAI from "z-ai-web-dev-sdk";

export interface DiseaseAnalysis {
  isPlant: boolean;
  plantType: string;
  isHealthy: boolean;
  disease: {
    name: string;
    scientificName: string;
    confidence: number;
    severity: "Low" | "Moderate" | "Severe";
    category: string;
  };
  description: string;
  symptoms: string[];
  causes: string[];
  treatment: string[];
  prevention: string[];
}

const ANALYSIS_PROMPT = `You are an expert plant pathologist and agronomist. Analyze the provided image of a plant and detect any disease, pest, nutrient deficiency, or health issues.

Respond ONLY with a valid JSON object (no markdown, no code fences, no extra text) using exactly this schema:

{
  "isPlant": boolean,
  "plantType": string,
  "isHealthy": boolean,
  "disease": {
    "name": string,
    "scientificName": string,
    "confidence": number (0-100),
    "severity": "Low" | "Moderate" | "Severe",
    "category": "Fungal" | "Bacterial" | "Viral" | "Pest" | "Nutrient" | "Environmental"
  },
  "description": string,
  "symptoms": string[],
  "causes": string[],
  "treatment": string[],
  "prevention": string[]
}

Guidelines:
- If the image does NOT contain a plant or plant part (leaf, stem, fruit, whole plant), set "isPlant": false, "plantType": "Unknown", "isHealthy": false, "disease.name": "Not a Plant Image", "confidence": 95, and leave arrays empty with a short explanation in "description".
- If the plant looks healthy with no visible disease, set "isHealthy": true, "disease.name": "Healthy Plant", "disease.scientificName": "No disease detected", "confidence" based on your certainty, "severity": "Low", "category": "Environmental".
- "plantType" should be the common plant name (e.g., "Tomato", "Rose", "Pepper", "Apple Tree").
- Be specific with disease names using common terminology (e.g., "Early Blight", "Powdery Mildew", "Bacterial Spot"). Provide the scientific name / pathogen when known, otherwise use "Unknown".
- "confidence" is your confidence percentage (0-100) in the diagnosis.
- Provide 3-6 concrete items in each of symptoms, causes, treatment, and prevention arrays.
- "description" should be 1-3 sentences describing the plant's condition and your diagnosis reasoning.
- Return ONLY raw JSON. Do not wrap in markdown code fences.`;

function extractJSON(text: string): string {
  // Strip markdown code fences if present
  let cleaned = text.trim();
  if (cleaned.startsWith("```")) {
    cleaned = cleaned.replace(/^```(?:json)?\s*/i, "").replace(/```\s*$/i, "").trim();
  }
  return cleaned;
}

export async function analyzePlantImage(imageDataUrl: string): Promise<DiseaseAnalysis> {
  const zai = await ZAI.create();

  const response = await zai.chat.completions.createVision({
    messages: [
      {
        role: "user",
        content: [
          { type: "text", text: ANALYSIS_PROMPT },
          { type: "image_url", image_url: { url: imageDataUrl } },
        ],
      },
    ],
    thinking: { type: "disabled" },
  });

  const content = response.choices[0]?.message?.content ?? "";

  let parsed: DiseaseAnalysis;
  try {
    parsed = JSON.parse(extractJSON(content));
  } catch {
    // Try to locate the first { ... } block as a fallback
    const match = content.match(/\{[\s\S]*\}/);
    if (!match) {
      throw new Error("Failed to parse analysis response from the model.");
    }
    parsed = JSON.parse(match[0]);
  }

  // Normalize / provide safe defaults
  return normalizeAnalysis(parsed);
}

function normalizeAnalysis(raw: Partial<DiseaseAnalysis> & Record<string, unknown>): DiseaseAnalysis {
  const disease = (raw.disease ?? {}) as Partial<DiseaseAnalysis["disease"]>;
  const asArray = (val: unknown): string[] => {
    if (Array.isArray(val)) return val.map((v) => String(v)).filter(Boolean);
    if (typeof val === "string" && val.trim()) return [val];
    return [];
  };
  const severity = ["Low", "Moderate", "Severe"].includes(disease.severity as string)
    ? (disease.severity as "Low" | "Moderate" | "Severe")
    : "Low";

  return {
    isPlant: Boolean(raw.isPlant ?? true),
    plantType: String(raw.plantType ?? "Unknown"),
    isHealthy: Boolean(raw.isHealthy ?? false),
    disease: {
      name: String(disease.name ?? "Unknown"),
      scientificName: String(disease.scientificName ?? "Unknown"),
      confidence: Math.min(100, Math.max(0, Number(disease.confidence ?? 0))),
      severity,
      category: String(disease.category ?? "Environmental"),
    },
    description: String(raw.description ?? ""),
    symptoms: asArray(raw.symptoms),
    causes: asArray(raw.causes),
    treatment: asArray(raw.treatment),
    prevention: asArray(raw.prevention),
  };
}
