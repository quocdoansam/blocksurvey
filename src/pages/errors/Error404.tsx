import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Error404 = () => {
  return (
    <div className='flex min-h-screen flex-col w-full justify-center items-center'>
      <div className='flex gap-2 text-xl font-bold'>
        <h1>404</h1>
        <span>NOT FOUND!</span>
      </div>
      <Button variant={"link"} asChild>
        <Link to={"/"}>Redirect to dashboard</Link>
      </Button>
    </div>
  );
};

export default Error404;
