import { useEffect, useState, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";

import ShareWrapper from "./ShareWrapper";
import CommentWrapper from "./CommentWrapper";
import { getSurveysDetails } from "@/services/supabase/rpc";
import type { SurveyDetails } from "@/types/SurveyDetails";
import SurveyCardDetails from "./details/SurveyCardDetails";
import { Button } from "../ui/button";

const Details = () => {
  const { id } = useParams<{ id: string }>();
  const [survey, setSurvey] = useState<SurveyDetails | null>(null);

  const [error, setError] = useState<string | null>(null);
  const [isFetching, setFetching] = useState(true);

  const fetchSurveyDetails = useCallback(async () => {
    if (!id) return;
    setFetching(true);
    setError(null);
    try {
      const data = await getSurveysDetails(id);
      setSurvey(data);
      console.log(data);
    } catch (err: any) {
      setError(err.message || "Failed to fetch survey details.");
      setSurvey(null);
    } finally {
      setFetching(false);
    }
  }, [id]);

  useEffect(() => {
    fetchSurveyDetails();
  }, [fetchSurveyDetails]);

  if (isFetching)
    return (
      <div className='flex justify-center w-full py-20'>
        <Loader2 className='animate-spin w-20 h-20' />
      </div>
    );

  if (error)
    return (
      <div className='flex justify-center mt-10'>
        <Alert variant='destructive' className='max-w-lg'>
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );

  if (!survey)
    return (
      <div className='flex items-center flex-col'>
        <div className='flex gap-2 text-xl font-bold'>
          <h1>404</h1>
          <span>NOT FOUND!</span>
        </div>
        <Button variant={"link"} asChild>
          <Link to={"/"}>Redirect to dashboard</Link>
        </Button>
      </div>
    );

  return (
    <div className='flex flex-col md:flex-row justify-center items-center md:items-start gap-5'>
      <SurveyCardDetails survey={survey} />
      <div className='flex flex-col gap-5 w-full items-center'>
        <ShareWrapper />
        <CommentWrapper />
      </div>
    </div>
  );
};

export default Details;
