import React from "react";
import { createBrowserRouter, RouterProvider, redirect } from "react-router-dom";
import Login from "./pages/login/Login";
import { Dashboard } from "./pages/dashboard/dashboard";

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
  }
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
