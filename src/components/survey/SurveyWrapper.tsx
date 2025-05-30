import type { Survey } from "@/types/Survey";
import SurveyCard from "./SurveyCard";
import SurveyFilter from "./SurveyFilter";

interface SurveyWrapperProps {
  surveys: Survey[];
}

const SurveyWrapper = ({ surveys }: SurveyWrapperProps) => {
  return (
    <>
      {/* <SurveyFilter /> */}
      <div className='columns-1 sm:columns-2 lg:columns-3'>
        {surveys.map((survey, index) => (
          <div key={index} className='break-inside-avoid mb-4'>
            <SurveyCard survey={survey} />
          </div>
        ))}
      </div>
    </>
  );
};

export default SurveyWrapper;
