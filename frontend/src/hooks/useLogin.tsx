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
      const { data } = await axios.post(
        "/api/userAuth/login",
        { username, password },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      setAuthUser(data);
    } catch (error: any) {
      const errorMessage = error?.response?.data?.error || "Signup failed!";

      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  return { login, loading };
};

export default useLogin;
