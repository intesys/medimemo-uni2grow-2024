import {
  createBrowserRouter,
  redirect,
  RouterProvider
} from "react-router-dom";
import { Layout } from "./components/layout/Layout.tsx";
import Contacts from "./pages/contacts/Contacts.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import Login from "./pages/login/Login";
import { Therapies } from "./pages/therapies/Therapies.tsx";
import AddEditContact from "./pages/addContact/AddEditContact.tsx";
import { ViewContact } from "./pages/viewContacts/ViewContact.tsx";
import Medication from "./pages/medications/Medication.tsx";

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
        path: "/medication",
        element: <Medication />
      },
      {
        path: "/contacts",
        element: <Contacts />
      },
      {
        path: "/addEditContact",
        element: <AddEditContact />
      },
      {
        path: "/addEditContact/:id",
        element: <AddEditContact />
      },
      {
        path: "/viewContact/:id",
        element: <ViewContact />
      },
      {
        path: "/dashboard",
        element: <Dashboard />
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
