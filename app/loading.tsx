export default function Loading() {
  return (
    <main className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            User List
          </h1>
        </div>

        {/* Card Container */}
        <div className="bg-white shadow-sm rounded-xl border border-gray-100 p-6">
          <div className="text-center py-8">
            <p className="text-gray-600">Loading users...</p>
          </div>
        </div>
      </div>
    </main>
  );
}