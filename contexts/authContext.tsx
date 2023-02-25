import { User } from "firebase/auth";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { auth } from "services/firebase/firebase";

interface AuthContextType {
  user: User | null | undefined;
}

export const AuthContext = createContext<AuthContextType>({
  user: undefined,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null | undefined>(
    auth.currentUser ?? undefined
  ); // undefined means we are still determining whether the user is logged in or not
  useEffect(() => {
    const unsubcribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => {
      unsubcribe();
    };
  }, []);
  const defaultValue: AuthContextType = {
    user: user,
  };
  return (
    <AuthContext.Provider value={defaultValue}>{children}</AuthContext.Provider>
  );
};
export const useAuthContext = () => {
  return useContext(AuthContext);
};
