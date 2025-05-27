import type { UserStats } from "./UserStats";

export interface User {
  id?: string;
  name: string;
  email: string;
  avatar_url: string;
  wallet_address: string;
  is_admin?: boolean;
  user_stats?: UserStats;
  created_at?: string;
  updated_at?: string;
}
