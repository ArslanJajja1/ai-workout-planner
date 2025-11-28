import type { Week } from "@/types/workout";

import { DayCard } from "@/components/workout/DayCard";

type WeekContentProps = {
  week: Week;
  onDeleteExercise: (weekNumber: number, dayIndex: number, exerciseIndex: number) => void;
  onMoveExercise: (
    weekNumber: number,
    dayIndex: number,
    exerciseIndex: number,
    direction: "up" | "down",
  ) => void;
};

/**
 * Maps over a week's days and renders a corresponding card for each.
 */
export function WeekContent({ week, onDeleteExercise, onMoveExercise }: WeekContentProps) {
  return (
    <div className="grid grid-cols-1 gap-6">
      <section className="space-y-5">
        {week.days.map((day, dayIndex) => (
          <DayCard
            key={`${week.weekNumber}-${dayIndex}-${day.dayName}`}
            day={day}
            dayIndex={dayIndex}
            weekNumber={week.weekNumber}
            onDeleteExercise={onDeleteExercise}
            onMoveExercise={onMoveExercise}
          />
        ))}
      </section>
    </div>
  );
}


