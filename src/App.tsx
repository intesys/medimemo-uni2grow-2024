import { Login } from "./pages/Login/Login";
import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";

const routers = createBrowserRouter([
  // {
  //   path: "/dashboard",
  //   element: <Dashboard />,
  // },

  {
    path: "/login",
    element: <Login />,
  },

  {
    path: "/",
    loader: () => redirect("/login"),
  },
]);

function App() {
  return <RouterProvider router={routers} />;
}

export default App;
