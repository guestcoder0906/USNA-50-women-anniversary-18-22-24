import { GoogleGenAI } from "@google/genai";

const EVENT_CONTEXT = `
You are the helpful AI assistant for the "USNA Women - 50th Anniversary Celebration" website.
Your goal is to answer questions about the event based STRICTLY on the following information.
If the answer is not in the text below, politely say you don't have that information.

Event Title: USNA Women: 50 Years of Breaking Barriers and Building Bonds
Theme: Breaking Barriers and Building Bonds
Dates: April 16-19, 2026
Location: Annapolis, MD at the Fluegel Alumni Center (FAC) and Navy-Marine Corps Memorial Stadium (NMCMS).

Key Events:
1. Mother Daughter Weekend: Celebrating women graduates and their mothers.
2. Father Daughter Weekend: Celebrating the bond between fathers and daughters.
3. Mentorship Weekend: Networking between alumnae and midshipmen.

Schedule:
- Thursday, April 16th: Golf Outing (Brigade Sports Complex), Welcoming Reception (FAC).
- Friday, April 17th: Day 1 Conference (NMCMS), 50th Anniversary Gala (FAC).
- Saturday, April 18th: Day 2 Conference (NMCMS).
- Sunday, April 19th: First Class Welcome (Class of 2026) (FAC).

Registration:
- "Screaming Early" Discount ($175 off): November 15th ONLY.
- "Early Bird": November 17th - January 15th.

Exhibit Info:
- Partnership with Historic Museum of Annapolis.
- Submission deadlines: Nov 1st (Physical Exhibit), Nov 30th (Digital Repository).
- Contact: Pamela Pitkin ‘82 (703-801-3221).
`;

export const getEventAssistantResponse = async (userMessage: string): Promise<string> => {
  try {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      return "I'm sorry, I cannot answer right now because the API key is missing.";
    }

    const ai = new GoogleGenAI({ apiKey });
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: userMessage,
      config: {
        systemInstruction: EVENT_CONTEXT,
        thinkingConfig: { thinkingBudget: 0 } // Low latency preferred for simple Q&A
      },
    });

    return response.text || "I'm sorry, I couldn't generate a response.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm having trouble connecting to the event database right now. Please try again later.";
  }
};