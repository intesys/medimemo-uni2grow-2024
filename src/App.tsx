import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import {Login } from "./pages/login/Login";
import  Dashboard  from "./pages/dashboard/Dashboard";

const router = createBrowserRouter([
  { path: "/login", 
    element: <Login /> },
  { path: "/dashboard", 
    element: <Dashboard /> },
  {
    path: "/",
    loader: () => redirect("/login"),
  },
]);

function App() {
  return <RouterProvider router={router} />;
}
export default App;
