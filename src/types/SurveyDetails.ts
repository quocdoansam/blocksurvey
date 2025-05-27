import type { SurveyOption } from "./SurveyOption";
import type { SurveyResponse } from "./SurveyResponse";
import type { SurveyStats } from "./SurveyStats";
import type { User } from "./User";

export interface SurveyDetails {
  id: string;
  creator_id: string;
  title: string;
  description: string;
  start_time: string;
  end_time: string;
  options: SurveyOption[];
  creator: User;
  survey_responses: SurveyResponse[];
  survey_stats: SurveyStats;
  created_at: string;
}
