import { CirclePlus, Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useParams } from "react-router-dom";
import { useState } from "react";
import type { SurveyOption } from "@/types/SurveyOption";
import { generateUUID } from "@/utils/Utils";
import { useAuth } from "@/contexts/AuthContext";
import { insertOtherSurvey } from "@/services/supabase/rpc";
import { toast } from "sonner";

const AddOtherOption = () => {
  const { id } = useParams<{ id: string }>();
  const [content, setContent] = useState("");
  const { user } = useAuth();
  const [isLoading, setLoading] = useState(false);

  async function handleSubmit() {
    const optionData: SurveyOption = {
      id: generateUUID(),
      content: content,
      creator_id: user?.id,
    };
    console.log(optionData);
    setLoading(true);
    if (
      !optionData.id ||
      !optionData.content ||
      !optionData.creator_id ||
      !id
    ) {
      toast("Missing data, please try again later.");
      return;
    }
    try {
      await insertOtherSurvey(
        optionData.id,
        id,
        optionData.content,
        optionData.creator_id
      );
      toast("Add another option successfully.");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='outline' className='w-full'>
          <CirclePlus /> Add another option
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Add another options</DialogTitle>
          <DialogDescription>
            Add the option that you feel suitable for this survey!
          </DialogDescription>
        </DialogHeader>
        <div className='grid gap-4 py-4'>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='option' className='text-right'>
              Option
            </Label>
            <Input
              id='option'
              value={content}
              className='col-span-3'
              placeholder='Type here ...'
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type='submit' onClick={handleSubmit}>
            {isLoading ? <Loader2 className='animate-spin' /> : "Submit"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddOtherOption;
