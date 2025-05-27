import { supabase } from "@/lib/supabaseClient";

export const insertAnswerService = async (answerId: string) => {
  const { data, error } = await supabase
    .from("answer_service")
    .select("id")
    .maybeSingle();
  if (!data?.id) {
    const { error } = await supabase
      .from("answer_service")
      .insert({ id: answerId });
    if (error) throw new Error(error.message);
  }
  console.error(error);
};