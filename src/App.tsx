import React from "react";
import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import Login from "./Pages/Login/Login";
import Dashboard  from "./Pages/Dashboard/Dashboard";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/Login",
      element: <Login />,
    },
    {
      path: "/Dashboard",
      element: <Dashboard />,
    },
    {
      path: "/",
      loader: () => redirect("Login"),
    },
  ]);
  return <RouterProvider router={router} />;
}
