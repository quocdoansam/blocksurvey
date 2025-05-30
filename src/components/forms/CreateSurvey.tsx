import { useState } from "react";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { CirclePlus, Info, Loader2, X } from "lucide-react";
import { Separator } from "../ui/separator";
import { Switch } from "../ui/switch";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { useCreateSurveyForm } from "@/hooks/useCreateSurveyForm";
import { generateUUID } from "@/utils/Utils";
import type { SurveyWithCreate } from "@/types/SurveyWithCreate";
import { createSurvey } from "@/services/supabase/rpc";
import { useNavigate } from "react-router-dom";
import { createSurveyOnChain } from "@/services/survey/surveyService";

const CreateSurvey = () => {
  const {
    title,
    setTitle,
    description,
    setDescription,
    options,
    startTime,
    setStartTime,
    endTime,
    setEndTime,
    allowComment,
    setAllowComment,
    allowMultiplechoice,
    setAllowMultipleChoice,
    allowOtherAnswer,
    setAllowOtherAnswer,
    handleAddAnswer,
    handleAnswerChange,
    handleRemoveAnswer,
  } = useCreateSurveyForm();

  const { user } = useAuth();
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setLoading(true);
    try {
      if (!user) {
        toast("You have to login to start creating a new survey.");
        return;
      }

      const surveyData: SurveyWithCreate = {
        id: generateUUID(),
        creator_id: user.id ?? "",
        title: title,
        description: description,
        options: options,
        start_time: startTime,
        end_time: endTime ? endTime : null,
        created_at: new Date().toISOString(),
        survey_stats: {
          status: "open",
          allow_comments: allowComment,
          allow_multiple_option: allowMultiplechoice,
          allow_other_option: allowOtherAnswer,
        },
      };

      const submitted = await createSurvey(surveyData);
      if (!submitted) {
        toast("Deploy failed. Please try again later.");
        return;
      }

      await createSurveyOnChain({
        id: surveyData.id,
        title: surveyData.title,
        end_time: surveyData.end_time,
        start_time: surveyData.start_time,
        created_at: surveyData.created_at,
      });
      toast("Your survey hasbeen deployed.");
      navigate(`/surveys/${submitted}`);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create a survey</CardTitle>
        <CardDescription>Deploy your new survey in one-click.</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className='grid w-full items-center gap-4'>
            <div className='flex flex-col space-y-1.5'>
              <Label htmlFor='title'>Title</Label>
              <Input
                id='title'
                placeholder='Title of your survey.'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className='grid w-full gap-1.5'>
              <Label htmlFor='desc'>Description</Label>
              <Textarea
                placeholder='Type description here.'
                id='desc'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <Alert>
                <Info />
                <AlertTitle>Hey!</AlertTitle>
                <AlertDescription>
                  Description is not required, ignoring it if not necessary.
                </AlertDescription>
              </Alert>
            </div>
            <div className='flex flex-col space-y-1.5'>
              <Label htmlFor='answers'>Answer options</Label>
              <div className='grid grid-cols-1 gap-2'>
                {options.map((option, index) => (
                  <div className='flex gap-2' key={index}>
                    <Input
                      placeholder={`Option ${index + 1}`}
                      value={option.content}
                      onChange={(e) =>
                        handleAnswerChange(index, e.target.value)
                      }
                      className='grow'
                    />
                    {options.length > 2 && (
                      <Button
                        size={"icon"}
                        variant={"destructive"}
                        type='button'
                        onClick={() => handleRemoveAnswer(index)}
                      >
                        <X />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
              <Button
                type='button'
                variant={"secondary"}
                onClick={handleAddAnswer}
              >
                <CirclePlus /> Add Option
              </Button>
            </div>
            <div className='flex flex-col gap-2'>
              <div className='flex flex-col md:flex-row gap-2'>
                <div className='flex flex-col space-y-1.5 w-full'>
                  <Label htmlFor='startTime'>Start time</Label>
                  <Input
                    id='startTime'
                    type='datetime-local'
                    className='justify-center'
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                  />
                </div>
                <div className='flex flex-col space-y-1.5 w-full'>
                  <Label htmlFor='startTime'>End time</Label>
                  <Input
                    id='startTime'
                    type='datetime-local'
                    className='justify-center'
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                  />
                </div>
              </div>
              <Alert>
                <Info />
                <AlertTitle>Hey!</AlertTitle>
                <AlertDescription>
                  If you want this survey to never end, ignoring the end time.
                </AlertDescription>
              </Alert>
            </div>
            <Separator />
            <div className='grid grid-cols-1 gap-2'>
              {/* <div className='flex items-center space-x-2'>
                <Label htmlFor='multiple-choice' className='w-full'>
                  Allow selection of multiple options
                </Label>
                <Switch
                  id='multiple-choice'
                  checked={allowMultiplechoice}
                  onCheckedChange={setAllowMultipleChoice}
                />
              </div> */}
              <div className='flex items-center space-x-2'>
                <Label htmlFor='multiple-choice' className='w-full'>
                  Allow comments
                </Label>
                <Switch
                  id='multiple-choice'
                  checked={allowComment}
                  onCheckedChange={setAllowComment}
                />
              </div>
              <div className='flex items-center space-x-2'>
                <Label htmlFor='multiple-choice' className='w-full'>
                  Allow other option from users
                </Label>
                <Switch
                  id='multiple-choice'
                  checked={allowOtherAnswer}
                  onCheckedChange={setAllowOtherAnswer}
                />
              </div>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className='flex justify-end'>
        {/* <Button variant='outline'>Preview</Button> */}
        <Button onClick={handleSubmit}>
          {isLoading ? <Loader2 className='animate-spin' /> : "Deploy"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CreateSurvey;
