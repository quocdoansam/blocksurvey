import type { Answer } from "./Answer";

export interface Survey {
  id?: string;
  creator_id: string;
  creator_wallet: string;
  title: string;
  description: string | null;
  answers: Answer[];
  allow_other_option: boolean;
  allow_multiple_choice: boolean;
  allow_comments: boolean;
  start_time: Date;
  end_time: Date | null;
  status: SurveyStatus;
  created_at: Date;
  hash?: string;
}

export type SurveyStatus = "open" | "closed" | "archived";
