"use client";

import { useRouter } from "next/navigation";

import { PlanEmptyState } from "@/components/workout/PlanEmptyState";
import { PlanHeader } from "@/components/workout/PlanHeader";
import { PlanLoadingState } from "@/components/workout/PlanLoadingState";
import { WeekContent } from "@/components/workout/WeekContent";
import { WeekTabs } from "@/components/workout/WeekTabs";
import { useWorkoutPlan } from "@/hooks/useWorkoutPlan";
import type { Week } from "@/types/workout";

/**
 * Displays the generated program, handling loading, empty, and happy paths.
 */
export default function WorkoutPlanPage() {
  const router = useRouter();
  const {
    plan,
    currentWeek,
    selectedWeek,
    isLoaded,
    handleWeekChange,
    deleteExercise,
    moveExercise,
  } = useWorkoutPlan();

  if (!isLoaded) {
    return <PlanLoadingState />;
  }

  if (!plan || !currentWeek) {
    return <PlanEmptyState onBack={() => router.push("/")} />;
  }

  const totalWeeks = plan.durationInWeeks ?? plan.weeks.length;

  const renderWeek = (week: Week) => (
    <WeekContent
      week={week}
      onDeleteExercise={deleteExercise}
      onMoveExercise={moveExercise}
    />
  );

  return (
    <>
      <PlanHeader programName={plan.programName} totalWeeks={totalWeeks} />
      <main className="min-h-screen bg-[#f7f6fb] py-10 px-4 w-full">
        <div className="mx-auto flex max-w-6xl flex-col gap-8">
          <WeekTabs
            weeks={plan.weeks}
            selectedWeek={selectedWeek}
            onValueChange={handleWeekChange}
            renderWeek={renderWeek}
          />
        </div>
      </main>
    </>
  );
}
