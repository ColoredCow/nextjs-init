"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/auth";

const UsersPage = () => {
  const { fetchUsers, fetchRoles, updateUserRoles } = useAuth({
    middleware: "auth",
  });
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [usersData, rolesData] = await Promise.all([
          fetchUsers(currentPage),
          fetchRoles(),
        ]);
        setUsers(usersData?.data || []);
        setFilteredUsers(usersData?.data || []);
        setRoles(rolesData || []);
        setTotalPages(usersData?.last_page || 1);
      } catch (error) {
        alert("An error occurred. Please try again.");
      }
      setLoading(false);
    };

    fetchData();
  }, [currentPage]);

  useEffect(() => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    const results = users.filter(
      (user) =>
        user.name.toLowerCase().includes(lowerCaseQuery) ||
        user.email.toLowerCase().includes(lowerCaseQuery) ||
        user.roles.some((role) =>
          role.name.toLowerCase().includes(lowerCaseQuery)
        )
    );
    setFilteredUsers(results);
  }, [searchQuery, users]);

  const handleRoleChange = async (userId, selectedRole) => {
    try {
      const rolePayload = selectedRole ? [selectedRole] : [];
      await updateUserRoles(userId, rolePayload);
      alert("Role updated successfully!");
      const updatedUsers = await fetchUsers(currentPage);
      setUsers(updatedUsers?.data || []);
    } catch (error) {
      alert("An error occurred. Please try again.");
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  if (loading) return <p>Loading users...</p>;

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <h1 className="text-xl font-bold mb-4">Manage Users</h1>
        <input
          type="text"
          placeholder="Search by name, email, or role"
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-full p-2 mb-4 border rounded"
        />
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border p-2">Name</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Role</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td className="border p-2">{user.name}</td>
                  <td className="border p-2">{user.email}</td>
                  <td className="border p-2">
                    <select
                      value={user?.roles?.[0]?.name || ""}
                      onChange={(e) =>
                        handleRoleChange(user.id, e.target.value)
                      }
                      className="w-full"
                    >
                      <option value="">Select Role</option>
                      {roles.map((role) => (
                        <option key={role.id} value={role.name}>
                          {role.name}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="border p-2">
                    <button
                      onClick={() => handleRoleChange(user.id, "")}
                      className="px-3 py-1 bg-red-500 text-white rounded"
                    >
                      Remove Role
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="border p-2 text-center">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="flex justify-between mt-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-300 rounded"
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-300 rounded"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default UsersPage;
