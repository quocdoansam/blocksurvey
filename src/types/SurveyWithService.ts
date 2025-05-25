import type { Survey } from "./Survey";

export interface SurveyWithService extends Survey {
  survey_services: {
    participants: number;
    updated_at: Date;
  }[];
}
