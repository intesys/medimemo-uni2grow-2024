import "./Program.css";
import Header from "../../components/header/Header";
import { Box, TextField, Typography } from "@mui/material";
import {AddCircleOutline} from "@mui/icons-material";

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
            <TextField className="program-start" label="Date" fullWidth>
              <Box className="program-date-content">
                <Typography className="program-date-content-typography"></Typography>
              </Box>
            </TextField>
            <TextField className="program-start" label="End Date" fullWidth>
              <Box className="program-date-content">
                <Typography className="program-date-content-typography">
                  End Date
                </Typography>
              </Box>
            </TextField>
          </Box>
        </div>
        <div className="element">
          <Box className="program-container-title">
            How often do you have to take this medecine?
          </Box>
          <Box className="program-often" >
            <Typography className="program-often-typography">hh:mm</Typography>
          </Box>
        </div>
        <div className="add-often">
          <AddCircleOutline/> <Typography className="add-often-typography">ADD REMINDER</Typography>
        </div>
      </div>
    </>
  );
}

export default Program;
