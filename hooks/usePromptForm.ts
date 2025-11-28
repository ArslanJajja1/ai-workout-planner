import { type FormEvent, useCallback, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { PROMPT_MAX_LENGTH } from "@/constants/prompt";
import { WORKOUT_PLAN_STORAGE_KEY } from "@/constants/storage";
import api from "@/lib/axios";
import { getRequestErrorMessage } from "@/lib/errors";

type UsePromptFormOptions = {
  maxPromptLength?: number;
};

const MIN_WORD_COUNT = 8;
const MIN_CHARACTER_COUNT = 40;

const isPromptDetailed = (value: string) => {
  const trimmed = value.trim();
  if (trimmed.length < MIN_CHARACTER_COUNT) return false;
  return trimmed.split(/\s+/).length >= MIN_WORD_COUNT;
};

/**
 * Handles all client-side logic for the prompt form, including validation,
 * request/response flow, and persistence into localStorage.
 */
export function usePromptForm(options?: UsePromptFormOptions) {
  const router = useRouter();
  const maxPromptLength = options?.maxPromptLength ?? PROMPT_MAX_LENGTH;

  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const remaining = useMemo(
    () => `${prompt.length}/${maxPromptLength}`,
    [prompt, maxPromptLength],
  );

  const isDisabled = isLoading || isRedirecting || !prompt.trim();

  const handlePromptChange = useCallback((value: string) => {
    setPrompt(value);
    setError(null);
    setStatusMessage(null);
  }, []);

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (isLoading || isRedirecting) return;

      if (!prompt.trim()) {
        setError("Tell me a bit about the athlete first.");
        return;
      }

      if (!isPromptDetailed(prompt)) {
        setError("Could you add a few more details (goals, equipment, duration) before generating?");
        return;
      }

      setIsLoading(true);
      setStatusMessage("Crafting a personalized plan…");
      setError(null);

      let redirected = false;

      try {
        const { data } = await api.post("/generate-plan", { prompt: prompt.trim() });

        if (typeof window !== "undefined") {
          window.localStorage.setItem(
            WORKOUT_PLAN_STORAGE_KEY,
            JSON.stringify(data?.plan ?? null),
          );
        }

        setIsRedirecting(true);
        setStatusMessage("Loading your workout plan…");
        redirected = true;
        router.push("/workout-plan");
      } catch (error) {
        setError(getRequestErrorMessage(error));
        setStatusMessage(null);
      } finally {
        if (!redirected) {
          setIsLoading(false);
        }
      }
    },
    [isLoading, isRedirecting, prompt, router],
  );

  return {
    prompt,
    isLoading,
    isRedirecting,
    statusMessage,
    error,
    remaining,
    isDisabled,
    maxPromptLength,
    handlePromptChange,
    handleSubmit,
  };
}

