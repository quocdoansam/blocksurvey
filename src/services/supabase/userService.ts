import type { UserRow } from "@/db/schema/users";
import { supabase } from "@/lib/supabaseClient";

/**
 * Sync user into Supabase through upsert.
 * Throw the error if Supabase return error.
 * @param user
 */
export const syncUserToSupabase = async (user: UserRow) => {
  const { error } = await supabase.from("users").upsert(user, {
    onConflict: "email",
  });
  if (error) throw error;
};
