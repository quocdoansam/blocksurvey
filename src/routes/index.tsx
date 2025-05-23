import MainLayout from "@/components/layouts/MainLayout";
import Callback from "@/pages/CallBack";
import Error404 from "@/pages/errors/Error404";
import Dashboard from "@/pages/Dashboard";
import Login from "@/pages/Login";

export const routes = [
  {
    path: "/",
    element: <MainLayout />,
    children: [{ path: "", element: <Dashboard /> }],
  },
  { path: "/login", element: <Login /> },
  { path: "/callback", element: <Callback /> },
  { path: "*", element: <Error404 /> },
];
