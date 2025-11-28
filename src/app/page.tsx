"use client";

import { PromptErrorBanner } from "@/components/prompt/PromptErrorBanner";
import { PromptFormCard } from "@/components/prompt/PromptFormCard";
import { PromptHeader } from "@/components/prompt/PromptHeader";
import { PromptStatusBanner } from "@/components/prompt/PromptStatusBanner";
import { usePromptForm } from "@/hooks/usePromptForm";

/**
 * Collects the user's natural-language workout brief and triggers plan generation.
 */
export default function Page() {
  const {
    prompt,
    error,
    isLoading,
    isRedirecting,
    statusMessage,
    isDisabled,
    remaining,
    maxPromptLength,
    handlePromptChange,
    handleSubmit,
  } = usePromptForm();

  return (
    <main className="min-h-screen bg-[#f8f8f7]">
      <div className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center gap-10 px-4 py-16">
        <PromptHeader />

        {statusMessage && <PromptStatusBanner message={statusMessage} />}

        {error && <PromptErrorBanner message={error} />}

        <PromptFormCard
          prompt={prompt}
          remaining={remaining}
          isLoading={isLoading}
          isRedirecting={isRedirecting}
          isDisabled={isDisabled}
          maxPromptLength={maxPromptLength}
          onSubmit={handleSubmit}
          onPromptChange={handlePromptChange}
        />
        </div>
      </main>
  );
}
