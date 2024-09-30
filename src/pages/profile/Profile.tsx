import React from "react";
import "../../pages/profile/Profile.css";
import { useState } from "react";

import InputAdornment from "@mui/material/InputAdornment";

import TextField from "@mui/material/TextField";

import { Typography, Button, CircularProgress } from "@mui/material";
import universal from "../../assets/icons/universal_currency.png";
import allergies from "../../assets/icons/allergies.png";
import mail from "../../assets/icons/mail.png";
import phone from "../../assets/icons/call.png";
import home from "../../assets/icons/home.png";
import profil from "../../assets/images/12.png";
import edit from "../../assets/icons/edit.png";
import retour from "../../assets/icons/arrow_left_alt.png";
import cancelIcon from "../../assets/icons/cancel.png";

export function Profile() {
  const [editMode, setEditMode] = useState(false);

  const getTextFieldStyles = () => ({
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: editMode ? "red" : "",
        borderWidth: editMode ? 2 : 1,
      },
    },
  });

  return (
    <div className="profil">
      <div className="head">
        <img src={retour} />
        <Typography fontWeight={700}>My profile</Typography>

        {editMode ? (
          <Button onClick={() => setEditMode(false)}></Button>
        ) : (
          <img src={edit} alt="" onClick={() => setEditMode(true)} />
        )}
      </div>

      <div className="panelProfil">
        <div className="layout">
          <img src={profil} alt="" />
          <Typography fontWeight={700}> Francesca Greco</Typography>
        </div>

        <div className="texfield">
          <TextField
            value={editMode ? "GRCFNCXX" : "GRCFNCXXXXXXXXXX"}
            fullWidth
            margin="normal"
            label={
              editMode ? (
                <Typography sx={{ color: "#f00" }}>MEDICAL ID</Typography>
              ) : (
                "MEDICAL ID"
              )
            }
            id="outlined-start-adornment"
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <img src={universal} alt="" />
                  </InputAdornment>
                ),
                endAdornment: editMode && (
                  <InputAdornment position="end">
                    <img src={cancelIcon} alt="" />
                  </InputAdornment>
                ),
              },
            }}
            sx={getTextFieldStyles}
          />
          <TextField
            defaultValue="No allergies"
            margin="normal"
            fullWidth
            id="outlined-start-adornment"
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <img src={allergies} alt="" />
                  </InputAdornment>
                ),
                endAdornment: editMode && (
                  <InputAdornment position="end">
                    <img src={cancelIcon} alt="" />
                  </InputAdornment>
                ),
              },
            }}
            sx={getTextFieldStyles}
          />
          <TextField
            defaultValue="(555)123-4567"
            margin="normal"
            fullWidth
            id="outlined-start-adornment"
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <img src={phone} alt="" />
                  </InputAdornment>
                ),
                endAdornment: editMode && (
                  <InputAdornment position="end">
                    <img src={cancelIcon} alt="" />
                  </InputAdornment>
                ),
              },
            }}
            sx={getTextFieldStyles}
          />
          <TextField
            defaultValue="francescagreco@example.com"
            margin="normal"
            fullWidth
            id="outlined-start-adornment"
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <img src={mail} alt="" />
                  </InputAdornment>
                ),
                endAdornment: editMode && (
                  <InputAdornment position="end">
                    <img src={cancelIcon} alt="" />
                  </InputAdornment>
                ),
              },
            }}
            sx={getTextFieldStyles}
          />
          <TextField
            defaultValue="123 Vision Lane, Suite 200, city ville, ST12345"
            margin="normal"
            fullWidth
            id="outlined-start-adornment"
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <img src={home} alt="" />
                  </InputAdornment>
                ),
                endAdornment: editMode && (
                  <InputAdornment position="end">
                    <img src={cancelIcon} alt="" />
                  </InputAdornment>
                ),
              },
            }}
            sx={getTextFieldStyles}
          />
          <Button
            className="save"
            variant="contained"
            disableElevation
            fullWidth
            //   disabled={loading}
            color="error"
            sx={{ backgroundColor: "#F00", margin: "normal" }}
            type="submit"
            startIcon={<CircularProgress size={20} />}
            onClick={() => {
              if (editMode) {
                setEditMode(false);
              }
            }}
          >
            {editMode ? "SAVE" : "LOGOUT"}
          </Button>
          <Typography sx={{ color: "#F00" }}></Typography>
        </div>
      </div>
    </div>
  );
}



