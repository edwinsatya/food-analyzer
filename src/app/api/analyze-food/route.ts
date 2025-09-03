import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { imageUrl }: { imageUrl: string } = await req.json();
    if (!imageUrl) {
      return NextResponse.json({ error: "Image URL required" }, { status: 400 });
    }
    
    const response = await fetch(`${process.env.OPENROUTER_BASE_URL}/chat/completions`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "deepseek/deepseek-chat-v3.1:free",
        messages: [
          {
            role: "system",
            content:
              "You are a helpful assistant that analyzes food images and provides detailed nutritional information. " +
              "Always respond ONLY in valid JSON object format with no extra text. " +
              "Example: { food: string, estimated_calories: number, macros: { carbs: string, fat: string, protein: string, fiber: string, sugar: string }, micronutrients: { sodium: string, cholesterol: string, vitamin_a: string, vitamin_c: string, calcium: string, iron: string } }",
          },
          {
            role: "user",
            content: `Analyze this food image and provide the estimated calories, macronutrient breakdown (carbs, fat, protein, fiber, sugar) and micronutrients (sodium, cholesterol, vitamin_a, vitamin_c, calcium, iron): ${imageUrl}`,
          },
        ]
      }),
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Food analysis failed" }, { status: 500 });
  }
}