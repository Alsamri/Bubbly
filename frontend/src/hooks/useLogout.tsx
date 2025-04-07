import { useState } from "react";
import { useAuthContext } from "../context/Authcontext";
import axios from "axios";
import toast from "react-hot-toast";
const useLogout = () => {
  const [loading, setloading] = useState(false);
  const { setAuthUser } = useAuthContext();
  const logout = async () => {
    try {
      setloading(true);
      const API_BASE_URL =
        process.env.NODE_ENV !== "development"
          ? "https://bubbly-q2bp.onrender.com"
          : "http://localhost:9000";
      await axios.post(`${API_BASE_URL}/api/userAuth/logout`, {
        withCredentials: true, // Send cookies with the request
        headers: { "Content-Type": "application/json" },
      });

      setAuthUser(null);
    } catch (error: any) {
      const errorMessage = error?.response?.data?.error || "logout failed!";

      toast.error(errorMessage);
    } finally {
      setloading(false);
    }
  };
  return { loading, logout };
};

export default useLogout;
