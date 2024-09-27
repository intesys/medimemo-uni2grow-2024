import React from "react";
import "../../pages/dashboard/Dashboard.css";
import imag from "../../assets/images/12.png";
import {
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemAvatar,
  Checkbox,
} from "@mui/material";
import icondrugs from "../../assets/icons/pill.png";

const medicines = [
  {
    id: 1,
    time: "07:00",
    name: "Drop SEPT",
    sick: "CONJUNCTIVITIS",
  },
  {
    id: 2,
    time: "12:00",
    name: "TobraDex",
    sick: "CONJUNCTIVITIS",
  },
  {
    id: 3,
    time: "19:00",
    name: "Paracetamol",
    sick: "MUSCLE PAIN",
  },
  {
    id: 4,
    time: "20:00",
    name: "Drop SEPT",
    sick: "CONJUNCTIVITIS",
  },
  {
    id: 5,
    time: "20:00",
    name: "TobraDex",
    sick: "CONJUNCTIVITIS",
  },
];

export function Dashboard() {
  const [checked, setChecked] = React.useState([]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value.id);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value.id);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <div className="medical">

      <div className="header">
        <img src={imag} alt="" style={{padding:20}} />
        <Typography fontWeight={700}>Hi, Francescas!</Typography>
        <Typography>Vos rappels de médicaments pour aujourd'hui !</Typography>
      </div>

      <div className="panel-profile">
        <Typography fontWeight={550}>Lundi 5 août 2024</Typography>

        <List
          className="list"
          dense
          sx={{
            width: "100%",
            maxWidth: 360,
            bgcolor: "background.paper",
          }}
        >
          {medicines.map((medicine) => (
            <ListItem
              sx={{
                bgcolor: "#F4F4F4",
              }}
              key={medicine.id}
              secondaryAction={
                <Checkbox
                  edge="end"
                  onChange={handleToggle(medicine)}
                  checked={checked.includes(medicine.id)}
                  inputProps={{
                    "aria-labelledby": `checkbox-list-secondary-label-${medicine.id}`,
                  }}
                />
              }
              disablePadding
            >
              <ListItemButton
                sx={{
                  borderRadius: 2,
                  "&:hover": {
                    bgcolor: "rgba(0, 0, 0, 0.08)",
                  },
                }}
              >
                <ListItemAvatar>
                  <img alt={medicine.name} src={icondrugs} />
                </ListItemAvatar>
                <ListItemText
                  id={`checkbox-list-secondary-label-${medicine.id}`}
                  primary={medicine.name}
                  secondary={medicine.sick + "  " + medicine.time}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </div>
    </div>
  );
}
