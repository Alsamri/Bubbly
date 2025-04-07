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
      const API_BASE_URL =
        process.env.NODE_ENV !== "development"
          ? "https://bubbly-q2bp.onrender.com"
          : "http://localhost:9000";
      const { data } = await axios.post(
        `${API_BASE_URL}/api/userAuth/signup`,
        inputs,
        {
          withCredentials: true, // Send cookies with the request
          headers: { "Content-Type": "application/json" },
        }
      );

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
