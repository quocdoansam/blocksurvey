import type { SurveyOption } from "@/types/SurveyOption";
import { generateUUID } from "@/utils/Utils";
import { useState } from "react";

export const useAddOtherOption = () => {
  const [option, setOption] = useState<SurveyOption | "">("");
  const [content, setContent] = useState("");

  async function handleSubmit() {
    setOption({ id: generateUUID(), content: content });
  }

  return { setContent, handleSubmit };
};
