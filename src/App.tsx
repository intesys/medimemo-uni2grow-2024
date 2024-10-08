import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import { Layout } from "./components/layout/Layout.tsx";
import Contacts from "./pages/contacts/Contacts.tsx";
import Login from "./pages/login/Login";
import { Therapies } from "./pages/therapies/Therapies.tsx";
import Medication from "./pages/medications/Medication";
import Dashboard from "./pages/Dashboard";
import { AddTherapy } from "./pages/addTherapy/AddTherapy.tsx";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/",
    loader: () => redirect("/login"),
  },
  {
    element: <Layout />,
    children: [
      {
        path: "/contacts",
        element: <Contacts />,
      },
      {
        path: "/medications",
        element: <Medication />,
      },
      {
        path: "/therapies",
        element: <Therapies />,
        children: [
          {
            path: "addtherapy",
            element: <AddTherapy />, // Nested route for adding therapy
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
