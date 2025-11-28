import type { ReactNode } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Week } from "@/types/workout";

type WeekTabsProps = {
  weeks: Week[];
  selectedWeek: string;
  onValueChange: (value: string) => void;
  renderWeek: (week: Week) => ReactNode;
};

/**
 * Renders navigable tabs for each week in the generated program.
 */
export function WeekTabs({ weeks, selectedWeek, onValueChange, renderWeek }: WeekTabsProps) {
  if (!weeks.length) {
    return null;
  }

  return (
    <Tabs value={selectedWeek} onValueChange={onValueChange} className="w-full">
      <TabsList className="flex flex-wrap gap-4 bg-transparent p-0">
        {weeks.map((week) => (
          <TabsTrigger
            key={week.weekNumber}
            value={`week-${week.weekNumber}`}
            className="flex h-10 w-[93px] items-center justify-center rounded-md border border-transparent bg-white px-4 py-2 font-poppins text-[16px] font-medium leading-[150%] text-black transition data-[state=active]:bg-[#6367EF] data-[state=active]:text-white"
          >
            Week {week.weekNumber}
          </TabsTrigger>
        ))}
      </TabsList>

      {weeks.map((week) => (
        <TabsContent key={week.weekNumber} value={`week-${week.weekNumber}`} className="mt-6 outline-none">
          {renderWeek(week)}
        </TabsContent>
      ))}
    </Tabs>
  );
}

