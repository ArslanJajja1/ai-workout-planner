import { z } from "zod";

import type { WorkoutPlan } from "@/types/workout";

export const GeneratePlanRequestSchema = z.object({
  prompt: z.string().min(1, "Prompt is required."),
});

export type GeneratePlanRequest = z.infer<typeof GeneratePlanRequestSchema>;

export type GeneratePlanResponse = { plan: WorkoutPlan };


