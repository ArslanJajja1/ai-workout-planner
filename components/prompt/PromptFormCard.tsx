import type { FormEvent } from "react";
import { Loader2, SendHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

type PromptFormCardProps = {
  prompt: string;
  remaining: string;
  isLoading: boolean;
  isRedirecting: boolean;
  isDisabled: boolean;
  maxPromptLength: number;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void | Promise<void>;
  onPromptChange: (value: string) => void;
};

/**
 * Styled card that wraps the textarea, counter, and submit CTA.
 */
export function PromptFormCard({
  prompt,
  remaining,
  isLoading,
  isRedirecting,
  isDisabled,
  maxPromptLength,
  onSubmit,
  onPromptChange,
}: PromptFormCardProps) {
  const isBusy = isLoading || isRedirecting;

  return (
    <form onSubmit={onSubmit} className="w-full max-w-xl">
      <div className="rounded-[32px] border border-[#ECECEC] bg-white p-4 shadow-sm">
        <Textarea
          id="workoutPrompt"
          value={prompt}
          onChange={(event) => onPromptChange(event.target.value)}
          placeholder="Describe what are we building today..."
          maxLength={maxPromptLength}
          disabled={isBusy}
          className="min-h-[160px] w-full resize-none rounded-[24px] border border-transparent bg-white px-4 py-3 font-poppins text-[14px] font-medium leading-5 text-[#131313] outline-none"
        />
        <div className="mt-4 flex items-center justify-end gap-4 text-sm text-gray-400">
          <span>{remaining}</span>
          <Button
            type="submit"
            disabled={isDisabled}
            aria-label="Generate plan"
            className="flex h-12 w-12 items-center justify-center rounded-full bg-[#6367EF] text-white transition hover:bg-[#5458d6] disabled:cursor-not-allowed disabled:bg-[#E9EFFF] disabled:text-gray-400"
          >
            {isBusy ? <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" /> : <SendHorizontal className="h-5 w-5" aria-hidden="true" />}
          </Button>
        </div>
      </div>
    </form>
  );
}


