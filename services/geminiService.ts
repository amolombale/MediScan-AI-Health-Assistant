
import { GoogleGenAI, Type } from "@google/genai";
import { DiagnosisResult } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

const DIAGNOSIS_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    summary: {
      type: Type.STRING,
      description: "A concise summary of the overall findings.",
    },
    possibleConditions: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING },
          likelihood: { 
            type: Type.STRING,
            description: "Must be 'High', 'Moderate', or 'Low'"
          },
          reasoning: { type: Type.STRING },
        },
        required: ["name", "likelihood", "reasoning"],
      },
      description: "List of possible conditions based on symptoms and scan.",
    },
    treatmentPlan: {
      type: Type.OBJECT,
      properties: {
        immediateSteps: { 
          type: Type.ARRAY, 
          items: { type: Type.STRING } 
        },
        longTermAdvice: { 
          type: Type.ARRAY, 
          items: { type: Type.STRING } 
        },
      },
      required: ["immediateSteps", "longTermAdvice"],
    },
    urgencyLevel: {
      type: Type.STRING,
      description: "Must be one of: Emergency, Urgent, Routine, Self-Care",
    },
  },
  required: ["summary", "possibleConditions", "treatmentPlan", "urgencyLevel"],
};

export async function analyzeHealthData(symptoms: string, imageData: string | null): Promise<DiagnosisResult> {
  // Using Pro model for complex diagnostic reasoning
  const model = "gemini-3-pro-preview";
  
  const systemInstruction = `
    You are a highly advanced medical diagnostic AI assistant.
    Your goal is to provide preliminary insights based on symptoms and medical scans (X-rays, MRIs, skin photos, etc.).
    
    Guidelines:
    1. Be analytical and professional but accessible.
    2. Provide potential diagnoses but explicitly state they are NOT final medical advice.
    3. Categorize urgency (Emergency, Urgent, Routine, Self-Care).
    4. Provide actionable steps (e.g., "Apply cold compress", "Drink fluids", "Seek immediate ER attention").
    5. If a scan is provided, analyze it carefully for abnormalities mentioned in medical literature.
    6. ALWAYS emphasize consulting a human doctor.
    7. Think step-by-step through the differential diagnosis process.
  `;

  const parts: any[] = [{ text: `User Symptoms: ${symptoms}` }];

  if (imageData) {
    const base64Data = imageData.split(',')[1] || imageData;
    parts.push({
      inlineData: {
        mimeType: "image/jpeg",
        data: base64Data,
      },
    });
  }

  const response = await ai.models.generateContent({
    model,
    contents: [{ parts }],
    config: {
      systemInstruction,
      responseMimeType: "application/json",
      responseSchema: DIAGNOSIS_SCHEMA,
      temperature: 0.1,
      // Giving the model a thinking budget for better diagnostic accuracy
      thinkingConfig: { thinkingBudget: 4000 }
    },
  });

  const text = response.text;
  if (!text) throw new Error("No response from AI");

  return JSON.parse(text) as DiagnosisResult;
}
