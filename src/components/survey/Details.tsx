import { supabase } from "@/lib/supabaseClient";
import type { SurveyWithService } from "@/types/SurveyWithService";
import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Clock3, ClockAlert, Users2 } from "lucide-react";
import { Badge } from "../ui/badge";
import { formatDate } from "@/utils/Utils";
import ShareWrapper from "./ShareWrapper";
import CommentWrapper from "./CommentWrapper";

const Details = () => {
  const { id } = useParams<{ id: string }>();
  const [survey, setSurvey] = useState<SurveyWithService | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const fetchSurveyDetails = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase
        .from("surveys")
        .select("*, survey_services(participants)")
        .eq("id", id)
        .single();

      if (error) throw error;
      setSurvey(data as SurveyWithService);
    } catch (err: any) {
      setError(err.message || "Failed to fetch survey details.");
      setSurvey(null);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchSurveyDetails();
  }, [fetchSurveyDetails]);

  if (isLoading)
    return (
      <div className='flex justify-center mt-10'>
        <Card className='w-full max-w-md'>
          <CardHeader>
            <Skeleton className='h-8 w-1/2 mb-2' />
          </CardHeader>
          <CardContent>
            <Skeleton className='h-4 w-1/3 mb-2' />
            <Skeleton className='h-4 w-1/2 mb-2' />
            <Skeleton className='h-4 w-1/4' />
          </CardContent>
        </Card>
      </div>
    );

  if (error)
    return (
      <div className='flex justify-center mt-10'>
        <Alert variant='destructive'>
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );

  if (!survey)
    return (
      <div className='flex justify-center'>
        <Alert>
          <AlertTitle>No survey found.</AlertTitle>
        </Alert>
      </div>
    );

  return (
    <div className='flex flex-col md:flex-row justify-center items-center md:items-start gap-5'>
      <Card className='w-full max-w-lg'>
        <CardHeader>
          <CardTitle>{survey.title}</CardTitle>
          <CardDescription>{survey.description}</CardDescription>
        </CardHeader>
        <Separator />
        <CardContent className='space-y-4'>
          <div className='flex justify-between'>
            <div className='text-xs text-muted-foreground flex gap-2'>
              <Clock3 size={16} /> Start time
            </div>
            <Badge>{formatDate(survey.start_time)}</Badge>
          </div>
          <div className='flex justify-between'>
            <div className='text-xs text-muted-foreground flex gap-2'>
              <ClockAlert size={16} /> End time
            </div>
            <Badge>
              {survey.end_time ? formatDate(survey.end_time) : "No deadline"}
            </Badge>
          </div>
          <div className='flex justify-between'>
            <div className='text-xs text-muted-foreground flex gap-2'>
              <Clock3 size={16} /> Created at
            </div>
            <Badge>{formatDate(survey.created_at)}</Badge>
          </div>
          <div className='flex justify-between'>
            <div className='text-xs text-muted-foreground flex gap-2'>
              <Users2 size={16} /> Participants
            </div>
            <Badge>{survey.survey_services?.[0]?.participants ?? 0}</Badge>
          </div>
          {/* Options */}
          {survey.answers && survey.answers.length > 0 && (
            <div>
              <div className='text-xs text-muted-foreground mb-2'>Answers</div>
              <div className='space-y-2'>
                {survey.answers.map((answer) => (
                  <label
                    key={answer.id}
                    className='flex items-center space-x-2'
                  >
                    <input
                      type='radio'
                      name='survey-option'
                      value={answer.id}
                      checked={selectedOption === answer.id}
                      onChange={() => setSelectedOption(answer.id)}
                    />
                    <span>{answer.content}</span>
                  </label>
                ))}
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className='flex justify-end space-x-2'>
          <Button onClick={fetchSurveyDetails}>Refresh</Button>
          <Button disabled={!selectedOption}>Submit</Button>
        </CardFooter>
      </Card>
      <div className='flex flex-col gap-5 w-full items-center'>
        <ShareWrapper />
        <CommentWrapper />
      </div>
    </div>
  );
};

export default Details;
