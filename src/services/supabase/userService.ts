import type { User as UserSchema } from "@/db/schema";
import type { User as UserType } from "@/types/User";
import { supabase } from "@/lib/supabaseClient";

export const createUser = async (user: UserSchema) => {
  const { error } = await supabase.rpc("create_user", {
    p_name: user.name,
    p_email: user.email,
    p_avatar_url: user.avatar_url,
    p_wallet_address: user.wallet_address,
  });

  if (error) throw new Error(error.message);
};

export const insertUserStats = async (userId: string) => {
  const { data, error } = await supabase.rpc("user_stats_exists", {
    uid: userId,
  });

  if (error) throw new Error(error.message);
  console.log(data);
  if (!data) {
    const { error } = await supabase
      .from("user_stats")
      .insert({ user_id: userId });
    if (error) throw new Error(error.message);
  }
};

export const fetchUserFromSupabase = async (
  email: string
): Promise<UserType | null> => {
  try {
    const { data, error } = await supabase
      .from("users")
      .select(`*, user_stats(*)`)
      .eq("email", email)
      .single();

    if (error) {
      console.error(error.message);
      return null;
    }

    return data as UserType;
  } catch (err) {
    console.error("Unexpected error fetching user from Supabase:", err);
    return null;
  }
};
