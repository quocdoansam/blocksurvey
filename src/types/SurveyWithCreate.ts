import type { Survey } from "./Survey";
import type { SurveyOption } from "./SurveyOption";

export interface SurveyWithCreate extends Survey {
  options: SurveyOption[];
  creator_id: string;
  description: string | null;
}
