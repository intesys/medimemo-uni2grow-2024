import {
  createBrowserRouter,
  redirect,
  RouterProvider
} from "react-router-dom";
import { Layout } from "./components/layout/Layout.tsx";
import Contacts from "./pages/contacts/Contacts.tsx";
import AddEditContact from "./pages/addContact/AddEditContact.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import Login from "./pages/login/Login";
import { Therapies } from "./pages/therapies/Therapies.tsx";
import Medication from "./pages/medications/Medication";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/dashboard",
    element: <Dashboard />
  },

  {
    path: "/",
    loader: () => redirect("/login")
  },

  {
    element: <Layout />,
    children: [
      {
        path: "/contacts",
        element: <Contacts />
      },

      {
        path: "/dashboard",
        element: <Dashboard />
      },
      {
        path: "/addEditContact",
        element: <AddEditContact />
      },
      {
        path: "/medications",
        element: <Medication />
      },
      {
        path: "/Therapies",
        element: <Therapies />
      }
    ]
  }
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
