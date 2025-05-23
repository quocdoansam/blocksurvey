import { Link } from "react-router-dom";
import { Button } from "../ui/button";

interface NavFooterProps {
  groups: {
    title: string;
    items: {
      path: string;
      content: string;
    }[];
  }[];
}

const NavFooter = ({ groups }: NavFooterProps) => {
  return (
    <div className='flex flex-col md:flex-row justify-between items-start gap-6 md:gap-20'>
      {groups.map((group, groupIndex) => (
        <div
          className='flex flex-col items-start justify-between'
          key={groupIndex}
        >
          <span className='text-base font-bold'>
            {group.title.toUpperCase()}
          </span>
          <div className='flex flex-col'>
            {group.items.map((item, index) => (
              <Button
                variant={"link"}
                key={index}
                className='p-0 justify-start'
                asChild
              >
                <Link to={item.path}>{item.content}</Link>
              </Button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default NavFooter;
