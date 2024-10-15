import "./Medications.css";
import List from "@mui/material/List";
import logo from "../../assets/images/avatar.svg";
import Avatar from "@mui/material/Avatar";
import { Typography, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import { IDose } from "../../models/Dose";
import ShowDose from "../../components/dose/ShowDose";
import { useNavigate } from "react-router-dom";

function Medications() {
  const navigate = useNavigate();
  const [medications, setMedications] = useState<IDose[]>([]);
  const [checked, setChecked] = useState<IDose[]>(medications);
  const [error, setError] = useState<string>("");
  const [errorUpdate, setErrorUpdate] = useState<string>("");

  const getMedication = async (): Promise<void> => {
    try {
      setError("");
      const response = await fetch("http://localhost:3000/doses");
      const data = await response.json();
      setMedications(data);
    } catch {
      setError("Failed to load medications");
    }
  };

  useEffect(() => {
    getMedication();
  }, []);

  const handleClick = (medication: IDose) => {
    handleToggle(medication);
  };

  const handleToggle = async (medication: IDose) => {
    try {
      const dose: IDose = { ...medication };
      dose.taken = !dose.taken
      const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dose)
      };
      setErrorUpdate("");
      const result = await fetch("http://localhost:3000/doses/" + dose.id, requestOptions);
      if (result.ok) {
        medication.taken = !medication.taken;
        const currentIndex = checked.findIndex((x) => x.id === medication.id);
        const newChecked = [...checked];
        if (currentIndex === -1) {
          newChecked.push(medication);
        } else {
          newChecked.splice(currentIndex, 1);
        }
        setChecked(newChecked);
      }
    } catch {
      setErrorUpdate("Failed to update medication");
    }
  }

  function emptyDoses(doses: IDose[]): boolean {
    return doses.length === 0;
  }
  function isNull(error: string): boolean {
    return error === "";
  }

  const printDate = () => {
    const dateObj = new Date();
    return dateObj.toLocaleDateString("en-UK", { dateStyle: "full" });
  }

  return (
    <div className="medications-container">
      <div className="head-container">
        <IconButton onClick={() => navigate("/profile")}>
        <Avatar src={logo} alt="Avatar" sx={{ width: 75, height: 75 }} />
        </IconButton>
        <div className="title">
          <Typography variant="h6">Hi, Francesca</Typography>
          <Typography variant="subtitle1">Your Medicines Reminders for today!</Typography>
        </div>
      </div>
      <div className="seond-container">
        <Typography variant="h6" sx={{ mx: "20px", mt: "20px" }}>{printDate()}</Typography>

        <div className="all-list">
          {!isNull(error) ? (
            <Typography sx={{ color: "red" }}>{error}</Typography>
          ) : emptyDoses(medications) ? (
            <div className="empty-doses">
              <Typography sx={{ margin: "20px" }}>No Doses available</Typography>
            </div>
          ) : (
            <List
              disablePadding
              dense
              sx={{
                mx: "20px",
                mb: "20px",
                display: "flex",
                flexDirection: "column",
                gap: "25px",
              }}
            >
              {errorUpdate && <Typography color="error">{errorUpdate}</Typography>}
              {medications.filter((item) => item.taken).length != 0 && <div className="sub-list">
                {medications.filter((item) => item.taken).map((item) => {
                  return (
                    <ShowDose handleToggle={handleToggle} item={item} key={item.id} handleClick={handleClick} />
                  )
                })}
              </div>}
              {medications.filter((item) => !item.taken).length != 0 && <div className="sub-list">
                {medications.filter((item) => !item.taken).map((item) => {
                  return (
                    <ShowDose handleToggle={handleToggle} item={item} key={item.id} handleClick={handleClick} />
                  );
                })}
              </div>
              }
            </List>)}
        </div>
      </div>
    </div>
  );
}

export default Medications;
