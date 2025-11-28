import { createOpenAI } from "@ai-sdk/openai";
import type { LanguageModel } from "ai";

/**
 * Shared OpenAI client so we configure credentials once.
 */
export const openaiClient = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Returns a typed language model instance by id.
 */
const modelId = process.env.OPENAI_MODEL_ID || "gpt-4o";
export const getLanguageModel = (): LanguageModel => openaiClient(modelId);



