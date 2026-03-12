// export default function UserList({ users }: any) {
//   return (
//     <div>
//       {users.map((user: any) => (
//         <div key={user.id}>
//           <p>{user.name}</p>
//           <p>{user.email}</p>
//         </div>
//       ))}
//     </div>
//   );
// }

'use client';

import { useState, useMemo } from 'react';
import Link from "next/link";

export default function UserList({ users }: any) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredUsers = useMemo(() => {
    if (!searchQuery) return users;
    return users.filter((user: any) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [users, searchQuery]);

  return (
    <div>
      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
      </div>

      {/* User List */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredUsers.map((user: any) => (
          <div
            key={user.id}
            className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 hover:shadow-xl transition duration-300"
          >
            {/* User Info */}
            <div className="flex items-center gap-4 mb-4">
              <div className="h-12 w-12 flex items-center justify-center rounded-full bg-indigo-100 text-indigo-600 font-bold text-lg">
                {user.name.charAt(0)}
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800">{user.name}</h3>
                <p className="text-sm text-gray-500">{user.email}</p>
                <p className="text-sm text-indigo-600 font-medium mt-1">
                  {user.company?.name}
                </p>
              </div>
            </div>

            {/* View Posts Button */}
            <Link
              href={`/users/${user.id}`}
              className="block text-center w-full bg-indigo-600 text-white py-2 rounded-lg font-medium hover:bg-indigo-700 transition"
            >
              View Posts
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}