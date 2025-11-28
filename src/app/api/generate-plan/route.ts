import { NextResponse } from "next/server";
import { generateObject } from "ai";
import { z } from "zod";

import { AI_SYSTEM_PROMPT } from "@/constants/ai";
import { DEFAULT_PLAN_ERROR, INVALID_JSON_ERROR, MISSING_KEY_ERROR } from "@/constants/errors";
import {
  PLAN_SCHEMA_DESCRIPTION,
  buildPlanUserPrompt,
} from "@/constants/plan-generation";
import { GENERATE_PLAN_MAX_DURATION } from "@/constants/runtime";
import { jsonError, readJsonBody } from "@/lib/api-utils";
import { getLanguageModel } from "@/lib/ai-client";
import { GeneratePlanRequestSchema, type GeneratePlanResponse } from "@/types/api";
import { WorkoutPlanSchema } from "@/types/workout";

export const maxDuration = GENERATE_PLAN_MAX_DURATION;

/**
 * Generates a structured workout plan using the Vercel AI SDK.
 */
export async function POST(req: Request) {
  if (!process.env.OPENAI_API_KEY) {
    return jsonError(MISSING_KEY_ERROR);
  }

  const body = await readJsonBody<unknown>(req);
  if (!body) {
    return jsonError(INVALID_JSON_ERROR, 400);
  }

  const parsedBody = GeneratePlanRequestSchema.safeParse(body);
  if (!parsedBody.success) {
    const issue = parsedBody.error.issues[0]?.message ?? "Invalid request payload.";
    return jsonError(issue, 400);
  }

  const { prompt } = parsedBody.data;

  try {
    const model = getLanguageModel();
    const userPrompt = buildPlanUserPrompt(prompt);

    const { object } = await generateObject({
      model,
      schema: WorkoutPlanSchema,
      schemaName: "WorkoutPlan",
      schemaDescription: PLAN_SCHEMA_DESCRIPTION,
      system: AI_SYSTEM_PROMPT,
      prompt: userPrompt,
      mode: "json",
      maxRetries: 3,
    });

    const plan = WorkoutPlanSchema.parse(object);
    return NextResponse.json<GeneratePlanResponse>({ plan });
  } catch (error) {
    console.error("[/api/generate-plan] error:", error);

    if (error instanceof z.ZodError) {
      const issue = error.issues[0]?.message ?? "Validation error.";
      return jsonError(issue, 400);
    }

    const message =
      (error as { cause?: { error?: { message?: string } }; message?: string })?.cause?.error?.message ??
      (error as Error)?.message ??
      DEFAULT_PLAN_ERROR;
    return jsonError(message);
  }
}
