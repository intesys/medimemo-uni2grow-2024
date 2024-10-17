import { useEffect, useState } from "react";
import "./AppNavigation.css";
import { useLocation, useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";
import { ItemNavigation, dataItem } from "../../utils/navigationData";

export function AppNavigation() {
  const navigate = useNavigate();
  const location = useLocation();

  const [activepage, setActivePage] = useState<string>(location.pathname);

  useEffect(() => {
    setActivePage(location.pathname);
  }, [location.pathname]);

  const handleNavigate = (path: string) => {
    setActivePage(path);
    navigate(path);
  };

  return (
    <div className="menuBot">
      <div className="sub-menuBot">
        {dataItem.map((item: ItemNavigation) => (
          <div
            className="button-element"
            color="inherit"
            onClick={() => handleNavigate(item.path)}
            key={item.path}
          >
            <div key={item.path} className="menuBottomItem">
              <div
                className={
                  activepage.includes(item.path)
                    ? "iconClickMiddle"
                    : "iconClick"
                }
              >
                <img
                  src={
                    activepage.includes(item.path) ? item.activeIcon : item.icon
                  }
                  alt="Home Health"
                />
              </div>
              <Typography
                className={
                  activepage.includes(item.path)
                    ? "menuBotIconName-over"
                    : "menuBotIconName"
                }
              >
                {item.name}
              </Typography>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
