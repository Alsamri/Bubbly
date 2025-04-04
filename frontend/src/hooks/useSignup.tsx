import { useState } from "react";
import axios from "axios";
import { useAuthContext } from "../context/Authcontext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
type signupInputs = {
  fullName: string;
  username: string;
  password: string;
  confirmPassword: string;
  gender: string;
};
const useSignup = () => {
  const [loading, setloading] = useState(false);
  const { setAuthUser } = useAuthContext();
  const navigate = useNavigate();
  const signup = async (inputs: signupInputs) => {
    try {
      setloading(true);
      const { data } = await axios.post("/api/userAuth/signup", inputs, {
        headers: { "Content-Type": "application/json" },
      });
      setAuthUser(data);
      navigate("/");
    } catch (error: any) {
      const errorMessage = error?.response?.data?.error || "Signup failed!";
      toast.error(errorMessage);
    } finally {
      setloading(false);
    }
  };
  return { loading, signup };
};

export default useSignup;
