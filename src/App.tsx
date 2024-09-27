import {
  createBrowserRouter,
  RouterProvider,
  redirect,
} from "react-router-dom";

import { Login } from "./pages/login/Login";
// import { Dashboard } from "./routes/Dashboard";
import { Profil } from "./pages/profile/Profil";
// import { Medications } from "./routes/Medications";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login/>,
  },

  // {
  //   path: "/dashboard",
  //   element: <Dashboard/>,
  // },

  {
    path: "/",
    loader: () => redirect("/login"),
  },

  // profile page
  {
    path: "/profil",
    element: <Profil/>
  },

  // // Medications page
  // {
  //   path: "/medications",
  //   element: <Medications/>
  // },
]);

export function App() {
  return <RouterProvider router={router} />;
}
