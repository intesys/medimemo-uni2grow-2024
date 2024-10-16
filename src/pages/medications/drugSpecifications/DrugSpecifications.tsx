import { useNavigate, useParams } from "react-router-dom";
import FileSave from "../../../assets/images/medications/drug/file_save.svg";
import Header from "../../../components/header/Header";
import "./drug.css";
import Button from "@mui/material/Button";
import {
  Collapse,
  List,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { IDrug } from "../../../models/Drug";
import { IPrescription } from "../../../models/Prescription";
import { IMedicine } from "../../../models/Medicine";
import { SnackBarComponent } from "../../../components/snackBarComponent/SnackBarComponent";

function DrugSpecifications() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [drug, setDrug] = useState<IDrug>({
    dosage: "",
    methodOfAdministraion: "",
    contraindications: "",
    warning: "",
    sideEffects: "",
    interactions: "",
    storage: "",
  });
  const [medication, setMedication] = useState<IMedicine>();
  const [openItems, setOpenItems] = useState<{ [key: string]: boolean }>({});
  const [error, setError] = useState<string>("");
  const openSnack: boolean = error != "";

  const getDrugSpecifications = async (): Promise<void> => {
    try {
      setError("");
      const result = await fetch(`http://localhost:3000/prescriptions/${id}`);
      const prescription: IPrescription = await result.json();
      const response = await fetch(
        `http://localhost:3000/medicines/${prescription.id}`
      );
      const medicine: IMedicine = await response.json();
      setMedication(medicine);
      const specif: IDrug = {
        dosage: medicine.dosage ?? "",
        methodOfAdministraion: medicine.methodOfAdministraion ?? "",
        contraindications: medicine.contraindications ?? "",
        warning: medicine.warning ?? "",
        sideEffects: medicine.sideEffects ?? "",
        interactions: medicine.interactions ?? "",
        storage: medicine.storage ?? "",
      };
      setDrug(specif);
    } catch {
      setError("Error fetching drug specifications!!!");
    }
  };

  useEffect(() => {
    getDrugSpecifications();
  }, []);

  const handleClick = (key: string) => {
    setOpenItems((prevOpenItems) => ({
      ...prevOpenItems,
      [key]: !prevOpenItems[key],
    }));
  };
  return (
    <div className="drug-container">
      <Header
        title="DROP Sept"
        showBackButton={true}
        onBackButtonClick={() => navigate(-1)}
      />
      <div className="drug-secondary">
        {error && (
          <SnackBarComponent
            message={error}
            severity="error"
            key={error}
            open={openSnack}
            close={() => {setError("")}}
          />
        )}
        <div className="drug-title">
          <Button
            variant="text"
            sx={{ bgcolor: "#F00", px: "20px", py: "10px" }}
          >
            <img src={FileSave} alt="File Save" />
            <Typography
              color="initial"
              sx={{
                textTransform: "none",
                color: "#fff",
                fontWeight: "600",
                fontSize: "16px",
                lineHeight: "20px",
              }}
            >
              &nbsp;Information leaflet
            </Typography>
          </Button>
          <Typography
            color="initial"
            sx={{
              textTransform: "none",
              fontWeight: "400",
              fontSize: "16px",
              lineHeight: "25px",
            }}
          >
            {medication?.description}
          </Typography>
        </div>
        <List
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          {Object.entries(drug).map(([key, value]) => (
            <div key={key} className="drug-element">
              <ListItemButton onClick={() => handleClick(key)}>
                <ListItemText
                  disableTypography
                  primary={key}
                  sx={{
                    fontFamily: "sans-serif",
                    textTransform: "capitalize",
                    display: "flex",
                    justifyContent: "space-arround",
                    alignItems: "center",
                    flex: 1,
                  }}
                />
                {openItems[key] ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={openItems[key]} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemText
                      primary={value
                        .split("\n")
                        .map((line: string, index: React.Key) => (
                          <React.Fragment key={index}>
                            {line}
                            <br />
                          </React.Fragment>
                        ))}
                    />
                  </ListItemButton>
                </List>
              </Collapse>
            </div>
          ))}
        </List>
      </div>
    </div>
  );
}

export default DrugSpecifications;
