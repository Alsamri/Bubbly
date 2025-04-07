import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
  ReactNode,
  useContext,
} from "react";
import axios from "axios";
type AuthUserType = {
  id: string;
  fullName: string;
  email: string;
  profilePic: string;
  gender: string;
};

const Authcontext = createContext<{
  authUser: AuthUserType | null;
  setAuthUser: Dispatch<SetStateAction<AuthUserType | null>>;
  isLoading: boolean;
}>({
  authUser: null,
  setAuthUser: () => {},
  isLoading: true,
});
export const useAuthContext = () => {
  return useContext(Authcontext);
};
export const AuthcontextProvider = ({ children }: { children: ReactNode }) => {
  const [authUser, setAuthUser] = useState<AuthUserType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAuthUser = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:9000/api/userAuth/status",
          {
            withCredentials: true, // Send cookies with the request
            headers: { "Content-Type": "application/json" },
          }
        );
        setAuthUser(data);
      } catch (error: any) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAuthUser();
  }, []);
  return (
    <Authcontext.Provider value={{ authUser, isLoading, setAuthUser }}>
      {children}
    </Authcontext.Provider>
  );
};

export default Authcontext;
