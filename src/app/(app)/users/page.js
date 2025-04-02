"use client";
import { useEffect, useState, useRef } from "react";
import { useUserActions } from "@/hooks/user";
import SearchBar from "@/components/SearchBar";
import Button from "@/components/Button";
import ConfirmPopup from "@/components/ConfirmPopup";
import { showToast } from "@/components/ToastProvider";
import { useAuth } from "@/hooks/auth";

const UsersPage = () => {
  const { fetchUsers, fetchRoles, updateUserRoles, deleteUser } = useUserActions({ middleware: "auth" });
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
  const [dropdownOpen, setDropdownOpen] = useState(null); // Track which dropdown is open
  const dropdownRefs = useRef({});

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [usersData, rolesData] = await Promise.all([fetchUsers(currentPage), fetchRoles()]);
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
        user.roles.some((role) => role.name.toLowerCase().includes(lowerCaseQuery))
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
      setDropdownOpen(null); // Close dropdown after selection
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

  const toggleDropdown = (userId) => {
    setDropdownOpen(dropdownOpen === userId ? null : userId);
  };

  const handleSearchChange = (value) => setSearchQuery(value);
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) setCurrentPage(newPage);
  };

  if (loading) return <p className="text-center py-8 text-gray-500">Loading users...</p>;

  return (
    <div className="py-6 sm:py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Page Title */}
        <h1 className="text-2xl sm:text-3xl font-semibold mb-8 text-gray-900">Manage Users</h1>

        {/* Search Bar */}
        <div className="mb-8">
          <SearchBar
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
            className="w-full max-w-md shadow-sm rounded-lg border-gray-200"
          />
        </div>

        {/* Users Table */}
        <div className="bg-white shadow-lg rounded-xl overflow-hidden">
          <table className="min-w-full table-auto responsive-table">
            <thead className="bg-gray-700 text-white">
              <tr>
                <th className="p-4 text-left text-sm font-medium">Name</th>
                <th className="p-4 text-left text-sm font-medium">Email</th>
                <th className="p-4 text-center text-sm font-medium">Role</th>
                <th className="p-4 text-center text-sm font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b last:border-none hover:bg-gray-50 transition-all duration-200 ease-in-out"
                  >
                    <td data-label="Name" className="p-4 text-gray-800 text-sm md:text-base">
                      {user.name}
                    </td>
                    <td data-label="Email" className="p-4 text-gray-600 text-sm md:text-base">
                      {user.email}
                    </td>
                    <td data-label="Role" className="p-4 text-center">
                      <div className="relative inline-block w-full md:w-48" ref={(el) => (dropdownRefs.current[user.id] = el)}>
                        <button
                          onClick={() => toggleDropdown(user.id)}
                          className="w-full p-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-150"
                        >
                          {user?.roles?.[0]?.name || "Select Role"}
                          <span className="ml-2">▼</span>
                        </button>
                        {dropdownOpen === user.id && (
                          <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto">
                            <li
                              onClick={() => handleRoleChange(user.id, "")}
                              className="p-2 text-sm text-gray-700 hover:bg-blue-50 cursor-pointer transition-colors duration-100"
                            >
                              Select Role
                            </li>
                            {roles.map((role) => (
                              <li
                                key={role.id}
                                onClick={() => handleRoleChange(user.id, role.name)}
                                className="p-2 text-sm text-gray-700 hover:bg-blue-50 cursor-pointer transition-colors duration-100"
                              >
                                {role.name}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </td>
                    <td data-label="Actions" className="p-4 text-center">
                      <Button
                        onClick={() => {
                          if (user.id !== currentUser.id) {
                            setUserToDelete(user.id);
                            setIsPopupOpen(true);
                          }
                        }}
                        className={`w-full md:w-auto py-2 px-4 text-sm rounded-lg transition-all duration-150 ${
                          user.id === currentUser.id
                            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                            : "bg-red-600 text-white hover:bg-red-700 shadow-sm"
                        }`}
                        disabled={user.id === currentUser.id}
                        aria-label={`Delete user ${user.name}`}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="p-6 text-center text-gray-500 text-sm">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <Button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="w-full sm:w-auto px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 disabled:opacity-50 transition-all duration-150 shadow-sm"
          >
            Previous
          </Button>
          <span className="text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="w-full sm:w-auto px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 disabled:opacity-50 transition-all duration-150 shadow-sm"
          >
            Next
          </Button>
        </div>

        {/* Confirmation Popup */}
        <ConfirmPopup
          isOpen={isPopupOpen}
          message="Are you sure you want to delete this user?"
          onConfirm={handleConfirmDelete}
          onCancel={() => {
            setIsPopupOpen(false);
            setUserToDelete(null);
          }}
        />
      </div>
    </div>
  );
};

export default UsersPage;