"use client";

export default function TaxCalculatorError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section className="bg-background">
      <div className="container mx-auto flex flex-col items-center justify-center py-20 px-4 text-center gap-4">
        <h2 className="text-2xl font-bold text-[#001F3F]">
          Something went wrong
        </h2>
        <p className="text-[#4A5565]">
          We couldn&apos;t load the tax calculator data. Please try again.
        </p>
        <button
          onClick={reset}
          className="px-6 py-2 bg-[#001F3F] text-white rounded-md hover:bg-[#001F3F]/90 transition-colors cursor-pointer"
        >
          Try again
        </button>
      </div>
    </section>
  );
}
