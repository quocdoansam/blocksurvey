import { submitResponse } from "@/services/supabase/rpc";
import { useState } from "react";

export const useSubmitResponse = () => {
  const [isInprocess, setInprocess] = useState(false);
  const [error, setError] = useState("");
  const [submited, setSubmited] = useState(false);

  async function handleSubmit({
    surveyId,
    optionId,
    respondentId,
  }: {
    surveyId: string;
    optionId: string;
    respondentId: string;
  }) {
    setError("");
    setSubmited(false);
    setInprocess(true);
    try {
      await submitResponse(surveyId, optionId, respondentId);
      setSubmited(true);
    } catch (err) {
      console.error("Submit response failed:", err);
      setError("Submit failed. Please try again later.");
    } finally {
      setInprocess(false);
    }
  }

  return {
    isInprocess,
    error,
    submited,
    setSubmited,
    handleSubmit,
  };
};
