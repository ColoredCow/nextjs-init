"use client";
import { useEffect, useState } from "react";
import { useUserActions } from "@/hooks/user";
import SearchBar from "@/components/SearchBar";
import Button from "@/components/Button";
import ConfirmPopup from "@/components/ConfirmPopup";
import { showToast } from "@/components/ToastProvider";
import { useAuth } from "@/hooks/auth";

const UsersPage = () => {
  const { fetchUsers, fetchRoles, updateUserRoles, deleteUser } =
    useUserActions({ middleware: "auth" });
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [usersData, rolesData] = await Promise.all([
          fetchUsers(currentPage),
          fetchRoles(),
        ]);
        const userList = usersData?.data || [];
        setUsers(userList);
        setFilteredUsers(userList);
        setRoles(rolesData || []);
        setTotalPages(usersData?.last_page || 1);
      } catch (error) {
        showToast("An error occurred. Please try again.");
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
      showToast("Role updated successfully!");
      const updatedUsers = await fetchUsers(currentPage);
      setUsers(updatedUsers?.data || []);
    } catch (error) {
      showToast("An error occurred. Please try again.");
    }
  };

  const handleConfirmDelete = async () => {
    if (userToDelete) {
      try {
        await deleteUser(userToDelete);
        showToast("User deleted successfully!");
        const updatedUsers = await fetchUsers(currentPage);
        setUsers(updatedUsers?.data || []);
      } catch (error) {
        showToast("An error occurred. Please try again.");
      }
    }
    setIsPopupOpen(false);
    setUserToDelete(null);
  };

  if (loading) return <p data-testid="loading-users">Loading users...</p>;

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold mb-6">Manage Users</h1>
        <SearchBar
          searchQuery={searchQuery}
          onSearchChange={(value) => setSearchQuery(value)}
        />
        <div className="overflow-x-auto mt-4">
          <table className="min-w-full table-auto border rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gray-800 text-white">
                <th className="p-4 text-left">Name</th>
                <th className="p-4 text-left">Email</th>
                <th className="p-4 text-center">Role</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="odd:bg-gray-50 even:bg-white">
                  <td className="p-4 text-gray-700 truncate max-w-xs">
                    {user.name}
                  </td>
                  <td className="p-4 text-gray-700 truncate max-w-xs">
                    {user.email}
                  </td>
                  <td className="p-4 text-center">
                    <select
                      data-testid={`role-select-${user.id}`}
                      value={user?.roles?.[0]?.name || ""}
                      onChange={(e) =>
                        handleRoleChange(user.id, e.target.value)
                      }
                      className="w-32 p-2 border rounded"
                    >
                      <option value="">Select Role</option>
                      {roles.map((role) => (
                        <option key={role.id} value={role.name}>
                          {role.name}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="p-4 text-center">
                    <Button
                      data-testid={`delete-user-${user.id}`}
                      onClick={() => {
                        if (user.id !== currentUser.id) {
                          setUserToDelete(user.id);
                          setIsPopupOpen(true);
                        }
                      }}
                      disabled={user.id === currentUser.id}
                      className="bg-red-500 hover:bg-red-600"
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between mt-6">
          <Button
            data-testid="pagination-previous"
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <Button
            data-testid="pagination-next"
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>

        <ConfirmPopup
          isOpen={isPopupOpen}
          message="Are you sure you want to delete this user?"
          onConfirm={handleConfirmDelete}
          onCancel={() => setIsPopupOpen(false)}
        />
      </div>
    </div>
  );
};

export default UsersPage;
