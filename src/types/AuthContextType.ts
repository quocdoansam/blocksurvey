import type { User } from "./User";

export type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  fetchUser: () => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
};
