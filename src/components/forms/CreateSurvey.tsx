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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { CirclePlus, Info, X } from "lucide-react";
import { Separator } from "../ui/separator";
import { Switch } from "../ui/switch";
import getBlockSurveyContract from "@/lib/contract";
import { getSigner } from "@/lib/magic";
import { ethers, randomBytes, uuidV4 } from "ethers";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import type { Survey } from "@/types/Survey";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabaseClient";
import type { Answer } from "@/types/Answer";

const CreateSurvey = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [answers, setAnswers] = useState<Answer[]>([
    { id: uuidV4(randomBytes(16)), content: "" },
    { id: uuidV4(randomBytes(16)), content: "" },
  ]);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [allowMultiplechoice, setAllowMultipleChoice] = useState(false);
  const [allowComment, setAllowComment] = useState(false);
  const [allowOtherOption, setAllowOtherOption] = useState(false);
  const { user } = useAuth();

  const handleAnswerChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = { ...newAnswers[index], content: value };
    setAnswers(newAnswers);
  };

  const handleAddAnswer = () => {
    setAnswers([...answers, { id: uuidV4(randomBytes(16)), content: "" }]);
  };

  const handleRemoveOption = (index: number) => {
    if (answers.length <= 2) return;
    const newOptions = answers.filter((_, i) => i !== index);
    setAnswers(newOptions);
  };

  const handleSubmit = async () => {
    try {
      if (!user) {
        console.log("Not logged in.");
        return;
      }

      const signer = getSigner();
      const creatorWallet = await signer.getAddress();

      const surveyData: Survey = {
        id: uuidV4(randomBytes(16)),
        creator_id: user.id ?? "",
        creator_wallet: creatorWallet,
        title: title,
        description: description,
        answers: answers,
        allow_other_option: allowOtherOption,
        allow_multiple_choice: allowMultiplechoice,
        allow_comments: allowComment,
        start_time: new Date(startTime),
        end_time: endTime ? new Date(endTime) : null,
        status: "open",
        created_at: new Date(),
      };

      const serialized = JSON.stringify(surveyData);
      const hash = ethers.keccak256(ethers.toUtf8Bytes(serialized));
      console.log("HASH: ", hash);

      const { error } = await supabase
        .from("surveys")
        .insert({ ...surveyData, hash });
      if (error) console.error("Insert failed:", error);

      const contract = getBlockSurveyContract(getSigner());
      const tx = await contract.submitSurveyHash(hash);
      await tx.wait();
    } catch (error) {
      console.error(error);
    }
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
                <AlertTitle>Note</AlertTitle>
                <AlertDescription>
                  Description is not required, ignoring it if not necessary.
                </AlertDescription>
              </Alert>
            </div>
            <div className='flex flex-col space-y-1.5 w-full'>
              <Label htmlFor='survey-type'>Survey type</Label>
              <Select>
                <SelectTrigger id='survey-type' className='w-full'>
                  <SelectValue placeholder='Select' />
                </SelectTrigger>
                <SelectContent position='popper' className='w-full'>
                  <SelectItem value='multiple'>Multiple choice</SelectItem>
                  <SelectItem value='meeting'>Meeting Survey</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className='flex flex-col space-y-1.5 w-full'>
              <Label htmlFor='survey-type'>Survey status</Label>
              <Select>
                <SelectTrigger id='survey-type' className='w-full'>
                  <SelectValue placeholder='Select' />
                </SelectTrigger>
                <SelectContent position='popper' className='w-full'>
                  <SelectItem value='multiple'>Multiple choice</SelectItem>
                  <SelectItem value='meeting'>Meeting Survey</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className='flex flex-col space-y-1.5'>
              <Label htmlFor='answers'>Answer Options</Label>
              <div className='grid grid-cols-1 gap-2'>
                {answers.map((answer, index) => (
                  <div className='flex gap-2' key={index}>
                    <Input
                      placeholder={`Option ${index + 1}`}
                      value={answer.content}
                      onChange={(e) =>
                        handleAnswerChange(index, e.target.value)
                      }
                      className='grow'
                    />
                    {answers.length > 2 && (
                      <Button
                        size={"icon"}
                        variant={"destructive"}
                        type='button'
                        onClick={() => handleRemoveOption(index)}
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
                <AlertTitle>Note</AlertTitle>
                <AlertDescription>
                  If you want this survey to never end, ignoring the end time.
                </AlertDescription>
              </Alert>
            </div>
            <Separator />
            <div className='grid grid-cols-1 gap-2'>
              <div className='flex items-center space-x-2'>
                <Label htmlFor='multiple-choice' className='w-full'>
                  Allow selection of multiple options
                </Label>
                <Switch
                  id='multiple-choice'
                  checked={allowMultiplechoice}
                  onCheckedChange={setAllowMultipleChoice}
                />
              </div>
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
                  checked={allowOtherOption}
                  onCheckedChange={setAllowOtherOption}
                />
              </div>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className='flex justify-between'>
        <Button variant='outline'>Preview</Button>
        <Button onSubmit={handleSubmit}>Deploy</Button>
      </CardFooter>
    </Card>
  );
};

export default CreateSurvey;
