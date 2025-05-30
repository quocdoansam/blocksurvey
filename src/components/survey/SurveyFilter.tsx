import { Search } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const SurveyFilter = () => {
  return (
    <div className='flex flex-col sm:flex-row justify-between px-1 pt-1 pb-4 gap-2'>
      <div className='flex flex-row gap-2'>
        <Input placeholder='Search survey name...' />
        <Button size={"icon"}>
          <Search />
        </Button>
      </div>
    </div>
  );
};

export default SurveyFilter;
