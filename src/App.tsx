import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import { Layout } from "./components/layout/Layout.tsx";
import Profile from "./pages/profile/Profile";
import Contacts from "./pages/contacts/Contacts.tsx";
import Login from "./pages/login/Login";
import { Therapies } from "./pages/therapies/Therapies.tsx";
import Medication from "./pages/medications/Medication";
import Dashboard from "./pages/Dashboard";

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
    path: "/profile",
    element: <Profile />,
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
        path: "/Therapies",
        element: <Therapies />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
