import React, { useState } from "react";
import "./Program.css";
import Header from "../../components/header/Header";
import { Box, TextField, Typography, Modal } from "@mui/material";
import { AddCircleOutline } from "@mui/icons-material";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";

function Program() {
  return (
    <>
      <Header title="DROP SEPT" showBackButton={true} />
      <div className="program-container">
        <div className="element">
          <Box className="program-container-title">
            What is the duration of the theraphy?
          </Box>
          <Box className="program-element">
            <LocalizationProvider dateAdapter={AdapterDayjs} >
              <DemoContainer components={["MobileDatePicker"]}>
                <DemoItem >
                  <MobileDatePicker defaultValue={dayjs("2022-04-17")} />
                </DemoItem>
              </DemoContainer>
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["MobileDatePicker"]}>
                <DemoItem >
                  <MobileDatePicker defaultValue={dayjs("2022-04-17")} />
                </DemoItem>
              </DemoContainer>
            </LocalizationProvider>
          </Box>
        </div>
        <div className="element">
          <Box className="program-container-title">
            How often do you have to take this medecine?
          </Box>
          <Box >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["MobileTimePicker"]}>
                <DemoItem >
                  <MobileTimePicker defaultValue={dayjs("2022-04-17T15:30")} />
                </DemoItem>
              </DemoContainer>
            </LocalizationProvider>
          </Box>
        </div>
        <div className="add-often">
          <AddCircleOutline />{" "}
          <Typography className="add-often-typography">ADD REMINDER</Typography>
        </div>
      </div>
    </>
  );
}

export default Program;
