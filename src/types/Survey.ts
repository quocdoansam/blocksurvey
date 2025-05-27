import type { SurveyStats } from "./SurveyStats";

export interface Survey {
  id: string;
  title: string;
  start_time: string;
  end_time: string | null;
  survey_stats: SurveyStats;
  created_at: string;
}
