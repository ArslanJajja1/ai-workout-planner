import Image from "next/image";

type PlanHeaderProps = {
  programName: string;
  totalWeeks: number;
};

/**
 * Decorative heading for the generated program.
 */
export function PlanHeader({ programName, totalWeeks }: PlanHeaderProps) {
  return (
    <div className="w-full">
      <div className="w-full rounded-xl bg-white px-4 py-3 shadow-sm">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-center">
          <Image src="/maxedLogo.png" alt="Maxed" width={160} height={48} className="h-12 w-auto" priority />
        </div>
      </div>
    </div>
  );
}


