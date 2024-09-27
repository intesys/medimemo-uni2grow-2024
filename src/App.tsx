import "./App.css";
import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import Login from "./pages/login/Login";

const router = createBrowserRouter([
  {
    path: "/",
    loader: () => redirect("login"),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: <h1>Dashboard</h1>,
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
