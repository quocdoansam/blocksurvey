import getBlockSurveyContract from "@/lib/contract";
import { getSigner } from "@/lib/magic";
import { useEffect } from "react";
import SurveyWrapper from "@/components/survey/SurveyWrapper";
import useSurvey from "@/hooks/useSurvey";
import SurveySkeletonWrapper from "@/components/skeletons/SurveySkeletonWrapper";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const Dashboard = () => {
  const { error, isLoading, surveys } = useSurvey();
  async function test() {
    try {
      const contract = getBlockSurveyContract(getSigner());
      const tx = await contract.submitSurveyHash("Test");
      await tx.wait();
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchSurveyByHash(hash: string) {
    try {
      const signer = getSigner();
      const contract = getBlockSurveyContract(signer);
      const result = await contract.verifySurvey(hash);
      const [creator, timestamp] = result;

      console.log("Survey Creator:", creator);
      console.log("Timestamp:", new Date(Number(timestamp) * 1000));
    } catch (err) {
      console.error("Survey not found or error:", err);
    }
  }

  useEffect(() => {
    // fetchSurveyByHash(
    //   "0x015dbb4cfa5057868d3a589781dd3578899cb601f9be3e05ccb04224649f8e92"
    // );
  }, []);
  return (
    <>
      {isLoading ? (
        <SurveySkeletonWrapper />
      ) : surveys.length <= 0 ? (
        <div className='w-full h-full flex justify-center items-center my-auto'>
          <Alert className='max-w-lg'>
            <AlertTitle>Survey</AlertTitle>
            <AlertDescription>No survey yet.</AlertDescription>
          </Alert>
        </div>
      ) : (
        <SurveyWrapper surveys={surveys} />
      )}
    </>
  );
};

export default Dashboard;
