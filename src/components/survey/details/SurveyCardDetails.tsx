import { formatDate } from "@/utils/Utils";
import { Clock3, ClockAlert, Loader2, Users2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "../../ui/alert";
import { Button } from "../../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import type { SurveyDetails } from "@/types/SurveyDetails";
import { useSubmitResponse } from "@/hooks/useSubmitResponse";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import Creator from "./Creator";
import OptionSection from "./OptionSection";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

interface SurveyCardDetailsProps {
  survey: SurveyDetails;
}

const SurveyCardDetails = ({ survey }: SurveyCardDetailsProps) => {
  const [selectedOptionId, setSelectedOptionId] = useState("");
  const [submittedOptionId, setSubmittedOptionId] = useState("");
  const { user, isLoading } = useAuth();
  const { isInprocess, submited, setSubmited, handleSubmit, error } =
    useSubmitResponse();

  const [isExpired, setExpired] = useState(false);
  const [isNotStarted, setNotStarted] = useState(false);

  const handleClick = () => {
    if (!user?.id) {
      toast("You must log in to be able to conduct a survey");
      return;
    }

    handleSubmit({
      surveyId: survey.id,
      optionId: selectedOptionId,
      respondentId: user.id,
    });
    if (
      survey.survey_stats &&
      typeof survey.survey_stats.participants === "number"
    ) {
      survey.survey_stats.participants += 1;
    }
  };

  useEffect(() => {
    if (!user) return;
    if (survey?.survey_responses) {
      const found = survey.survey_responses.find(
        (sRes) => sRes.respondent_id === user?.id
      );
      if (found) {
        setSubmited(true);
        setSelectedOptionId(found.option_id);
        setSubmittedOptionId(found.option_id);
      }
    }
    if (survey.end_time) {
      if (new Date(survey.end_time).getTime() < Date.now()) {
        setExpired(true);
      }
    }
    if (survey.start_time) {
      if (new Date(survey.start_time).getTime() > Date.now()) {
        setNotStarted(true);
      }
    }
  }, [survey, user]);

  return (
    <Card className='w-full'>
      <CardHeader>
        <CardTitle>{survey.title}</CardTitle>
        <CardDescription className='wrap-break-word'>
          {survey.description}
        </CardDescription>
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
          <Badge>{survey.survey_stats?.participants}</Badge>
        </div>
        {isLoading ? (
          <Loader2 className='animate-spin' />
        ) : (
          <OptionSection
            options={survey.options}
            survey_stats={survey.survey_stats}
            selectedOptionId={selectedOptionId}
            setSelectedOptionId={setSelectedOptionId}
            submittedOptionId={submittedOptionId}
            submited={submited}
            expired={isExpired}
            notStarted={isNotStarted}
          />
        )}
        {submited && (
          <Alert variant='default'>
            <AlertTitle>Submitted</AlertTitle>
            <AlertDescription>You have submitted this survey.</AlertDescription>
          </Alert>
        )}
        {error && (
          <Alert variant='destructive'>
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        {isExpired && (
          <Alert variant='destructive'>
            <AlertTitle>Expired</AlertTitle>
            <AlertDescription>This election has ended.</AlertDescription>
          </Alert>
        )}
        {isNotStarted && (
          <Alert variant='destructive'>
            <AlertTitle>Not Started</AlertTitle>
            <AlertDescription>This survey has not happened.</AlertDescription>
          </Alert>
        )}
      </CardContent>
      <CardFooter className='flex justify-between space-x-2'>
        <Creator creatorData={survey.creator} />
        <div className='flex gap-2'>
          <Button
            disabled={!selectedOptionId || submited}
            onClick={handleClick}
          >
            {isInprocess ? <Loader2 className='animate-spin' /> : "Submit"}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default SurveyCardDetails;
