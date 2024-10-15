import { AlertColor, AlertPropsColorOverrides } from "@mui/material";

export interface ISnackBar {
  open: boolean;
  message: string;
  severity: AlertColor;
  close: () => void;
}
