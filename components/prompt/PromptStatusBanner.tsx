type PromptStatusBannerProps = {
  message: string;
};

export function PromptStatusBanner({ message }: PromptStatusBannerProps) {
  if (!message) return null;

  return (
    <div className="w-full max-w-xl rounded-2xl bg-white/80 px-4 py-3 text-center text-sm text-gray-700 shadow-sm backdrop-blur">
      {message}
    </div>
  );
}


