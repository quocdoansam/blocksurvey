import Callback from "@/pages/CallBack";
import Error404 from "@/pages/errors/Error404";
import Login from "@/pages/Login";

export const routes = [
  { path: "/login", element: <Login /> },
  { path: "/callback", element: <Callback /> },
  { path: "*", element: <Error404 /> },
];
