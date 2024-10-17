import "./Layout.css";
import { Outlet, useLocation } from "react-router-dom";
import { AppNavigation } from "../appNavigation/AppNavigation";

const withoutFooter = ["/profile", "/medications/details/"];

export function Layout() {
  const location = useLocation();

  const showAppNav = !withoutFooter.some((path) =>
    location.pathname.includes(path)
  );
  return (
    <div className="container">
      {showAppNav ? (
        <>
          {" "}
          <div className="panel">
            <div className="sub-panel">
              <Outlet />
            </div>
          </div>
          <AppNavigation />
        </>
      ) : (
        <Outlet />
      )}
    </div>
  );
}
