import SurveyWrapper from "@/components/survey/SurveyWrapper";
import useSurvey from "@/hooks/useSurvey";
import { Loader2 } from "lucide-react";

const Dashboard = () => {
  const { isLoading, surveys } = useSurvey();
  return (
    <>
      {isLoading ? (
        <div className='flex justify-center w-full py-20'>
          <Loader2 className='animate-spin w-20 h-20' />
        </div>
      ) : surveys.length <= 0 ? (
        <div className='w-full h-full flex justify-center items-center my-auto'>
          <span className='text-xl font-semibold py-10'>No survey yet.</span>
        </div>
      ) : (
        <SurveyWrapper surveys={surveys} />
      )}
    </>
  );
};

export default Dashboard;
