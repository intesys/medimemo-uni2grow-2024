import { Login } from "./pages/login/Login";
import { Dashboard } from "./pages/dashbord/Dashboard";
import {
  BrowserRouter as router,
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";

const routers = createBrowserRouter([
  {
    element: <Login />,
    path: "/login",
  },
  {
    element: <Dashboard />,
    path: "/dashboard",
  },
  {
    path: "/",
    loader: () => redirect("/login"),
  },
]);

function App() {
  return <RouterProvider router={routers} />;
}

export default App;
