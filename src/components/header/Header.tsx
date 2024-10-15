import { Button, Typography } from "@mui/material";
import { ArrowBack, MoreVert } from "@mui/icons-material";
import "./Header.css";
import React from "react";

export interface HeaderProps {
  title: string;
  showBackButton?: boolean;
  showRightButton?: boolean;
  RightButton?: React.ReactNode;
  onBackButtonClick?: () => void;
  onRightButtonClick?: (event:React.MouseEvent<HTMLElement>) => void;
}

function Header(props: HeaderProps) {
  return (
    <div className="header">
      <Button
        variant="text"
        color="inherit"
        onClick={props.onBackButtonClick}
        disabled={!props.showBackButton}
      >
        {props.showBackButton && <ArrowBack />}
      </Button>
      <Typography
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: 20,
          minWidth: "100px",
          fontStyle: "normal",
          paddingTop: "0px",
          fontWeight: 700
        }}
      >
        {props.title}
      </Typography>

      <Button
        variant="text"
        color="inherit"
        onClick={props.onRightButtonClick}
        disabled={!props.showRightButton}
      >
        {props.showRightButton && (props.RightButton || <MoreVert />)}
      </Button>
    </div>
  );
}

export default Header;
