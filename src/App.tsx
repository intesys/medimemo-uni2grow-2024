import React from "react";
import { Login } from "./pages/login/Login.tsx";
import { Dashboard } from "./pages/dashboard/Dashboard.tsx";
import { Profile } from "./pages/profile/Profile.tsx";

import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/Dashboard",
    element: <Dashboard />,
  },
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },

  {
    path: "/Profile",
    element: <Profile />,
  },
]);

export function App(): JSX.Element {
  return <RouterProvider router={router} />;
}
