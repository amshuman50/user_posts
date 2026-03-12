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

import UserList from "@/components/users/UserList";
import { getUsers } from "@/services/api";

export default async function Page() {
  const users = await getUsers();

  return (
    <main className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            User List
          </h1>
          {/* <p className="text-gray-500 mt-2">
            Browse and manage all registered users
          </p> */}
        </div>

        {/* Card Container */}
        <div className="bg-white shadow-sm rounded-xl border border-gray-100 p-6">
          <UserList users={users} />
        </div>
      </div>
    </main>
  );
}