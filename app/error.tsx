'use client';
export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <main className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-red-600">
            Something went wrong
          </h1>
          <p className="text-gray-500 mt-2">
            We encountered an error while loading the users
          </p>
        </div>

        {/* Card Container */}
        <div className="bg-white shadow-sm rounded-xl border border-gray-100 p-6">
          <div className="text-center py-8">
            <p className="text-red-600 mb-4">Something went wrong</p>
            <button
              onClick={reset}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}