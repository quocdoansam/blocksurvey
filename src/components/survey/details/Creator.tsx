import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import type { User } from "@/types/User";
import { formatDate } from "@/utils/Utils";
import { CalendarIcon } from "lucide-react";

interface CreatorProps {
  creatorData: User;
}

const Creator = ({ creatorData }: CreatorProps) => {
  console.log(creatorData);
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Avatar className='cursor-pointer'>
          <AvatarImage src={creatorData.avatar_url} />
          <AvatarFallback>
            {creatorData.name.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </HoverCardTrigger>
      <HoverCardContent className='w-80' align='start'>
        <div className='flex justify-between space-x-4'>
          <Avatar className='w-20 h-20 rounded-md'>
            <AvatarImage src={creatorData.avatar_url} />
            <AvatarFallback>
              {creatorData.name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className='space-y-1'>
            <h4 className='text-sm font-semibold'>{creatorData.name}</h4>
            <p className='text-sm'>{creatorData.email}</p>
            <p className='text-sm'>
              {creatorData.user_stats?.surveys_created} surveys created
            </p>
            <p className='text-sm'>
              {creatorData.user_stats?.surveys_participanted} surveys
              participanted
            </p>
            <div className='flex items-center pt-2'>
              <CalendarIcon className='mr-2 h-4 w-4 opacity-70' />{" "}
              <span className='text-xs text-muted-foreground'>
                Joined {formatDate(creatorData.created_at)}
              </span>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export default Creator;
