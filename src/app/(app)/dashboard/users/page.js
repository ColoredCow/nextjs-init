"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/auth";

const UsersPage = () => {
  const { fetchUsers, fetchRoles, updateUserRoles } = useAuth({
    middleware: "auth",
  });
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [usersData, rolesData] = await Promise.all([
          fetchUsers(),
          fetchRoles(),
        ]);
        setUsers(usersData);
        setRoles(rolesData);
      } catch (error) {
        alert("An error occurred. Please try again.");
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  const handleRoleChange = async (userId, selectedRole) => {
    try {
      const rolePayload = selectedRole ? [selectedRole] : [];
      await updateUserRoles(userId, rolePayload);
      alert("Role updated successfully!");
      const updatedUsers = await fetchUsers();
      setUsers(updatedUsers);
    } catch (error) {
      alert("An error occurred. Please try again.");
    }
  };

  if (loading) return <p>Loading users...</p>;

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <h1 className="text-xl font-bold mb-4">Manage Users</h1>
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
            {users.map((user) => (
              <tr key={user.id}>
                <td className="border p-2">{user.name}</td>
                <td className="border p-2">{user.email}</td>
                <td className="border p-2">
                  <select
                    value={user.roles.length ? user.roles[0].name : ""}
                    onChange={(e) => handleRoleChange(user.id, e.target.value)}
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
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersPage;
