'use client';
export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-red-600">
            Failed to Fetch Posts
          </h1>
          <p className="text-gray-500 mt-2">
            We encountered an error while loading the posts
          </p>
        </div>

        {/* Error State */}
        <div className="text-center bg-white p-8 rounded-xl shadow">
          <p className="text-red-600 mb-4">Something went wrong</p>
          <button
            onClick={reset}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            Please Try Again
          </button>
        </div>
      </div>
    </div>
  );
}