import { useResponsive } from "@/hooks/useResponsive";
import Logo from "./landing/Logo";
import NavMain from "./navigations/NavMain";
import { NavUser } from "./navigations/NavUser";
import { CircleHelp, LayoutDashboard, Settings, User2 } from "lucide-react";

const Header = () => {
  const { isMobile } = useResponsive();
  const userItems = [
    { path: "/profile", icon: <User2 />, content: "Profile" },
    { path: "/settings", icon: <Settings />, content: "Settings" },
  ];
  const mainItems = [
    { path: "/", icon: <LayoutDashboard />, content: "Dashboard" },
    { path: "/help", icon: <CircleHelp />, content: "Help Center" },
  ];
  const navUserItems = [userItems, isMobile ? mainItems : []];

  return (
    <header className='py-4'>
      <div className='flex flex-row justify-between'>
        <div className='flex flex-row gap-10'>
          <Logo size={42} />
          {!isMobile && <NavMain items={mainItems} />}
        </div>
        <NavUser items={navUserItems} />
      </div>
    </header>
  );
};

export default Header;
