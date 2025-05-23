import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import type { JSX } from "react";

interface NavMainProps {
  items: {
    path: string;
    icon: JSX.Element;
    content: string;
  }[];
}

const NavMain = ({ items }: NavMainProps) => {
  return (
    <div className='flex flex-row gap-4 items-center'>
      {items.map((item, index) => (
        <Button variant={"ghost"} key={index} asChild>
          <Link to={item.path}>
            {item.icon} {item.content}
          </Link>
        </Button>
      ))}
    </div>
  );
};

export default NavMain;
