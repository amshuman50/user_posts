'use client';

import { useState, useEffect } from 'react';
import { fetchPostsByUser } from "@/services/api";
import { Post } from "@/types/post";
import { z } from 'zod';

interface UserPostsPageProps {
  params: Promise<{ id: string }>;
}

const postSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  body: z.string().min(1, 'Body is required'),
});

export default function UserPostsPage({ params }: UserPostsPageProps) {
  const [userId, setUserId] = useState<number | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [errors, setErrors] = useState<{ title?: string; body?: string }>({});

  useEffect(() => {
    const loadData = async () => {
      const { id } = await params;
      const uid = Number(id);
      setUserId(uid);

      const apiPosts = await fetchPostsByUser(uid);
      const localPosts = JSON.parse(localStorage.getItem(`posts_${uid}`) || '[]');
      setPosts([...apiPosts, ...localPosts]);
    };
    loadData();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = postSchema.safeParse({ title, body });
    if (!result.success) {
      const errorObj: { title?: string; body?: string } = {};
      // result.error.issues.forEach((err) => {
      //   if (err.path[0] === 'title') errorObj.title = err.message;
      //   if (err.path[0] === 'body') errorObj.body = err.message;
      // });
      for (const err of result.error.issues) {
        if (err.path[0] === 'title') errorObj.title = err.message;
        if (err.path[0] === 'body') errorObj.body = err.message;
      }
      setErrors(errorObj);
    } else {
      setErrors({});
      const newPost: Post = {
        userId: userId!,
        id: Date.now(),
        title: result.data.title,
        body: result.data.body,
      };
      const localPosts = JSON.parse(localStorage.getItem(`posts_${userId}`) || '[]');
      localPosts.push(newPost);
      localStorage.setItem(`posts_${userId}`, JSON.stringify(localPosts));
      setPosts((prev) => [...prev, newPost]);
      setTitle('');
      setBody('');
      setIsModalOpen(false);
    }
  };

  if (!userId) {
    return <div>Loading...</div>;
  }

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
          <button
            onClick={() => setIsModalOpen(true)}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Add New Post
          </button>
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

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
              <h2 className="text-2xl font-bold mb-4">Add New Post</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700">Title</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Body</label>
                  <textarea
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={4}
                  />
                  {errors.body && <p className="text-red-500 text-sm">{errors.body}</p>}
                </div>
                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Add Post
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
//         )}
//       </div>
//     </div>
//   );
// }