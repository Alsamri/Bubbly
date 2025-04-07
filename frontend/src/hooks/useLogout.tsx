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
      await axios.post("http://localhost:9000/api/userAuth/logout", {
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
