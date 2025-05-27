import { supabase } from "@/lib/supabaseClient";
import type { Survey } from "@/types/Survey";
import type { SurveyDetails } from "@/types/SurveyDetails";
import type { SurveyWithCreate } from "@/types/SurveyWithCreate";

export const insertSurveyService = async (surveyId: string) => {
  const { error } = await supabase.rpc("insert_survey_service", {
    survey_id: surveyId,
  });
  if (error) throw new Error(error.message);
};

export const updateSurveyCreated = async (userId: string) => {
  const { error } = await supabase.rpc("update_survey_created", {
    p_user_id: userId,
  });
  if (error) throw new Error(error.message);
};

export const updateTotalSubmitted = async (answerId: string) => {
  const { error } = await supabase.rpc("update_total_submitted", {
    answer_id: answerId,
  });
  if (error) throw new Error(error.message);
};

export const getSurveys = async (userId: string) => {
  let { data, error } = await supabase.rpc("getsurveys", {
    p_creator_id: userId,
  });
  if (error) console.error(error);
  return data as Survey[];
};

export const getSurveysDetails = async (surveyId: string) => {
  let { data, error } = await supabase.rpc("get_survey_details", {
    p_survey_id: surveyId,
  });

  if (error) console.error(error);
  return data as SurveyDetails;
};

export const createSurvey = async (surveyData: SurveyWithCreate) => {
  let { data, error } = await supabase.rpc("create_survey", {
    p_created_at: surveyData.created_at,
    p_creator_id: surveyData.creator_id,
    p_description: surveyData.description,
    p_end_time: surveyData.end_time,
    p_id: surveyData.id,
    p_options: surveyData.options,
    p_start_time: surveyData.start_time,
    p_survey_stats: surveyData.survey_stats,
    p_title: surveyData.title,
  });

  if (error) console.error(error);
  else console.log(data);
  return data;
};

export const submitResponse = async (
  survey_id: string,
  option_id: string,
  respondent_id: string
) => {
  let { data, error } = await supabase.rpc("submit_response", {
    p_survey_id: survey_id,
    p_option_id: option_id,
    p_respondent_id: respondent_id,
  });

  if (error) console.error(error);
  else console.log(data);
};
