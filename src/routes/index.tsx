import Callback from "@/pages/CallBack";
import Error404 from "@/pages/errors/Error404";
import Dashboard from "@/pages/Dashboard";
import Login from "@/pages/Login";
import { Create } from "@/pages/surveys/Create";
import Setting from "@/pages/Setting";
import Details from "@/components/survey/Details";
import MainLayout from "@/layouts/MainLayout";

export const routes = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "", element: <Dashboard /> },
      { path: "create", element: <Create /> },
      { path: "settings", element: <Setting /> },
      {
        path: "surveys/:id",
        element: <Details />,
      },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/callback", element: <Callback /> },
  { path: "*", element: <Error404 /> },
];
