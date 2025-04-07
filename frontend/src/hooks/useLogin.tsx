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
        "http://localhost:9000/api/userAuth/login",
        { username, password },
        {
          withCredentials: true, // Send cookies with the request
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log(data);

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
