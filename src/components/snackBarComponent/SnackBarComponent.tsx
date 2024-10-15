import { ISnackBar } from "../../models/SnackBar";

import React from "react";

import { Snackbar, Alert } from "@mui/material";

export function SnackBarComponent(props: ISnackBar) {
  return (
    <React.Fragment>
      <Snackbar
        open={props.open}
        onClose={props.close}
        autoHideDuration={3000}
        message={props.message}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={props.close}
          severity={props.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {props.message}
        </Alert>
      </Snackbar>
    </React.Fragment>
  );
}
