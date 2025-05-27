import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import AddOtherOption from "../AddOtherOption";
import type { SurveyOption } from "@/types/SurveyOption";
import type { SurveyStats } from "@/types/SurveyStats";

interface OptionSectionProps {
  options: SurveyOption[];
  survey_stats: SurveyStats;
  selectedOptionId: string;
  setSelectedOptionId: (value: string) => void;
  submittedOptionId?: string;
  submited: boolean;
}

const OptionSection = ({
  options,
  survey_stats,
  selectedOptionId,
  setSelectedOptionId,
  submittedOptionId,
  submited,
}: OptionSectionProps) => {
  return (
    <div>
      {options && options.length > 0 && (
        <>
          <div className='text-xs text-muted-foreground mb-2'>Answers</div>
          <div className='space-y-2'>
            <RadioGroup
              value={selectedOptionId}
              onValueChange={setSelectedOptionId}
              disabled={submited}
              defaultValue={submittedOptionId}
            >
              {options.map((option) => (
                <div
                  key={option.id}
                  className='flex items-center space-x-2 border px-3 rounded-lg'
                >
                  <RadioGroupItem value={option.id} id={option.id} />
                  <Label
                    htmlFor={option.id}
                    className='flex justify-between w-full h-9'
                  >
                    {option.content}{" "}
                    <Badge>
                      {option.survey_option_stats?.total_votes ?? "Null"}
                    </Badge>
                  </Label>
                </div>
              ))}
            </RadioGroup>
            {survey_stats.allow_other_option && !submited && <AddOtherOption />}
          </div>
        </>
      )}
    </div>
  );
};

export default OptionSection;
