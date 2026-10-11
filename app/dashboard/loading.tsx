export default function Loading() {
  return (
    <main
      className="min-h-[80vh] bg-[#EFF5F0] px-4 py-10 sm:px-6"
      role="status"
      aria-label="লোড হচ্ছে"
    >
      <div className="mx-auto max-w-6xl">
        {/* Loading indicator */}
        <div className="flex flex-col items-center justify-center py-10">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#D5E7DA] border-t-[#05893E]" />

          <h2 className="mt-5 text-xl font-bold text-[#202820]">
            একটু অপেক্ষা করুন...
          </h2>

          <p className="mt-2 text-sm text-[#68716A]">প্রোফাইল লোড হচ্ছে</p>
        </div>

        {/* Hero skeleton */}
        <div className="animate-pulse rounded-3xl border border-[#DDE7DF] bg-[#FAFCFA] p-6 sm:p-8">
          <div className="h-6 w-36 rounded-full bg-[#DDE7DF]" />
          <div className="mt-5 h-8 w-full max-w-lg rounded-lg bg-[#DDE7DF]" />
          <div className="mt-3 h-4 w-full max-w-xl rounded bg-[#E5ECE6]" />
          <div className="mt-2 h-4 w-3/4 max-w-md rounded bg-[#E5ECE6]" />
          <div className="mt-6 h-11 w-32 rounded-lg bg-[#DDE7DF]" />
        </div>

        {/* Category skeletons */}
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="animate-pulse rounded-2xl border border-[#DDE7DF] bg-[#FAFCFA] p-5"
            >
              <div className="mx-auto h-12 w-12 rounded-full bg-[#E0F2E5]" />
              <div className="mx-auto mt-4 h-4 w-20 max-w-full rounded bg-[#DDE7DF]" />
            </div>
          ))}
        </div>

        {/* Product list skeletons */}
        <div className="mt-10">
          <div className="mb-5 h-7 w-48 rounded bg-[#DDE7DF]" />

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="animate-pulse rounded-2xl border border-[#DDE7DF] bg-[#FAFCFA] p-5"
              >
                <div className="h-5 w-2/3 rounded bg-[#DDE7DF]" />
                <div className="mt-4 h-4 w-full rounded bg-[#E5ECE6]" />
                <div className="mt-2 h-4 w-4/5 rounded bg-[#E5ECE6]" />
                <div className="mt-6 h-8 w-1/2 rounded bg-[#E0F2E5]" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <span className="sr-only">
        প্রোফাইল লোড হচ্ছে, অনুগ্রহ করে অপেক্ষা করুন।
      </span>
    </main>
  );
}
