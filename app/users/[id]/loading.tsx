export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-800">
            Loading Posts...
          </h1>
          <p className="text-gray-500 mt-2">
            Please wait while we fetch the posts
          </p>
        </div>

        {/* Loading State */}
        <div className="text-center bg-white p-8 rounded-xl shadow">
          <p className="text-gray-600">Loading posts...</p>
        </div>
      </div>
    </div>
  );
}