import "./AddTherapy.css";
import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SaveIcon from "@mui/icons-material/Save";
import { useEffect, useState } from "react";
import { IMedecines } from "../../models/Medecines";
import { IContact } from "../../models/Contact"; // Newly created interface
import { SelectChangeEvent } from "@mui/material";
import { useNavigate } from "react-router-dom";
import LoadingButton from "@mui/lab/LoadingButton";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CancelIcon from "@mui/icons-material/Cancel";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export function AddTherapy() {
  const [medecines, setMedecines] = useState<IMedecines[]>([]);
  const [selectedMedecines, setSelectedMedecines] = useState<string[]>([]);
  const [contacts, setContacts] = useState<IContact[]>([]);
  const [selectedContacts, setSelectedContacts] = useState<string[]>([]); // For doctors
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  /////////////////////////////////////////
  // For notes field
  const [notes, setNotes] = useState<string>("");

  /////////////////////////////////////////////

  // Regarding the therapy name
  const [therapyName, setTherapyName] = useState<string>("");
  // Handle clearing the therapy name when CancelIcon is clicked
  const handleClearTherapyName = () => {
    setTherapyName("");
  };

  // Handle back button click
  const handleClick = () => {
    navigate("/therapies");
  };

  // Fetch medicines and contacts from db.json
  useEffect(() => {
    fetch("http://localhost:3000/medicines")
      .then((response) => {
        if (!response.ok) throw new Error("Error fetching medicines");
        return response.json();
      })
      .then((data) => setMedecines(data))
      .catch((error) => {
        setError("Error fetching medicines");
        console.error(error);
      });

    fetch("http://localhost:3000/contacts")
      .then((response) => {
        if (!response.ok) throw new Error("Error fetching contacts");
        return response.json();
      })
      .then((data) => setContacts(data))
      .catch((error) => {
        setError("Error fetching contacts");
        console.error(error);
      });
  }, []);

  // Handle change for multiple select of medicines
  const handleMedicineChange = (
    event: SelectChangeEvent<typeof selectedMedecines>
  ) => {
    const {
      target: { value },
    } = event;
    setSelectedMedecines(typeof value === "string" ? value.split(",") : value);
  };

  // Handle change for multiple select of contacts (doctors)
  const handleContactChange = (
    event: SelectChangeEvent<typeof selectedContacts>
  ) => {
    const {
      target: { value },
    } = event;
    setSelectedContacts(typeof value === "string" ? value.split(",") : value);
  };

  // State to track whether the right icon is clicked
  const [isClicked, setIsClicked] = useState(false);

  // Toggle click state on ArrowIosIcon
  const handleIconClick = () => {
    setIsClicked(!isClicked); // Toggle the state
  };

  // Fetch medicines and contacts
  useEffect(() => {
    fetch("http://localhost:3000/medicines")
      .then((response) => response.json())
      .then((data) => setMedecines(data))
      .catch(() => setError("Error fetching medicines"));

    fetch("http://localhost:3000/contacts")
      .then((response) => response.json())
      .then((data) => setContacts(data))
      .catch(() => setError("Error fetching contacts"));
  }, []);
  {
    /* Display error message */
  }
  {
    error && (
      <Typography color="error" sx={{ marginBottom: 2 }}>
        {error}
      </Typography>
    );
  }
  // Handle therapy submission
  const handleSaveTherapy = async () => {
    setLoading(true);
    try {
      const newTherapy = {
        name: therapyName,
        userId: 1, // This could be the logged-in user
        contact: selectedContacts[0], // Assuming the first selected doctor
        notes: notes,
      };

      const response = await fetch("http://localhost:3000/therapies", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTherapy),
      });

      if (!response.ok) {
        throw new Error("Failed to save therapy");
      }

      // Redirect back to the therapies page
      navigate("/therapies");
    } catch (error) {
      setError("Error saving therapy");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="panell">
        <div className="bodyy">
          <div className="headerr">
            <IconButton onClick={handleClick}>
              <ArrowBackIcon />
            </IconButton>
          </div>

          {/* Conditionally render based on selectedMedecines */}
          {!selectedMedecines.length ? (
            // Render First Frame
            <div className="content">
              <div className="newTherapy">
                <Typography sx={{ fontWeight: 700, marginBottom: 1 }}>
                  New therapy
                </Typography>
                <TextField
                  id="outlined-basic"
                  label="Therapy name"
                  variant="outlined"
                  value={therapyName}
                  onChange={(e) => setTherapyName(e.target.value)}
                  sx={{ width: "100%" }}
                />
              </div>

              {/* Select Medications */}
              <div className="selectZone">
                <Typography sx={{ fontWeight: 700 }}>
                  Select one or more medicines
                </Typography>
                <FormControl sx={{ m: 1, width: "100%" }}>
                  <InputLabel id="medecines-multiple-checkbox-label">
                    Medecines
                  </InputLabel>
                  <Select
                    labelId="medecines-multiple-checkbox-label"
                    id="medecines-multiple-checkbox"
                    multiple
                    value={selectedMedecines}
                    onChange={handleMedicineChange}
                    input={<OutlinedInput label="Medecines" />}
                    renderValue={(selected) => selected.join(", ")}
                    MenuProps={MenuProps}
                  >
                    {medecines.map((medecine) => (
                      <MenuItem key={medecine.id} value={medecine.name}>
                        <ListItemText primary={medecine.name} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
            </div>
          ) : (
            // Render Second Frame after a medication is selected
            <div className="content">
              <div className="newTherapy">
                <Typography sx={{ fontWeight: 700, marginBottom: 1 }}>
                  New therapy
                </Typography>
                <TextField
                  id="outlined-basic"
                  label="Therapy name"
                  variant="outlined"
                  sx={{ width: "100%" }}
                  value={therapyName}
                  onChange={(e) => setTherapyName(e.target.value)} // Update the therapy name
                  InputProps={{
                    endAdornment: therapyName && (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleClearTherapyName}
                          sx={{ color: "red" }}
                        >
                          <CancelIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </div>

              {/* Display Selected Medicines */}
              {selectedMedecines.map((medName, index) => (
                <div className="selectZone" key={index}>
                  <div className="med">
                    <Stack
                      spacing={2}
                      direction={"row"}
                      justifyItems={"center"}
                      position={"relative"}
                    >
                      <Typography sx={{ fontWeight: 700 }}>
                        {medName}
                      </Typography>
                      <IconButton
                        onClick={handleIconClick}
                        sx={{
                          position: "absolute",
                          top: 0,
                          right: 0,
                          transition: "transform 0.3s ease-in-out", // Smooth rotation
                          transform: isClicked
                            ? "rotate(90deg)"
                            : "rotate(0deg)", // Rotate on click
                        }}
                      >
                        <ArrowForwardIosIcon />
                      </IconButton>
                    </Stack>

                    <Stack
                      spacing={2}
                      direction="row"
                      paddingTop={2}
                      paddingBottom={2}
                      justifyContent={"center"}
                    >
                      <Button
                        variant="contained"
                        color="error"
                        fullWidth
                        onClick={() => {
                          setSelectedMedecines((prevMedecines) =>
                            prevMedecines.filter((med) => med !== medName)
                          );
                        }}
                      >
                        REMOVE
                      </Button>
                      <Button variant="contained" color="error" fullWidth>
                        ADD PROGRAM
                      </Button>
                    </Stack>
                  </div>
                </div>
              ))}

              {/* Add Another Medication */}
              <div className="selectZone">
                <Typography sx={{ fontWeight: 700 }}>
                  Add another medication
                </Typography>
                <FormControl sx={{ m: 1, width: "100%" }}>
                  <InputLabel id="add-medicine-label">
                    Search here your medication
                  </InputLabel>
                  <Select
                    labelId="add-medicine-label"
                    multiple
                    value={selectedMedecines}
                    onChange={handleMedicineChange}
                    input={
                      <OutlinedInput label="Search here your medication" />
                    }
                    renderValue={(selected) => selected.join(", ")}
                    MenuProps={MenuProps}
                  >
                    {medecines.map((medecine) => (
                      <MenuItem key={medecine.id} value={medecine.name}>
                        <ListItemText primary={medecine.name} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>

              {/* Select a Doctor */}
              <div className="selectZone">
                <Typography sx={{ fontWeight: 700 }}>
                  Select a doctor
                </Typography>
                <FormControl sx={{ m: 1, width: "100%" }}>
                  <InputLabel id="contacts-multiple-checkbox-label">
                    Select a doctor
                  </InputLabel>
                  <Select
                    labelId="contacts-multiple-checkbox-label"
                    id="contacts-multiple-checkbox"
                    value={selectedContacts}
                    onChange={handleContactChange}
                    input={<OutlinedInput label="Select a doctors" />}
                    renderValue={(selected) => selected.join(", ")}
                    MenuProps={MenuProps}
                  >
                    {contacts.map((contact) => (
                      <MenuItem key={contact.id} value={contact.name}>
                        <ListItemText primary={contact.name} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>

              {/* Notes */}
              <TextField
                id="outlined-multiline-static"
                label="Notes"
                defaultValue={"Write your notes here"}
                multiline
                rows={3}
                onChange={(e) => setNotes(e.target.value)}
                sx={{ width: "100%" }}
              />
            </div>
          )}

          {error && <Typography color="error">{error}</Typography>}

          <div className="saveButton">
            <div className="button">
              <LoadingButton
                size="small"
                color="error"
                onClick={handleSaveTherapy}
                loading={loading}
                loadingPosition="center"
                startIcon={<SaveIcon />}
                variant="contained"
                sx={{
                  width: "100%",
                  justifyContent: "center",
                  paddingTop: "25px",
                  borderRadius: "10px",
                }}
              >
                Save
              </LoadingButton>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
