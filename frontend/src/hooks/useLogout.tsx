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
      const data = await axios.post("/api/userAuth/logout");

      setAuthUser(null);
    } catch (error: any) {
      const errorMessage = error?.response?.data?.error || "Signup failed!";

      toast.error(errorMessage);
    } finally {
      setloading(false);
    }
  };
  return { loading, logout };
};

export default useLogout;
