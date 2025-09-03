"use client";

import { Utensils } from "lucide-react";
import { useState } from "react";
import { ErrorResult } from "./components/ErrorResult";
import { NutritionResult } from "./components/NutritionResult";
import UploadFile from "./components/UploadFile";

interface NutritionResult {
  food?: string;
  estimated_calories?: number;
  macros?: {
    carbs?: string;
    fat?: string;
    protein?: string;
  };
  [key: string]: unknown;
}

export default function Home() {
  const [result, setResult] = useState<NutritionResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 flex items-center justify-center px-6">
      <div className="max-w-lg w-full bg-white shadow-2xl rounded-2xl p-8 space-y-6 border border-gray-100">
        <h1 className="text-2xl font-bold text-center text-green-700 flex items-center justify-center gap-2">
          <Utensils className="w-6 h-6" />
          Food Nutrition Analyzer
        </h1>

        {/* Upload Input */}
        <UploadFile setResult={setResult} setError={setError} />

        {/* Error */}
        {error && (
          <ErrorResult text={error} />
        )}

        {/* Results */}
        {result && (
          <NutritionResult food={result.food} estimatedCalories={result.estimated_calories} macros={result.macros} />
        )}
      </div>
    </div>
  );
}