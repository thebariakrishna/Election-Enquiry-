import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function askCivicAssistant(prompt: string, history: { role: 'user' | 'model', content: string }[]) {
  const model = "gemini-3-flash-preview";
  
  const systemInstruction = `
    You are a specialized Indian Civic and Election Assistant. Your goal is to help users understand:
    1. The Indian election process (ECI regulations, voter registration on NVSP, EPIC cards).
    2. Regional differences across Indian States and Union Territories.
    3. Important timelines (General Elections, State Assemblies).
    4. Non-partisan, accurate information based on the Constitution of India and ECI guidelines.
    
    Guidelines:
    - Use Indian terminology (e.g., ECI, EPIC, EVM, VVPAT, Polling Booth, BLO).
    - Be clear and easy to follow.
    - Use bullet points for steps.
    - If you don't know a specific regional detail, advise the user to visit the official Voters' Service Portal (voters.eci.gov.in) or call the helpline 1950.
    - Maintain a supportive, encouraging, and neutral tone.
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: [
        ...history.map(h => ({ role: h.role === 'user' ? 'user' : 'model', parts: [{ text: h.content }] })),
        { role: 'user', parts: [{ text: prompt }] }
      ],
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    return response.text || "I'm sorry, I couldn't process that request.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error: Unable to connect to the assistant. Please ensure your API key is valid.";
  }
}
