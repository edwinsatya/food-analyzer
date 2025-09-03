import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Beef, Droplet, Flame, Utensils, Wheat } from "lucide-react";
import { FunctionComponent } from "react";

interface NutritionResultProps {
  food?: string;
  estimatedCalories?: number;
  macros?: {
    carbs?: string;
    fat?: string;
    protein?: string;
    fiber?: string;
    sugar?: string;
  };
  micros?: {
    sodium?: string;
    cholesterol?: string;
    vitamin_a?: string;
    vitamin_c?: string;
    calcium?: string;
    iron?: string;
  };
  [key: string]: unknown;
}

export const NutritionResult: FunctionComponent<NutritionResultProps> = ({
  food,
  estimatedCalories,
  macros,
  micros,
}) => {
  return (
    <Card className="mt-6 shadow-md rounded-2xl border border-gray-200">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-green-700">
          <Utensils className="w-5 h-5 text-green-600" />
          Nutrition Analysis
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 text-sm text-gray-700">
          {food && (
            <p className="text-base">
              <span className="font-semibold">Food:</span> {food}
            </p>
          )}
          {estimatedCalories && (
            <div className="flex items-center gap-2 text-orange-600 font-medium">
              <Flame className="w-4 h-4" />
              {estimatedCalories} kcal
            </div>
          )}

          {macros && (
            <div className="grid grid-cols-2 gap-4 mt-2">
              {macros.carbs && (
                <div className="flex items-center gap-2">
                  <Wheat className="w-4 h-4 text-yellow-600" />
                  <span>Carbs: {macros.carbs}</span>
                </div>
              )}
              {macros.protein && (
                <div className="flex items-center gap-2">
                  <Beef className="w-4 h-4 text-red-600" />
                  <span>Protein: {macros.protein}</span>
                </div>
              )}
              {macros.fat && (
                <div className="flex items-center gap-2">
                  <Droplet className="w-4 h-4 text-pink-600" />
                  <span>Fat: {macros.fat}</span>
                </div>
              )}
              {macros.fiber && (
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-green-600">🌿</span>
                  <span>Fiber: {macros.fiber}</span>
                </div>
              )}
              {macros.sugar && (
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-purple-600">🍭</span>
                  <span>Sugar: {macros.sugar}</span>
                </div>
              )}
            </div>
          )}

          {micros && (
            <div className="mt-4">
              <h3 className="font-semibold text-gray-800 mb-2">Micronutrients</h3>
              <ul className="grid grid-cols-2 gap-2 text-gray-600 text-sm">
                {micros.sodium && (
                  <li>Sodium: {micros.sodium}</li>
                )}
                {micros.cholesterol && (
                  <li>Cholesterol: {micros.cholesterol}</li>
                )}
                {micros.vitamin_a && (
                  <li>Vitamin A: {micros.vitamin_a}</li>
                )}
                {micros.vitamin_c && (
                  <li>Vitamin C: {micros.vitamin_c}</li>
                )}
                {micros.calcium && (
                  <li>Calcium: {micros.calcium}</li>
                )}
                {micros.iron && <li>Iron: {micros.iron}</li>}
              </ul>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
