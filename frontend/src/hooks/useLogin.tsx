import { useState } from "react";
import { useAuthContext } from "../context/Authcontext";
import axios from "axios";
import toast from "react-hot-toast";
const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const login = async (username: string, password: string) => {
    try {
      setLoading(true);
      const API_BASE_URL =
        process.env.NODE_ENV !== "development"
          ? "https://bubbly-q2bp.onrender.com"
          : "http://localhost:9000";
      const { data } = await axios.post(
        `${API_BASE_URL}/api/userAuth/login`,
        { username, password },
        {
          withCredentials: true, // Send cookies with the request
          headers: { "Content-Type": "application/json" },
        }
      );

      setAuthUser(data);
    } catch (error: any) {
      const errorMessage = error?.response?.data?.error || "Login failed!";

      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  return { login, loading };
};

export default useLogin;
