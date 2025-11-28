import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

type PromptErrorBannerProps = {
  message: string;
};

/**
 * Destructive alert displayed when plan generation fails.
 */
export function PromptErrorBanner({ message }: PromptErrorBannerProps) {
  return (
    <Alert variant="destructive" className="w-full max-w-xl rounded-2xl border border-red-200">
      <AlertTitle className="font-semibold">Something went wrong</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
}


