import getBlockSurveyContract from "@/lib/contract";
import { getSigner } from "@/lib/magic";
import { supabase } from "@/lib/supabaseClient";
import type { Survey } from "@/types/Survey";
import { startHash } from "@/utils/Utils";
import { insertSurveyService, updateSurveyCreated } from "../supabase/rpc";

export const createSurveyOnChain = async (surveyData: Survey) => {
  try {
    const contract = getBlockSurveyContract(getSigner());
    const serialized = JSON.stringify(surveyData);
    const hash = startHash(serialized);

    const tx = await contract.submitSurveyHash(hash);
    await tx.wait();
  } catch (error) {
    console.log(error);
  }
};

export const insertSurveyToSupabase = async (surveyData: Survey) => {
  try {
    const { error } = await supabase.from("survey").insert({ ...surveyData });
    if (error) throw new Error(`Supabase Error: ${error.message}`);
  } catch (error) {
    console.log(error);
  }
};

export async function submitSurvey(surveyData: Survey, userId: string) {
  await insertSurveyToSupabase(surveyData);
  await updateSurveyCreated(userId);
  await insertSurveyService(surveyData.id);
  await createSurveyOnChain(surveyData);

  return true;
}
