import { Send } from "lucide-react";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";

const CommentWrapper = () => {
  return (
    <Card className='w-full max-w-lg'>
      <CardHeader>
        <CardTitle>Comments (Coming soon)</CardTitle>
      </CardHeader>
      <Separator />
      <CardContent className='space-y-4 flex gap-4'></CardContent>
      <Separator />
      <CardFooter className='gap-2'>
        <Input type='text' placeholder='Type your comment here ...' disabled />
        <Button size={"icon"} disabled>
          <Send />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CommentWrapper;
