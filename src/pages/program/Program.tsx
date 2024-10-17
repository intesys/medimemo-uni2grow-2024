import { useState, useEffect } from "react";
import "./Program.css";
import Header from "../../components/header/Header";
import { Box, Typography, Button, Snackbar } from "@mui/material";
import { AddCircleOutline, Save } from "@mui/icons-material";
import dayjs, { Dayjs } from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";
import { useNavigate, useLocation } from "react-router-dom";
import {IPrescriptionTime} from "../../models/PrescriptionTime"
import { IPrescription } from "../../models/Prescription";

function Program() {
  const navigate = useNavigate();
  const location = useLocation();
  const [medicineName, setMedicineName]= useState<string>("");
  const [prescription, setPrescription] = useState<IPrescription>({
    therapy: "",
    medicine: 1,
    dateFrom: null,
    dateTo: null,
  });

  const [prescriptionTimes, setPrescriptionTimes] = useState<
    IPrescriptionTime[]
  >([
    { id: "", time: null, prescription: "" }, 
  ]);

  const [startDateError, setStartDateError] = useState<string | null>(null);
  const [endDateError, setEndDateError] = useState<string | null>(null);
  const [timeErrors, setTimeErrors] = useState<{ [key: string]: string }>({});
  const [addError, setAddError] = useState<string>("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    setPrescription((prev) => ({
      ...prev,
      therapy: location.state?.idTherapy,
      medicine: location.state?.idMedicine,
    }));
    getMedicineName(location.state?.idMedicine)
  }, []);

  const getMedicineName = async (id:string) =>{
    try{
      const result = await fetch(`http://localhost:3000/medicines/${id}`);
      const data = await result.json();
      setMedicineName(data.name);
    }catch{
      setAddError("Get medicine name failed");
    }
  } 
  
  const handleStartDateChange = (newDate: Dayjs | null) => {
    setPrescription((prev) => ({
      ...prev,
      dateFrom: newDate,
    }));
    if (newDate && prescription.dateTo && newDate > prescription.dateTo) {
      setStartDateError("Start date cannot be after end date");
    } else {
      setEndDateError(null);
      setStartDateError(null);
    }
  };

  const handleEndDateChange = (newDate: Dayjs | null) => {
    setPrescription((prev) => ({
      ...prev,
      dateTo: newDate,
    }));
    if (prescription.dateFrom && newDate && newDate < prescription.dateFrom) {
      setEndDateError("End date cannot be before start date");
    } else {
      setStartDateError(null);
      setEndDateError(null);
    }
  };

  
  const handleTimeChange = (id: string, newTime: Dayjs | null) => {
    const isTimeAlreadySelected = prescriptionTimes.some(
      (timeObj) => timeObj.time?.isSame(newTime, "minute") && timeObj.id !== id
    );

    if (isTimeAlreadySelected) {
      setTimeErrors((prevErrors) => ({
        ...prevErrors,
        [id]: "This time is already selected",
      }));
    } else {
      setPrescriptionTimes((prevTimes) =>
        prevTimes.map((timeObj) =>
          timeObj.id === id ? { ...timeObj, time: newTime } : timeObj
        )
      );
      setTimeErrors((prevErrors) => ({
        ...prevErrors,
        [id]: "",
      }));
    }
  };

  const addReminder = () => {
    const newReminder: IPrescriptionTime = {
      id: String(prescriptionTimes.length) + 1,
      time: null,
    };
    setPrescriptionTimes((prevTimes) => [...prevTimes, newReminder]);
  };

  const areAllFieldsFilled = () => {
    return (
      prescription.dateFrom &&
      prescription.dateTo &&
      prescriptionTimes.every((timeObj) => timeObj.time !== null) &&
      !Object.values(timeErrors).some((error) => error !== "")
    );
  };

  const handleSave = async () => {
    if(areAllFieldsFilled()){
      try {
      const newPrescription = {
        therapy: prescription.therapy,
        medicine: prescription.medicine,
        dateForm: dayjs(prescription.dateFrom).format("MM-DD-YYYY"),
        dateTo: dayjs(prescription.dateTo).format("MM-DD-YYYY"),
      };

      const addPrescriptionResult = await fetch(
        "http://localhost:3000/prescriptions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(newPrescription),
        }
      );

      if (!addPrescriptionResult.ok) {
        setAddError("Add prescription failed");
      } else {
        const addPrescriptionResponse = await addPrescriptionResult.json();

        prescriptionTimes.map(async (item) => {
          const newPrescriptionTime = {
            time: dayjs(item.time).format("hh:mm A"),
            prescription: addPrescriptionResponse.id,
          };
          try {
            const addPrescriptionTimeResult = await fetch(
              "http://localhost:3000/prescriptiontimes",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },

                body: JSON.stringify(newPrescriptionTime),
              }
            );

            if (!addPrescriptionTimeResult.ok) {
              setAddError("Add prescription failed");
            }
          } catch {
            setAddError("Add prescrition time failed");
          }
        });
        navigate(-1);
      }
    } catch (e) {
      setAddError("Add prescription failed");
    }
    } else {
      setError("Another field is required");
    }
  };
  const handleBack = () => {
    navigate(-1);
  } 
  const handleClose = () => {
    setAddError("");
    setError("");
  };

  return (
    <>
      <Header title={medicineName} showBackButton={true} onBackButtonClick={handleBack}/>
      <div className="test-container">
        <div className="program-container">
          <div className="element">
            <Box className="program-container-title">
              What is the duration of the therapy?
            </Box>
            <div className="program-element">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer
                  components={["MobileDatePicker"]}
                  sx={{ width: "100%", justifyContent: "center" }}
                >
                  <div className="programItem">
                    <div className="date">
                      <DemoItem sx={{ width: "100%" }}>
                        <MobileDatePicker
                          sx={{ width: "100%" }}
                          label="Date"
                          value={prescription?.dateFrom}
                          onChange={handleStartDateChange}
                          slotProps={{
                            textField: {
                              error: !!startDateError,
                            },
                          }}
                        />
                      </DemoItem>
                    </div>
                    <div className="date">
                      <DemoItem sx={{ width: "100%" }}>
                        <MobileDatePicker
                          sx={{ width: "100%" }}
                          label="End Date"
                          value={prescription.dateTo}
                          onChange={handleEndDateChange}
                          slotProps={{
                            textField: {
                              error: !!endDateError,
                            },
                          }}
                        />
                      </DemoItem>
                    </div>
                  </div>
                </DemoContainer>
              </LocalizationProvider>
            </div>
          </div>
          <div className="element">
            <Box className="program-container-title">
              How often do you have to take this medicine?
            </Box>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer
                components={["MobileTimePicker"]}
                sx={{ width: "60.3%", justifyContent: "center" }}
              >
                {prescriptionTimes.map((timeObj) => (
                  <div className="time" key={timeObj.id}>
                    <DemoItem sx={{ width: "100%", justifyContent: "center" }}>
                      <MobileTimePicker
                        sx={{ width: "100%" }}
                        label=""
                        value={timeObj.time}
                        onChange={(newTime) =>
                          handleTimeChange(timeObj.id, newTime)
                        }
                        slotProps={{
                          textField: {
                            error: !!timeErrors[timeObj.id],
                          },
                        }}
                      />
                    </DemoItem>
                  </div>
                ))}
              </DemoContainer>
            </LocalizationProvider>
          </div>
          <div className="add-often" onClick={addReminder}>
            <AddCircleOutline />{" "}
            <Typography className="add-often-typography">
              ADD REMINDER
            </Typography>
          </div>
        </div>
        <div className={areAllFieldsFilled()? "program-button-active": "program-button"}>
          <Button
            sx={{
              color: "white",
              width: "100%",
            }}
            onClick={handleSave}
          >
            <Save /> Save{" "}
          </Button>
        </div>
        <Snackbar
          open={!!addError}
          autoHideDuration={5000}
          onClose={handleClose}
          message={addError}
        />
        <Snackbar
          open={!!error}
          autoHideDuration={5000}
          onClose={handleClose}
          message={error}
        />
      </div>
    </>
  );
}

export default Program;
