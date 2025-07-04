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
import { fetchUserFromSupabase } from "@/services/supabase/userService";
import type { User } from "@/types/User";

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

      const stored = localStorage.getItem("user");
      if (stored) {
        setUser(JSON.parse(stored));
        return;
      }

      const userMetadata = await magic.user.getInfo();
      if (!userMetadata.email) throw new Error("The email is missing.");

      const user = await fetchUserFromSupabase(userMetadata.email);
      if (!user) throw new Error("User not found.");

      setUser(user);
      localStorage.setItem("user", JSON.stringify(user));
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
      localStorage.removeItem("user");
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
