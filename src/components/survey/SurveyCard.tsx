import { Badge } from "../ui/badge";
import { formatDate, getTimeLeftString } from "@/utils/Utils";
import {
  BadgePlus,
  ClockAlert,
  MessageCircle,
  Settings,
  SquareStack,
  UsersRound,
} from "lucide-react";
import type { Survey } from "@/types/Survey";
import { Link } from "react-router-dom";

interface SurveyCardProps {
  survey: Survey;
}

const SurveyCard = ({ survey }: SurveyCardProps) => {
  return (
    <Link to={`/surveys/${survey.id}`}>
      <div className='p-4 border rounded-xl bg-card shadow-md hover:shadow-xl transition space-y-2 cursor-pointer active:scale-98'>
        <h1 className='text-xl font-bold'>{survey.title}</h1>
        <p className='text-sm text-muted-foreground'>
          Created at {formatDate(survey.created_at)}
        </p>

        <div className='flex justify-between items-center text-sm'>
          <span className='text-muted-foreground flex items-center gap-2'>
            <UsersRound size={16} /> Participants
          </span>
          <Badge variant='default'>
            {survey.survey_stats.participants ?? 0}
          </Badge>
        </div>

        <div className='flex justify-between items-center text-sm'>
          <span className='text-muted-foreground flex gap-2  items-center'>
            <ClockAlert size={16} /> Deadline
          </span>
          <Badge variant='default'>
            {survey.end_time
              ? getTimeLeftString(survey.end_time)
              : "No Deadline"}
          </Badge>
        </div>
        <div className='flex justify-between items-center text-sm'>
          <span className='text-muted-foreground flex gap-2 items-center'>
            <Settings size={16} />
            Settings
          </span>
          <div className='flex gap-2 h-[22px]'>
            {survey.survey_stats.allow_multiple_option && (
              <Badge variant='default'>
                <SquareStack />
              </Badge>
            )}
            {survey.survey_stats.allow_comments && (
              <Badge variant='default'>
                <MessageCircle />
              </Badge>
            )}
            {survey.survey_stats.allow_other_option && (
              <Badge variant='default'>
                <BadgePlus />
              </Badge>
            )}
          </div>
        </div>
        <div className='flex justify-end'>
          <Badge
            variant={
              survey.survey_stats.status === "open" ? "default" : "destructive"
            }
          >
            {survey.survey_stats.status}
          </Badge>
        </div>
      </div>
    </Link>
  );
};

export default SurveyCard;
