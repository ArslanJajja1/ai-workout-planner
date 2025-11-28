import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";

type PlanEmptyStateProps = {
  onBack: () => void;
};

/**
 * Empty state displayed when no workout plan exists in storage.
 */
export function PlanEmptyState({ onBack }: PlanEmptyStateProps) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md space-y-4 rounded-3xl bg-white p-8 text-center shadow-sm">
        <h1 className="text-2xl font-semibold text-gray-900">No workout plan found</h1>
        <p className="text-gray-500">
          Generate a plan first, then return to this page to view the structured program.
        </p>
        <Button
          className="mt-2 rounded-full bg-gray-900 px-6 py-3 text-white hover:bg-gray-800"
          onClick={onBack}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Go back
        </Button>
      </div>
    </main>
  );
}


