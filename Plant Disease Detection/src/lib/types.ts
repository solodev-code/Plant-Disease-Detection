export interface DiseaseResult {
  name: string;
  scientificName: string;
  confidence: number;
  severity: "Low" | "Moderate" | "Severe";
  category: string;
}

export interface AnalysisResult {
  id?: string;
  createdAt?: string;
  isPlant: boolean;
  isHealthy: boolean;
  plantType: string;
  disease: DiseaseResult;
  description: string;
  symptoms: string[];
  causes: string[];
  treatment: string[];
  prevention: string[];
  imageData: string;
}

export interface HistoryItem {
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

export interface DiseaseInfo {
  id: string;
  name: string;
  scientificName: string;
  category: string;
  affectedPlants: string[];
  severity: "Low" | "Moderate" | "Severe";
  symptoms: string[];
  causes: string[];
  treatment: string[];
  prevention: string[];
  description: string;
}
