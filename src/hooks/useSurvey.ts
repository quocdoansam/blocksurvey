import { useAuth } from "@/contexts/AuthContext";
import { getSurveys } from "@/services/supabase/rpc";
import type { Survey } from "@/types/Survey";
import { useEffect, useState, useCallback } from "react";

export const useSurvey = () => {
  const [surveys, setSurveys] = useState<Survey[]>([]);
  const [isSurveyLoading, setSurveyLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { user, isLoading: isAuthLoading } = useAuth();
  const userId = user?.id;

  const fetchSurveys = useCallback(async () => {
    if (!userId) {
      setSurveys([]);
      setSurveyLoading(false);
      return;
    }

    try {
      setSurveyLoading(true);
      setError(null);

      const surveys = await getSurveys(userId);
      console.log("Surveys:", surveys);
      setSurveys(surveys);
    } catch (err: any) {
      console.error("Failed to fetch surveys:", err);
      setError(err.message ?? "Unknown error");
      setSurveys([]);
    } finally {
      setSurveyLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    if (isAuthLoading || !userId) return;
    fetchSurveys();
  }, [fetchSurveys, isAuthLoading, userId]);

  return {
    surveys,
    isLoading: isSurveyLoading,
    error,
    refetch: fetchSurveys,
  };
};

export default useSurvey;
