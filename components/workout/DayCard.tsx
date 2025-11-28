import { Card, CardContent } from "@/components/ui/card";
import type { Day } from "@/types/workout";

import { ExerciseRow } from "./ExerciseRow";

type DayCardProps = {
  day: Day;
  dayIndex: number;
  weekNumber: number;
  onDeleteExercise: (weekNumber: number, dayIndex: number, exerciseIndex: number) => void;
  onMoveExercise: (
    weekNumber: number,
    dayIndex: number,
    exerciseIndex: number,
    direction: "up" | "down",
  ) => void;
};

/**
 * Presents an individual day's exercises with consistent table layout.
 */
export function DayCard({
  day,
  dayIndex,
  weekNumber,
  onDeleteExercise,
  onMoveExercise,
}: DayCardProps) {
  const normalizedLabel = (() => {
    const keywords = [
      "upper body",
      "lower body",
      "full body",
      "push",
      "pull",
      "legs",
      "core",
      "cardio",
      "conditioning",
      "mobility",
      "strength",
      "recovery",
    ];

    const normalize = (value: string) =>
      value
        .split(" ")
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(" ");

    const matchFrom = (value?: string) => {
      if (!value) return null;
      const lower = value.toLowerCase();
      const hit = keywords.find((keyword) => lower.includes(keyword));
      return hit ? normalize(hit) : null;
    };

    return (
      matchFrom(day.dayName) ??
      day.exercises.map((exercise) => matchFrom(exercise.name)).find(Boolean) ??
      day.exercises[0]?.name ??
      day.dayName ??
      "Workout"
    );
  })();

  const formattedHeading = `Day ${dayIndex + 1} - ${normalizedLabel}`;

  return (
    <Card className="overflow-visible border-none bg-transparent shadow-none">
      <div className="flex h-[53px] w-full items-center justify-between rounded-sm bg-[#CBCDEB] px-6">
        <span className="font-poppins text-[20px] font-medium leading-[120%] text-black">
          {formattedHeading}
        </span>
      </div>
      <CardContent className="space-y-4 px-0 py-4">
        <div className="w-full overflow-x-auto">
          <div className="min-w-[720px] space-y-3">
            <div className="grid grid-cols-[120px_minmax(0,1fr)_80px_80px_minmax(0,1.25fr)_88px] gap-2 rounded-sm border border-[#EAECF5] bg-[#F2F2F2] px-6 py-3 font-poppins text-[14px] font-normal leading-[150%] text-black">
              <span className="border-r border-[#D9DBE9] pr-4">Circuits</span>
              <span className="border-r border-[#D9DBE9] px-4">Exercise</span>
              <span className="border-r border-[#D9DBE9] text-center">Sets</span>
              <span className="border-r border-[#D9DBE9] text-center">Reps</span>
              <span className="border-r border-[#D9DBE9] px-4">Notes</span>
              <span className="text-right pl-4"></span>
            </div>
            <div className="space-y-2">
              {day.exercises.map((exercise, index) => (
                <ExerciseRow
                  key={`${exercise.name}-${index}`}
                  circuitLabel={String.fromCharCode(65 + (index % 26))}
                  exercise={exercise}
                  disableUp={index === 0}
                  disableDown={index === day.exercises.length - 1}
                  onMoveUp={() => onMoveExercise(weekNumber, dayIndex, index, "up")}
                  onMoveDown={() => onMoveExercise(weekNumber, dayIndex, index, "down")}
                  onDelete={() => onDeleteExercise(weekNumber, dayIndex, index)}
                />
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

