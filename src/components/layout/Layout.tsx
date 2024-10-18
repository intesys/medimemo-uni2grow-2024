import "./Layout.css";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { AppNavigation } from "../appNavigation/AppNavigation";
import { LOGGED } from "../../utils/Constants";

const withoutFooter = ["/profile", "/medications/details/"];

export function Layout() {
  const location = useLocation();

  const showAppNav = !withoutFooter.some((path) =>
    location.pathname.includes(path)
  );

  const isLogged: boolean = Boolean(localStorage.getItem(LOGGED));

  return (
    <div className="container">
      {showAppNav ? (
        <>
          {" "}
          <div className="panel">
            <div className="sub-panel">
              {isLogged ? <Outlet /> : <Navigate to="/login" />}
            </div>
          </div>
          <AppNavigation />
        </>
      ) : isLogged ? (
        <Outlet />
      ) : (
        <Navigate to="/login" />
      )}
    </div>
  );
}
