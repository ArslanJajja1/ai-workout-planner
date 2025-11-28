import { MoveDown, MoveUp, Trash2 } from "lucide-react";

import type { Exercise } from "@/types/workout";

type ExerciseRowProps = {
  circuitLabel: string;
  exercise: Exercise;
  disableUp: boolean;
  disableDown: boolean;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onDelete: () => void;
};

/**
 * Displays a single exercise row along with move/delete controls.
 */
export function ExerciseRow({
  circuitLabel,
  exercise,
  disableUp,
  disableDown,
  onMoveUp,
  onMoveDown,
  onDelete,
}: ExerciseRowProps) {
  return (
    <div className="grid grid-cols-[120px_minmax(0,1fr)_80px_80px_minmax(0,1.25fr)_88px] items-center rounded-sm border border-[#EAECF5] bg-white px-6 py-3 font-poppins text-[14px] font-normal leading-[150%] text-black ">
      <span className="border-r border-[#D9DBE9] pr-4">{circuitLabel}</span>
      <span className="border-r border-[#D9DBE9] px-4">{exercise.name}</span>
      <span className="border-r border-[#D9DBE9] text-center">
        {exercise.sets}
      </span>
      <span className="border-r border-[#D9DBE9] text-center">{exercise.reps}</span>
      <span className="border-r border-[#D9DBE9] px-4 text-[#4F4F4F]">
        {exercise.notes && exercise.notes.trim().length > 0 ? exercise.notes : "AI generated workout notes"}
      </span>
      <div className="flex items-center justify-between pl-4">
        <button
          type="button"
          aria-label="Delete exercise"
          onClick={onDelete}
          className="text-gray-400 transition hover:text-red-500"
        >
          <Trash2 className="h-4 w-4" />
        </button>
        <button
          type="button"
          aria-label="Move exercise up"
          onClick={onMoveUp}
          disabled={disableUp}
          className="text-gray-500 transition hover:text-gray-900 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <MoveUp className="h-4 w-4" />
        </button>
        <button
          type="button"
          aria-label="Move exercise down"
          onClick={onMoveDown}
          disabled={disableDown}
          className="text-gray-500 transition hover:text-gray-900 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <MoveDown className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

