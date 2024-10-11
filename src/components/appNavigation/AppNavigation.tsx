import { useEffect, useState } from "react";
import "./AppNavigation.css";
import { useLocation } from "react-router-dom";
import { IconButton, Typography, Button } from "@mui/material";
import { ItemNavigation, dataItem } from "../../utils/navigationData";

export function AppNavigation() {
  const location = useLocation();

  const [activepage, setActivePage] = useState<string>(location.pathname);

  useEffect(() => {
    setActivePage(location.pathname);
  }, [location.pathname]);

  return (
    <div className="menuBot">
      <div className="sub-menuBot">
        {dataItem.map((item: ItemNavigation) => (
          <Button variant="text" color="inherit" sx={{ textTransform: "capitalize" }} href={item.path} key={item.path} >
            <div
              key={item.path}
              className="menuBottomItem"
              onClick={() => setActivePage(item.path)}
            >
              <div
                className={
                  activepage.includes(item.path) ? "iconClickMiddle" : "iconClick"
                }
              >
                <IconButton>
                  <img
                    src={activepage.includes(item.path) ? item.activeIcon : item.icon}
                    alt="Home Health"
                  />
                </IconButton>
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

          </Button>
        ))}
      </div>
    </div>
  );
}
