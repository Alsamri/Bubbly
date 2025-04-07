// hooks/useAllUsers.ts
import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

interface User {
  id: string;
  fullName: string;
  profilePic: string;
}

const useAllUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      const API_BASE_URL =
        process.env.NODE_ENV !== "development"
          ? "https://bubbly-q2bp.onrender.com"
          : "http://localhost:9000";
      try {
        const { data } = await axios.get(
          `${API_BASE_URL}/api/messages/allUsers`,
          {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
          }
        );

        setUsers(data);
      } catch (error: any) {
        console.error("Error fetching users:", error);
        toast.error("Failed to fetch users.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return { users, loading };
};

export default useAllUsers;
