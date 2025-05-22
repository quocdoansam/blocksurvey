import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { useNavigate } from "react-router-dom";
import { magic } from "@/lib/magic";
import type { AuthContextType } from "@/types/AuthContextType";
import type { User } from "@/types/User";
import { fetchUserFromSupabase } from "@/services/supabase/userService";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  const fetchUser = async () => {
    try {
      const loggedIn = await magic.user.isLoggedIn();
      if (!loggedIn) {
        setUser(null);
        return;
      }

      const userInfo = await magic.user.getInfo();
      if (!userInfo.publicAddress) throw new Error("No public address.");

      const user = await fetchUserFromSupabase(userInfo.publicAddress);
      if (!user) throw new Error("User not found in Supabase.");

      setUser(user);
    } catch (err) {
      console.error("Fetch user failed", err);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      await magic.user.logout();
      setUser(null);
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        logout,
        fetchUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
