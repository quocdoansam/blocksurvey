import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabaseClient";
import type { SurveyWithService } from "@/types/SurveyWithService";
import { useEffect, useState, useCallback } from "react";

export const useSurvey = () => {
  const [surveys, setSurveys] = useState<SurveyWithService[]>([]);
  const [isSurveyLoading, setSurveyLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user, isLoading: isAuthLoading } = useAuth();

  const fetchSurveys = useCallback(async () => {
    if (!user?.id) {
      setSurveys([]);
      setSurveyLoading(false);
      return;
    }

    setSurveyLoading(true);
    setError(null);

    const { data, error } = await supabase
      .from("surveys")
      .select(
        `id, title, end_time, status, created_at, survey_services (participants, updated_at)`
      )
      .eq("creator_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Failed to fetch surveys:", error);
      setError(error.message);
      setSurveys([]);
    } else {
      setSurveys(data as SurveyWithService[]);
    }

    setSurveyLoading(false);
  }, [user?.id]);

  useEffect(() => {
    if (!isAuthLoading) {
      fetchSurveys();
    }
  }, [fetchSurveys, isAuthLoading]);

  return {
    surveys,
    isLoading: isSurveyLoading,
    error,
    refetch: fetchSurveys,
  };
};

export default useSurvey;
