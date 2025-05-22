import type { UserRow } from "@/db/schema/users";

export type AuthContextType = {
  user: UserRow | null;
  isLoading: boolean;
  fetchUser: () => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
};
