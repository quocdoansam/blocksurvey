import Callback from "@/pages/CallBack";
import Error404 from "@/pages/errors/Error404";
import Home from "@/pages/Home";
import Login from "@/pages/Login";

export const routes = [
  { path: "/", element: <Home /> },
  { path: "/login", element: <Login /> },
  { path: "/callback", element: <Callback /> },
  { path: "*", element: <Error404 /> },
];
