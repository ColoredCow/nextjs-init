import useSWR from "swr";
import axios from "@/lib/axios";
import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

export const useUserActions = ({
  middleware,
  redirectIfAuthenticated,
} = {}) => {
  const fetchUsers = async (page = 1) => {
    const { data } = await axios.get(`/api/users?page=${page}`);
    return data;
  };

  const fetchRoles = async () => {
    const { data } = await axios.get("/api/roles");
    return data;
  };

  const deleteUser = async (userId) => {
    await axios.delete(`/api/users/${userId}`);
  };

  const updateUserRoles = async (userId, roles) => {
    await axios.put(`/api/users/${userId}/roles`, { roles });
  };

  return {
    fetchUsers,
    fetchRoles,
    updateUserRoles,
    deleteUser,
  };
};
