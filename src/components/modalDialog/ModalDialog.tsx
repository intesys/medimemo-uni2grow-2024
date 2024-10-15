import React from "react";
import {
  Button,
  Dialog,
  DialogContentText,
  DialogTitle,
  DialogActions,
  DialogContent,
  Typography
} from "@mui/material";


import { IModalDialog } from "../../models/DialogModal";
import "../../components/modalDialog/ModalDialog.css";

function ModalDialog(props: IModalDialog) {
  return (
    <React.Fragment>
      <Dialog
        open={props.open}
        onClose={props.onDisagree}
        aria-labelledby="responsive-dialog-title"
        PaperProps={{
          sx: {
            borderRadius: "25px",
            bgcolor: "#f8f4f4",
          }
        }}
      >
       
        {props.icon && <div className="modalIcon"> {props.icon} </div>}


        {props.title && (
          <DialogTitle id="responsive-dialog-title">
            <Typography textAlign={"center"} fontSize={30} fontWeight={700}>
              {" "}
              {props.title}{" "}
            </Typography>
          </DialogTitle>
        )}

        <DialogContent>
          
          {props.content && (
            <DialogContentText id="alert-dialog-description">
              {props.content}
            </DialogContentText>
          )}
        </DialogContent>
        <DialogActions
          sx={{
            display: "flex",
            justifyContent: "end",
            alignItems: "end",
    
            margin: 0,
            paddingRight : 5,
            paddingBottom: 2
          }}
        >
          {props.disagreeIcon && (
            <Button
              sx={{
                color: "black",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 1.5
              }}
              onClick={props.onDisagree}
              autoFocus
            >
              {props.disagreeIcon}

              {props.disagreeMessage}
            </Button>
          )}

          {!props.disagreeIcon && (
            <Button
              sx={{ color: "black" }}
              onClick={props.onDisagree}
              autoFocus
            >
              {props.disagreeMessage}
            </Button>
          )}
          {props.agreeIcon && props.agreeMessage && (
            <Button
              sx={{
                color: "red",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 1.5
              }}
              onClick={props.onAgree}
              autoFocus
            >
              {props.agreeIcon}
              {props.agreeMessage}
            </Button>
          )}

          {!props.agreeIcon && !props.agreeMessage && (
            <Button sx={{ color: "red" }} onClick={props.onAgree} autoFocus>
              {props.agreeMessage}
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default ModalDialog;
