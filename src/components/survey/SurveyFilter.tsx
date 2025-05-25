import { Search } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const SurveyFilter = () => {
  return (
    <div className='flex flex-col sm:flex-row justify-between px-1 pt-1 pb-4 gap-2'>
      <div className='flex flex-row gap-2'>
        <Input placeholder='Search survey name...' />
        <Button size={"icon"}>
          <Search />
        </Button>
      </div>
      <div className='flex flex-row gap-2'>
        <Select>
          <SelectTrigger id='survey-type' className='w-full'>
            <SelectValue placeholder='Filter      ' />
          </SelectTrigger>
          <SelectContent position='popper' className='w-full'>
            <SelectItem value='multiple'>Multiple choice</SelectItem>
            <SelectItem value='meeting'>Meeting Survey</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger id='survey-type' className='w-full'>
            <SelectValue placeholder='Filter' />
          </SelectTrigger>
          <SelectContent position='popper' className='w-full'>
            <SelectItem value='multiple'>Multiple choice</SelectItem>
            <SelectItem value='meeting'>Meeting Survey</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default SurveyFilter;
