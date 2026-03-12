import { fetchPostsByUser } from "@/services/api";
import { Post } from "@/types/post";

interface UserPostsPageProps {
  params: Promise<{ id: string }>;
}

export default async function UserPostsPage({ params }: UserPostsPageProps) {
  const { id } = await params;
  const userId = Number(id);
  const posts = await fetchPostsByUser(userId);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-800">
            User {userId} Posts
          </h1>
          <p className="text-gray-500 mt-2">
            Browse all posts created by this user
          </p>
        </div>

        {/* Posts */}
        {posts.length === 0 ? (
          <div className="text-center bg-white p-8 rounded-xl shadow">
            <p className="text-gray-500">No posts found.</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {posts.map((post) => (
              <div
                key={post.id}
                className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <h2 className="text-xl font-semibold text-gray-800 capitalize">
                  {post.title}
                </h2>

                <p className="mt-3 text-gray-600 leading-relaxed">
                  {post.body}
                </p>
                {/* <div className="mt-4 text-sm text-gray-400">
                  Post ID: {post.id}
                </div> */}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}