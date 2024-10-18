import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

function ModalPrescription() {
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    console.log(selectedDate);
    setOpen(false);
  };

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Sélectionner une date
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Quelle est la durée de la thérapie ?</DialogTitle>
        <DialogContent>
          <Calendar
            onChange={()=>handleDateChange}
            value={selectedDate}
            locale="fr" // Pour définir la langue en français
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Annuler</Button>
          <Button onClick={handleClose}>OK</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ModalPrescription;
