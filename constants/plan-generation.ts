export const PLAN_SCHEMA_DESCRIPTION = `
WorkoutPlan schema:
- programName: string title of the program
- durationInWeeks: number of weeks (must equal weeks.length)
- weeks: array of weeks containing weekNumber, days[], and circuits[]
- days: each day has dayName and exercises[]
- exercises: each requires name, sets (int), reps (string), notes (string|null)
- circuits: list of circuit objects with id/title/items (string array). Can be empty but must exist.
`;

const PLAN_OUTPUT_RULES = [
  "- Provide 3-4 weeks unless user specifies otherwise.",
  "- Every day needs at least one exercise.",
  "- Populate notes with realistic strings (use empty string only if absolutely unknown).",
  "- Ensure durationInWeeks matches the weeks array length.",
  "- Use concise wording; avoid placeholders like TBD.",
];

export const PLAN_OUTPUT_REQUIREMENTS = PLAN_OUTPUT_RULES.join("\n");

/**
 * Ensures every call to the AI model receives identical instructions.
 */
export const buildPlanUserPrompt = (rawPrompt: string) =>
  ["USER BRIEF:", rawPrompt.trim(), "", "OUTPUT REQUIREMENTS:", PLAN_OUTPUT_REQUIREMENTS].join("\n");


