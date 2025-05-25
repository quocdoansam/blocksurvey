import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useAuth } from "@/contexts/AuthContext";
import { Skeleton } from "../ui/skeleton";
import { Link } from "react-router-dom";
import type { JSX } from "react";
import { LogOut, Menu } from "lucide-react";
import { useResponsive } from "@/hooks/useResponsive";

interface NavUserProps {
  items: {
    path: string;
    icon: JSX.Element;
    content: string;
  }[][];
}

export function NavUser({ items }: NavUserProps) {
  const { user, isLoading, logout } = useAuth();
  const { isMobile } = useResponsive();

  if (isLoading) {
    return (
      <div className='flex flex-row gap-2 items-center'>
        <Skeleton className='w-20 h-9 rounded-xl' />
        <Skeleton className='size-9 rounded-full' />
      </div>
    );
  }

  if (!user) {
    return (
      <Button asChild>
        <a href='/login'>Login</a>
      </Button>
    );
  }

  return (
    <div className='flex flex-row gap-2 items-center'>
      <Button variant={"outline"} className='select-none' asChild>
        <Link to={"/create"}>Create Survey</Link>
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          {isMobile ? (
            <Button size={"icon"}>
              <Menu />
            </Button>
          ) : (
            <Avatar className='size-9 select-none hover:scale-105 transition cursor-pointer'>
              <AvatarImage src={user?.avatar_url ?? ""} />
              <AvatarFallback>
                {user?.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          )}
        </DropdownMenuTrigger>
        <DropdownMenuContent className='w-56' align='end'>
          <DropdownMenuLabel>
            {isMobile ? (
              <div className='flex flex-row gap-2 items-center'>
                <Avatar>
                  <AvatarImage src={user?.avatar_url ?? ""} />
                  <AvatarFallback>
                    {user?.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span>{user?.name}</span>
              </div>
            ) : (
              <span>Hi, {user?.name}</span>
            )}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {items.map(
            (group, groupIndex) =>
              group.length > 0 && (
                <div key={groupIndex}>
                  <DropdownMenuGroup>
                    {group.map((item, itemIndex) => (
                      <DropdownMenuItem key={itemIndex} asChild>
                        <Link to={item.path}>
                          {item.icon} {item.content}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                </div>
              )
          )}
          <DropdownMenuItem onClick={logout}>
            <LogOut /> Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
