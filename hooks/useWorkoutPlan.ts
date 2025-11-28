import { useCallback, useEffect, useMemo, useState } from "react";

import { WORKOUT_PLAN_STORAGE_KEY } from "@/constants/storage";
import type { Week, WorkoutPlan } from "@/types/workout";

type ExerciseDirection = "up" | "down";

/**
 * Centralizes workout-plan persistence, selection, and mutation logic.
 */
export function useWorkoutPlan() {
  const [plan, setPlan] = useState<WorkoutPlan | null>(null);
  const [selectedWeek, setSelectedWeek] = useState<string>("");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const stored = window.localStorage.getItem(WORKOUT_PLAN_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as WorkoutPlan;
        setPlan(parsed);
        const initialWeek = parsed.weeks?.[0]?.weekNumber;
        if (initialWeek) {
          setSelectedWeek(`week-${initialWeek}`);
        }
      }
    } catch (error) {
      console.error("[useWorkoutPlan] Failed to parse stored plan", error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!plan || typeof window === "undefined") return;
    window.localStorage.setItem(WORKOUT_PLAN_STORAGE_KEY, JSON.stringify(plan));
  }, [plan]);

  useEffect(() => {
    if (!plan) return;
    if (!selectedWeek && plan.weeks.length > 0) {
      setSelectedWeek(`week-${plan.weeks[0].weekNumber}`);
    }
  }, [plan, selectedWeek]);

  const handleWeekChange = useCallback((value: string) => setSelectedWeek(value), []);

  const updateWeek = useCallback((weekNumber: number, updater: (week: Week) => Week) => {
    setPlan((prev) => {
      if (!prev) return prev;
      const weeks = prev.weeks.map((week) =>
        week.weekNumber === weekNumber ? updater(week) : week,
      );
      return { ...prev, weeks };
    });
  }, []);

  const deleteCircuit = useCallback((weekNumber: number, circuitId: string) => {
    updateWeek(weekNumber, (week) => ({
      ...week,
      circuits: (week.circuits ?? []).filter((circuit) => circuit.id !== circuitId),
    }));
  }, [updateWeek]);

  const reorderCircuit = useCallback(
    (weekNumber: number, sourceIndex: number, destinationIndex: number) => {
      if (sourceIndex === destinationIndex) return;
      updateWeek(weekNumber, (week) => {
        const circuits = [...(week.circuits ?? [])];
        if (
          sourceIndex < 0 ||
          destinationIndex < 0 ||
          sourceIndex >= circuits.length ||
          destinationIndex >= circuits.length
        ) {
          return week;
        }
        const [moved] = circuits.splice(sourceIndex, 1);
        circuits.splice(destinationIndex, 0, moved);
        return { ...week, circuits };
      });
    },
    [updateWeek],
  );

  const deleteExercise = useCallback(
    (weekNumber: number, dayIndex: number, exerciseIndex: number) => {
      updateWeek(weekNumber, (week) => {
        const days = week.days.map((day, idx) => {
          if (idx !== dayIndex) return day;
          const exercises = day.exercises.filter((_, exIdx) => exIdx !== exerciseIndex);
          return { ...day, exercises };
        });
        return { ...week, days };
      });
    },
    [updateWeek],
  );

  const moveExercise = useCallback(
    (
      weekNumber: number,
      dayIndex: number,
      exerciseIndex: number,
      direction: ExerciseDirection,
    ) => {
      updateWeek(weekNumber, (week) => {
        const days = week.days.map((day, idx) => {
          if (idx !== dayIndex) return day;
          const exercises = [...day.exercises];
          const targetIndex = direction === "up" ? exerciseIndex - 1 : exerciseIndex + 1;
          if (targetIndex < 0 || targetIndex >= exercises.length) {
            return day;
          }
          [exercises[exerciseIndex], exercises[targetIndex]] = [
            exercises[targetIndex],
            exercises[exerciseIndex],
          ];
          return { ...day, exercises };
        });
        return { ...week, days };
      });
    },
    [updateWeek],
  );

  const currentWeek = useMemo(() => {
    if (!plan) return null;
    return (
      plan.weeks.find((week) => `week-${week.weekNumber}` === selectedWeek) ??
      plan.weeks[0] ??
      null
    );
  }, [plan, selectedWeek]);

  return {
    plan,
    isLoaded,
    selectedWeek,
    currentWeek,
    handleWeekChange,
    deleteCircuit,
    reorderCircuit,
    deleteExercise,
    moveExercise,
  };
}

