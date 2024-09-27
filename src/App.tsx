import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import Dachboard from "./pages/Dachboard";
import Login from "./pages/login/Login";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: <Dachboard />,
  },

  {
    path: "/",
    loader: () => redirect("/login"),
  },
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;