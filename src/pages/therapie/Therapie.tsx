import React from "react";
import "./therapie.css";
import { Typography, Button, InputAdornment } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import EditNoteIcon from "@mui/icons-material/EditNote";
import ContactsIcon  from "@mui/icons-material/Contacts";
import AddHomeIcon from "@mui/icons-material/AddHome";
import AddCircleIcon from "@mui/icons-material/AddCircle";

export function Therapie() {
  return (
    <div className="container">
      <div className="container-therapie">
        <div className="header">
          <Typography>My Therapies</Typography>
        </div>
        <div className="panel">
          <div className="element">
            <Typography sx={{ width: 240 }}>Conjonctivite</Typography>
            <ArrowForwardIosIcon />
          </div>
          <div className="element">
            <Typography sx={{ width: 240 }}>Muscle pain</Typography>
            <ArrowForwardIosIcon />
          </div>
          
        </div>

        <div className="footer-therapie">
          <div className="add-button">
            <AddCircleIcon sx={{color:"#F00", fontSize:50}}/>
          </div>
          <div className="end">
            <div className="nav">
              <Button>
                <AddHomeIcon sx={{color:"white"}}/>
              </Button>
              <label htmlFor="">BlaBla</label>
            </div>
            <div className="nav">
              <Button sx={{borderRaduis:10}}>
                <EditNoteIcon sx={{color:"white"}}/>
              </Button>
              <label htmlFor="">BlaBla</label>
            </div>
            <div className="nav">
              <Button>
                <ContactsIcon sx={{color:"white"}}/>
              </Button>
              <label htmlFor="">BlaBla</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
