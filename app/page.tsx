// import UserList from "@/components/users/UserList";
// import { getUsers } from "@/services/api";

// export default async function Page() {
//   const users = await getUsers();

//   return (
//     <div>
//       <h1>Users</h1>
//       <UserList users={users} />
//     </div>
//   );
// }

"use client";

import { useEffect } from 'react';
import UserList from "@/components/users/UserList";
import { getUsers } from "@/services/api";
import { useAppDispatch } from '@/store/hooks';
import { setUsers } from '@/store/usersSlice';

export default function Page() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const load = async () => {
      const users = await getUsers();
      dispatch(setUsers(users));
    };
    load();
  }, [dispatch]);

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
          <UserList />
        </div>
      </div>
    </main>
  );
}