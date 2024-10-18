import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import { Layout } from "./components/layout/Layout.tsx";
import Login from "./pages/login/Login";
import Therapies from "./pages/therapies/Therapies.tsx";
import AddEditTherapy from "./pages/addEditTherapy/AddEditTherapy.tsx";
import Medications from "./pages/medications/Medications.tsx";
import TherapyDetails from "./pages/therapyDetails/TherapyDetails.tsx";
import Profile from "./pages/profile/Profile";
import Contacts from "./pages/contacts/Contacts.tsx";
import AddEditContact from "./pages/addEditContact/AddEditContact.tsx";
import { DoctorDetails } from "./pages/doctorDetails/DoctorDetails.tsx";
import Program from "./pages/program/Program.tsx";
import DrugSpecifications from "./pages/medications/drugSpecifications/DrugSpecifications.tsx";
import ViewPrescription  from "./pages/viewPrescription/ViewPrescription.tsx";

const router = createBrowserRouter([
  {
    path: "",
    loader: () => redirect("/login"),
  },
  {
    path: "/login",
    element: <Login />,
  },

  {
    path: "/",
    loader: () => redirect("/login"),
  },

  {
    element: <Layout />,
    children: [
      {
        path: "/medications",
        element: <Medications />,
      },
      {
        path: "medications",
        children: [
          {
            path: "",
            element: <Medications />,
          },
          {
            path: ":id",
            element: <DrugSpecifications />,
          },
        ],
      },
      {
        path: "therapies",
        children: [
          {
            path: "",
            element: <Therapies />,
          },
          {
            path: "edit",
            children: [
              {
                path: "",
                element: <AddEditTherapy />,
              },
              {
                path: "program",
                children:[
                  {
                    path: "",
                    element: <Program />,
                  },
                  {
                    path:"view",
                    element: <ViewPrescription />
                  }
                ]
                
              },
            ],
          },
          {
            path: "add",
            children: [
              {
                path: "",
                element: <AddEditTherapy />,
              },
              {
                path: "program",
                element: <Program />,
              },
            ],
          },
          {
            path: "details",
            element: <TherapyDetails />,
          },
        ],
      },
      {
        path: "contacts",
        children: [
          {
            path: "",
            element: <Contacts />,
          },
          {
            path: "edit",
            element: <AddEditContact />,
          },
          {
            path: "add",
            element: <AddEditContact />,
          },
          {
            path: "details",
            element: <DoctorDetails />,
          },
        ],
      },
      {
        path: "/profile",
        element: <Profile />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
