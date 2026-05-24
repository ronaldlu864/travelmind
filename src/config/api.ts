// ============================================================
// KIMI API Configuration for TravelMind
// ============================================================
//
// Setup:
// 1. Copy .env.example to .env
// 2. Add your KIMI API Key to .env (VITE_KIMI_API_KEY=sk-...)
// 3. For Vercel: add VITE_KIMI_API_KEY in Project Settings > Environment Variables
//
// Get your key: https://platform.moonshot.cn/

export const KIMI_CONFIG = {
  API_KEY: import.meta.env.VITE_KIMI_API_KEY || '',
  BASE_URL: 'https://api.moonshot.cn/v1',
  MODEL: 'moonshot-v1-8k',
  SYSTEM_PROMPT: `You are TravelMind, a warm and knowledgeable family travel assistant. You help families plan trips, find flights & hotels, build packing lists, explain visa requirements, suggest activities, and answer any travel-related questions.

Guidelines:
- Be friendly, warm, and conversational in your tone
- Always consider family needs (kids, elderly, dietary restrictions)
- Provide practical, actionable advice
- Include specific recommendations when possible (hotel names, restaurant names, activity suggestions)
- Mention important travel tips (visa requirements, best seasons, safety advice)
- Format your responses with clear sections using markdown
- Keep responses concise but informative (2-4 paragraphs unless more detail is requested)
- If you don't know something specific, be honest and suggest alternatives`,
};

export async function callKimiAPI(messages: { role: string; content: string }[]) {
  const { API_KEY, BASE_URL, MODEL, SYSTEM_PROMPT } = KIMI_CONFIG;

  if (!API_KEY) {
    throw new Error(
      'KIMI_API_KEY_NOT_SET: Please add VITE_KIMI_API_KEY to your .env file or Vercel environment variables.'
    );
  }

  const response = await fetch(`${BASE_URL}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        ...messages,
      ],
      temperature: 0.7,
      max_tokens: 2048,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const errorMsg = errorData.error?.message || `HTTP ${response.status}: ${response.statusText}`;
    throw new Error(`KIMI_API_ERROR: ${errorMsg}`);
  }

  const data = await response.json();
  return data.choices[0]?.message?.content || 'Sorry, I could not generate a response.';
}
