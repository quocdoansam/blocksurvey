import { Badge } from "../ui/badge";
import { formatDate, getTimeLeftString } from "@/utils/Utils";
import type { SurveyWithService } from "@/types/SurveyWithService";
import { ClockAlert, UsersRound } from "lucide-react";
import { Link } from "react-router-dom";

interface SurveyCardProps {
  survey: SurveyWithService;
}

const SurveyCard = ({ survey }: SurveyCardProps) => {
  return (
    <Link to={`/surveys/${survey.id}`}>
      <div className='p-4 border rounded-xl bg-card shadow-md hover:shadow-xl transition space-y-2 cursor-pointer active:scale-98'>
        <h1 className='text-xl font-bold'>{survey.title}</h1>
        <p className='text-sm text-muted-foreground'>
          {formatDate(survey.created_at)}
        </p>

        <div className='flex justify-between items-center text-sm'>
          <span className='text-muted-foreground flex items-center gap-1'>
            <UsersRound size={16} /> Participants
          </span>
          <Badge variant='default'>
            {survey.survey_services?.[0]?.participants ?? 0}
          </Badge>
        </div>

        <div className='flex justify-between items-center text-sm'>
          <span className='text-muted-foreground flex gap-2'>
            <ClockAlert size={16} /> Deadline
          </span>
          <Badge variant='default'>
            {survey.end_time
              ? getTimeLeftString(survey.end_time)
              : "No Deadline"}
          </Badge>
        </div>

        <div className='flex justify-end'>
          <Badge variant={survey.status === "open" ? "default" : "destructive"}>
            {survey.status}
          </Badge>
        </div>
      </div>
    </Link>
  );
};

export default SurveyCard;
