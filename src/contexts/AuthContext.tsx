// context/AuthContext.tsx
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { useNavigate } from "react-router-dom";
import { magic } from "@/lib/magic";
import { supabase } from "@/lib/supabaseClient";
import type { AuthContextType } from "@/types/AuthContextType";
import type { UserRow } from "@/db/schema/users";
import { generateAvatar } from "@/utils/Utils";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setLoading] = useState(true);
  const [user, setUser] = useState<UserRow | null>(null);
  const navigate = useNavigate();

  const fetchUser = async () => {
    try {
      const loggedIn = await magic.user.isLoggedIn();
      if (!loggedIn) {
        setUser(null);
        localStorage.removeItem("user");
        return;
      }

      const stored = localStorage.getItem("user");
      if (stored) {
        setUser(JSON.parse(stored));
        return;
      }

      const info = await magic.user.getInfo();
      const issuer = info.issuer ?? "";

      const formattedUser: UserRow = {
        id: issuer,
        name: info.email?.split("@")[0] || "Unknown",
        email: info.email || "",
        public_address: info.publicAddress || "",
        avatar_url: generateAvatar(info.publicAddress ?? "default-avatar"),
      };

      // Sync user into Supabase
      await supabase.from("users").upsert(formattedUser);

      setUser(formattedUser);
      localStorage.setItem("user", JSON.stringify(formattedUser));
    } catch (err) {
      console.error("Error fetching user:", err);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      await magic.user.logout();
      localStorage.removeItem("user");
      setUser(null);
      navigate("/login");
    } catch (err) {
      console.error("Error logging out:", err);
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
