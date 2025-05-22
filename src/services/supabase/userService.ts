import { supabase } from "@/lib/supabaseClient";
import type { User } from "@/types/User";

/**
 * Sync user into Supabase through upsert.
 * Throw the error if Supabase return error.
 * @param user
 */
export const syncUserToSupabase = async (user: User) => {
  const { error } = await supabase.from("users").upsert(user, {
    onConflict: "public_address",
  });
  if (error) throw error;
};

export const fetchUserFromSupabase = async (
  publicAddress: string
): Promise<User | null> => {
  try {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("public_address", publicAddress)
      .single();

    if (error) {
      console.error("Supabase fetch user error:", error.message);
      return null;
    }

    return data as User;
  } catch (err) {
    console.error("Unexpected error fetching user from Supabase:", err);
    return null;
  }
};
