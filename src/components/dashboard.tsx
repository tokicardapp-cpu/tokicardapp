import { useEffect, useState } from "react";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { getDb } from "../lib/firebase";
import { motion } from "framer-motion";
import { Loader2, Users, Search } from "lucide-react";

export default function Dashboard() {
  const [users, setUsers] = useState<any[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchUsers = async () => {
      const db = await getDb();
      const waitlistRef = collection(db, "waitlist");
      const q = query(waitlistRef, orderBy("timestamp", "desc"));

      // ✅ Real-time updates
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const userList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsers(userList);
        setFilteredUsers(userList);
        setTotal(userList.length);
        setLoading(false);
      });

      return () => unsubscribe();
    };

    fetchUsers();
  }, []);

  // 🔍 Search logic
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredUsers(users);
      return;
    }

    const term = searchTerm.toLowerCase();
    const filtered = users.filter(
      (user) =>
        user.fullName?.toLowerCase().includes(term) ||
        user.email?.toLowerCase().includes(term)
    );
    setFilteredUsers(filtered);
  }, [searchTerm, users]);

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto"
      >
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8 gap-4">
          <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800 text-center sm:text-left">
            Waitlist Dashboard
          </h1>
          <div className="flex justify-center sm:justify-end">
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200">
              <Users className="w-5 h-5 text-purple-600" />
              <span className="text-gray-700 font-medium">Total: {total}</span>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-md mx-auto sm:mx-0 mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-[14px] rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500/30 bg-white"
          />
        </div>

        {/* Content */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          {loading ? (
            <div className="flex justify-center items-center py-10">
              <Loader2 className="w-6 h-6 text-gray-400 animate-spin" />
              <span className="ml-2 text-gray-500">Loading...</span>
            </div>
          ) : filteredUsers.length === 0 ? (
            <p className="text-center text-gray-500 py-10">
              No users found {searchTerm && `for "${searchTerm}"`}.
            </p>
          ) : (
            <>
              {/* Desktop Table */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead className="bg-gray-100 text-left text-gray-600 text-sm uppercase">
                    <tr>
                      <th className="px-6 py-3 font-semibold">Name</th>
                      <th className="px-6 py-3 font-semibold">Email</th>
                      <th className="px-6 py-3 font-semibold text-center">
                        Points
                      </th>
                      <th className="px-6 py-3 font-semibold">Joined</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700 text-sm">
                    {filteredUsers.map((user) => (
                      <tr
                        key={user.id}
                        className="hover:bg-gray-50 border-b border-gray-100"
                      >
                        <td className="px-6 py-3">{user.fullName}</td>
                        <td className="px-6 py-3 break-words">{user.email}</td>
                        <td className="px-6 py-3 text-center">
                          {user.points || 0}
                        </td>
                        <td className="px-6 py-3 text-gray-500 whitespace-nowrap">
                          {new Date(user.timestamp).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards */}
              <div className="block md:hidden p-4 space-y-4">
                {filteredUsers.map((user) => (
                  <div
                    key={user.id}
                    className="border border-gray-200 rounded-lg p-4 shadow-sm bg-white hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h2 className="font-semibold text-gray-800 text-[15px]">
                        {user.fullName}
                      </h2>
                      <span className="text-purple-600 text-[13px] font-medium">
                        {user.points || 0} pts
                      </span>
                    </div>
                    <p className="text-[13px] text-gray-600 break-words">
                      {user.email}
                    </p>
                    <p className="text-[12px] text-gray-400 mt-1">
                      Joined: {new Date(user.timestamp).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
}
