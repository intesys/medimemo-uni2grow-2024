import React from "react";
import { createBrowserRouter, RouterProvider, redirect } from "react-router-dom";
import Login from "./pages/login/Login";
import { Dashboard } from "./pages/dashboard/Dashboard";
import { Therapie } from "./pages/therapie/Therapie";

const router = createBrowserRouter([
  {
    path: "/",
    loader: () => redirect('/login'),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/therapie",
    element: <Therapie />,
  }
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
