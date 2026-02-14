import { GoogleGenAI } from "@google/genai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

export async function generateValentinePoem(): Promise<string> {
    if (!API_KEY) {
        console.warn("API_KEY is missing. Returning fallback poem.");
        return getDefaultPoem();
    }

    try {
        const ai = new GoogleGenAI({ apiKey: API_KEY });

        const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: "Écris un poème court, flirteur et charmant en français (max 4 lignes, qui rime). Contexte : Elle vient juste de cliquer sur OUI pour être ma Valentine. Nous ne sommes pas encore un vieux couple, c'est le moment précis où l'aventure commence, où elle accepte de devenir ma copine. Le poème est pour 'Sie' (essaie d'inclure ce surnom). Le ton doit être enthousiaste, un peu séducteur et célébrer ce 'début'. Pas de titre.",
            config: {
                thinkingConfig: { thinkingBudget: 0 },
                temperature: 0.9,
            }
        });

        const text = response.text;
        if (!text) {
            throw new Error("No text returned from Gemini");
        }
        return text.trim();
    } catch (error) {
        console.error("Gemini API error:", error);
        return getDefaultPoem();
    }
}

function getDefaultPoem(): string {
    return "Un simple clic, et tout commence,\nMa douce Sie, quelle belle chance.\nTu as dit oui, l'aventure démarre,\nMon cœur pour toi se prépare ! 🌹";
}
