import type { SurveyOption } from "@/types/SurveyOption";
import { generateUUID } from "@/utils/Utils";
import { useState } from "react";

export const useCreateSurveyForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [options, setOptions] = useState<SurveyOption[]>([
    { id: generateUUID(), content: "" },
    { id: generateUUID(), content: "" },
  ]);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [allowMultiplechoice, setAllowMultipleChoice] = useState(false);
  const [allowComment, setAllowComment] = useState(false);
  const [allowOtherAnswer, setAllowOtherAnswer] = useState(false);

  const handleOptionChange = (index: number, value: string) => {
    const newOption = [...options];
    newOption[index] = { ...newOption[index], content: value };
    setOptions(newOption);
  };

  const handleAddOption = () => {
    setOptions([...options, { id: generateUUID(), content: "" }]);
  };

  const handleRemoveOption = (index: number) => {
    if (options.length <= 2) return;
    const newOptions = options.filter((_, i) => i !== index);
    setOptions(newOptions);
  };

  return {
    title,
    setTitle,
    description,
    setDescription,
    options,
    startTime,
    setStartTime,
    endTime,
    setEndTime,
    allowMultiplechoice,
    setAllowMultipleChoice,
    allowComment,
    setAllowComment,
    allowOtherAnswer,
    setAllowOtherAnswer,
    handleAnswerChange: handleOptionChange,
    handleAddAnswer: handleAddOption,
    handleRemoveAnswer: handleRemoveOption,
  };
};
