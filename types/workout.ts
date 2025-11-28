import { z } from "zod";

/**
 * Exercises describe a single movement entry in the user's program.
 */
export const ExerciseSchema = z.object({
  name: z.string(),
  sets: z.number().int().nonnegative(),
  reps: z.string(),
  notes: z.string().nullable().optional(),
});

/**
 * Represents a single training day that owns an ordered list of exercises.
 */
export const DaySchema = z.object({
  dayName: z.string(),
  exercises: z.array(ExerciseSchema),
});

/**
 * Optional circuits surfaced alongside the weekly program.
 */
export const CircuitSchema = z.object({
  id: z.string(),
  title: z.string(),
  items: z.array(z.string()),
});

/**
 * A week contains training days and optional circuits.
 */
export const WeekSchema = z.object({
  weekNumber: z.number().int(),
  days: z.array(DaySchema),
  circuits: z.array(CircuitSchema).default([]),
});

/**
 * Top-level workout plan consumed by both the API route and UI.
 */
export const WorkoutPlanSchema = z.object({
  programName: z.string(),
  durationInWeeks: z.number().int().positive().optional(),
  weeks: z.array(WeekSchema),
});

export type Exercise = z.infer<typeof ExerciseSchema>;
export type Day = z.infer<typeof DaySchema>;
export type Circuit = z.infer<typeof CircuitSchema>;
export type Week = z.infer<typeof WeekSchema>;
export type WorkoutPlan = z.infer<typeof WorkoutPlanSchema>;

