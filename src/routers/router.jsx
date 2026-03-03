import { createBrowserRouter } from "react-router";
import Root from "../Home/Root/Root";
import Home from "../Home/Home";
import AddIftar from "../Home/AddIftar/AddIftar";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path:"/addIftar",
        Component:AddIftar
      }
    ],
  },
]);

export default router;
