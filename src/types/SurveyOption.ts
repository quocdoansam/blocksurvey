import type { SurveyOptionStats } from "./SurveyOptionStats";
import type { User } from "./User";

export interface SurveyOption {
  id: string;
  creator_id?: string;
  creator?: User;
  content: string;
  survey_option_stats?: SurveyOptionStats;
  updated_at?: string;
  created_at?: string;
}
