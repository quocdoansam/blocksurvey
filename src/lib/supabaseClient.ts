import { readDotEnv } from "@/utils/ReadDotEnv";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = readDotEnv("REACT_APP_SUPABASE_URL");
const supabaseKey = readDotEnv("REACT_APP_SUPABASE_ANON_KEY");
export const supabase = createClient(supabaseUrl, supabaseKey);
