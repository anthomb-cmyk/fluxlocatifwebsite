import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/google-genai';

let aiInstance: any = null;

export function getAi() {
  if (!aiInstance) {
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || process.env.GEMINI_API_KEY || process.env.GOOGLE_GENAI_API_KEY || 'dummy-key';
    aiInstance = genkit({
      plugins: [googleAI({ apiKey })],
      model: 'googleai/gemini-2.0-flash-exp',
    });
  }
  return aiInstance;
}

// For backward compatibility with existing flows
export const ai = new Proxy({} as any, {
  get(target, prop) {
    if (prop === '_instance') return target._instance;
    const instance = getAi();
    return instance[prop];
  }
});
