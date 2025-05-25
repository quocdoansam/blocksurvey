import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Toaster } from "@/components/ui/sonner";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className='min-h-screen flex flex-col max-w-7xl px-4 mx-auto'>
      <Header />
      <main className='flex-1 overflow-y-auto mt-5 md:mt-10'>
        <Outlet />
        <Toaster />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
