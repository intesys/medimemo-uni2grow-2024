import { ChangeEvent, useState, useEffect, FormEvent } from "react";
import {
  TextField,
  Button,
  Alert,
  Box,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  SelectChangeEvent,
  Snackbar,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useNavigate, useLocation } from "react-router-dom";
import "./AddEditTherapy.css";
import {
  formError,
  validationTherapy,
  ITherapy,
  therapyForm,
  formValues,
} from "../../utils/Validation";
import Header from "../../components/header/Header";
import { IMedecine } from "../../models/Medecine";
import { IContact } from "../../models/Contact";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

import InputAdornment from "@mui/material/InputAdornment";
import { IPrescription } from "../../models/Prescription";

function AddEditTherapy() {
  const storage = localStorage.getItem("data");
  const [therapies, setTherapies] = useState<formValues>({
    name: "",
    notes: "",
  });
  const [medicationError, setMedicationError] = useState<string>("");
  const [medicineSelected, setMedicineSelected] = useState<IMedecine[]>([]);
  const [medicines, setMedicines] = useState<IMedecine[]>([]);
  const [contacts, setContacts] = useState<IContact[]>([]);
  const [contactError, setContactError] = useState<string>("");
  const [doctors, setDoctors] = useState<IContact>({
    id: "",
    name: "",
    notes: "",
    qualification: "",
    profession: "",
    phone: "",
    email: "",
    address: "",
  });
  const [addError, setAddError] = useState<string>("");
  const [errors, setErrors] = useState<formError>({
    name: "",
  });
  const [errorDoctor, setErrorDoctor] = useState<string>();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [errorDelete, setErrorDelete] = useState<string>("");
  const [fetchError, setFetchError] = useState<string>("");
  const [isSave, setIsSave] = useState<boolean>(false);
  const [idSaveTherapy, setIdSaveTherapy] = useState<string>("");

  const navigate = useNavigate();
  const location = useLocation();

  const { therapy, doctor, meds } = location.state || {
    therapy: null,
    doctor: null,
    meds: null,
  };

  const getMedication = async (): Promise<void> => {
    try {
      setMedicationError("");
      const response = await fetch("http://localhost:3000/medicines");
      const data = await response.json();
      setMedicines(data);
    } catch {
      setMedicationError("Failed to load medicines");
    }
  };

  const getDoctor = async (): Promise<void> => {
    try {
      const response = await fetch("http://localhost:3000/contacts");
      const data = await response.json();
      setContacts(data);
    } catch {
      setContactError("Failed to load medecines");
    }
  };

  const getThereapy = async (id: string) => {
    try {
      const result = await fetch(`http://localhost:3000/therapies/${id}`);
      const data = await result.json();
      setTherapies(data);
    } catch {}
  };
  useEffect(() => {
    getMedication();
    getDoctor();
    if (therapy && doctor && meds) {
      setTherapies(therapy);
      setDoctors(doctor);
      setMedicineSelected(meds);
      setIsEdit(true);
    }
    if (storage) {
      const objStorage = JSON.parse(storage);
      getThereapy(objStorage.therapyId);
      setDoctors(objStorage.doctorData);
      setMedicineSelected(objStorage.medicinesData);
      setIsSave(objStorage.isSave);
      if (objStorage.therapyId) {
        setIdSaveTherapy(objStorage.therapyId);
      }
      localStorage.removeItem("data");
    }
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    const error = validationTherapy(name, value);
    setErrors((prevState) => ({
      ...prevState,
      [name]: error || "",
    }));

    setTherapies((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setIsSave(false);
  };

  const handleSelect = (e: SelectChangeEvent<string>): void => {
    const existMedicine = medicineSelected.filter(
      (item) => item.id == parseInt(e.target.value)
    );
    if (existMedicine.length === 0) {
      const [selected] = medicines.filter(
        (item) => item.id == parseInt(e.target.value)
      );
      setMedicineSelected([...medicineSelected, selected]);
    }
  };

  const handleBack = () => {
    if (isEdit) {
      navigate(-1);
    } else {
      navigate("/therapies");
    }
  };

  const handleDoctor = (e: SelectChangeEvent<string>): void => {
    const doc = contacts.find((contact) => contact.id === e.target.value);
    if (doc) {
      setDoctors(doc);
      setErrorDoctor("");
      setIsSave(false);
    }
  };

  const handleNotes = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setTherapies((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setIsSave(false);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const validationErrors = therapyForm(therapies);
    if (!isSave) {
      if (Object.keys(validationErrors).length === 0) {
        if (doctors.id !== "") {
          try {
            let result: Response | null = null;
            if (isEdit) {
              const updatedTherapy: ITherapy = {
                name: therapies.name,
                userId: therapies.userId,
                contact: doctors.id,
                notes: therapies.notes,
              };

              result = await fetch(
                `http://localhost:3000/therapies/${therapies.id}`,
                {
                  method: "PUT",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(updatedTherapy),
                }
              );
            } else {
              const newTherapy: ITherapy = {
                name: therapies.name,
                userId: 1,
                contact: doctors.id,
                notes: therapies.notes,
              };

              if (idSaveTherapy) {
                result = await fetch(
                  `http://localhost:3000/therapies/${idSaveTherapy}`,
                  {
                    method: "PUT",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify(newTherapy),
                  }
                );
              } else {
                result = await fetch("http://localhost:3000/therapies", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },

                  body: JSON.stringify(newTherapy),
                });
              }
            }
            if (!result.ok) {
              setAddError("Add therapy failed");
            } else {
              handleBack();
            }
          } catch {
            setAddError("Add therapy failed");
          }
        } else {
          setErrorDoctor("This field is required");
        }
      } else {
        setErrors(validationErrors);
      }
    } else {
      navigate("/therapies");
    }
  };

  const handleAddPrescription = async (med: number): Promise<void> => {
    const validationErrors = therapyForm(therapies);

    if (!isEdit) {
      if (Object.keys(validationErrors).length === 0) {
        if (doctors.id !== "") {
          try {
            const newTherapy: ITherapy = {
              name: therapies.name,
              userId: therapies.userId ? therapies.userId : 2,
              contact: doctors.id,
              notes: therapies.notes,
            };

            const precript = await fetch("http://localhost:3000/prescriptions");
            const res = await precript.json();
            const isPrescript = res.filter(
              (item: IPrescription) =>
                item.medicine === med && item.therapy === therapies.id
            );
            if (isPrescript.length === 0) {
              if (!isSave) {
                const result = await fetch("http://localhost:3000/therapies", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },

                  body: JSON.stringify(newTherapy),
                });
                if (!result.ok) {
                  setAddError("Add therapy failed");
                } else {
                  const reponse = await result.json();
                  localStorage.setItem(
                    "data",
                    JSON.stringify({
                      therapyId: reponse.id,
                      medicinesData: medicineSelected,
                      doctorData: doctors,
                      isSave: true,
                    })
                  );
                  setIdSaveTherapy(reponse.id);
                  navigate("program", {
                    state: { idTherapy: reponse.id, idMedicine: med },
                  });
                }
              } else {
                localStorage.setItem(
                  "data",
                  JSON.stringify({
                    therapyId: idSaveTherapy,
                    medicinesData: medicineSelected,
                    doctorData: doctors,
                    isSave: true,
                  })
                );
                navigate("program", {
                  state: { idTherapy: idSaveTherapy, idMedicine: med },
                });
              }
            } else {
              localStorage.setItem(
                "data",
                JSON.stringify({
                  therapyId: idSaveTherapy,
                  medicinesData: medicineSelected,
                  doctorData: doctors,
                  isSave: true,
                })
              );
              navigate("program", {state: {idPrecription: isPrescript[0].id,  idMedicine: med}})
            }
          } catch {
            setAddError("Add therapy failed");
          }
        } else {
          setErrorDoctor("This field is required");
        }
      } else {
        setErrors(validationErrors);
      }
    } else {
      localStorage.setItem(
        "data",
        JSON.stringify({
          therapyId: therapies.id,
          medicinesData: medicineSelected,
          doctorData: doctors,
          isSave: true,
        })
      );
      navigate("program", {
        state: { idTherapy: therapies.id, idMedicine: med },
      });
    }
  };

  const handleRemove = async (element: IMedecine): Promise<void> => {
    if (isEdit) {
      try {
        const result = await fetch(
          `http://localhost:3000/prescriptions?therapy=${therapies.id}`
        );

        const prescriptions = await result.json();
        const [remove] = prescriptions.filter(
          (item: IPrescription) => item.medicine == element.id
        );

        try {
          const request = await fetch(
            `http://localhost:3000/prescriptions/${remove.id}`,
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          if (!request.ok) {
            throw new Error(
              `Erreur lors de la suppression : ${request.status}`
            );
          }
        } catch (e) {
          setErrorDelete(`Erreur: ${e}`);
        }
      } catch (error) {
        setFetchError(`Erreur: ${error}`);
      }
    }
    setMedicineSelected(medicineSelected.filter((med) => element !== med));
  };

  const handleClose = () => {
    setFetchError("");
    setErrorDelete("");
  };

  const handleMedicine = (id: number) => {
    navigate(`/medications/${id}`);
  };

  return (
    <>
      <form className="therapy-page" onSubmit={handleSubmit}>
        {addError && <Alert severity="error">{addError}</Alert>}

        <Header title="" showBackButton onBackButtonClick={handleBack} />

        <div className="therapyContent">
          <Box className="element" sx={{ gap: "20" }}>
            <Box
              sx={{
                width: "100%",
              }}
            >
              {isEdit ? "Edit" : "New"} therapy
            </Box>
            <TextField
              label="New therapy"
              name="name"
              value={therapies.name}
              className="therapieField"
              sx={{ width: "100%" }}
              margin="normal"
              onChange={handleChange}
              error={!!errors.name}
              helperText={errors.name}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      {medicineSelected.length !== 0 ? (
                        <HighlightOffIcon sx={{ color: "#F00" }} />
                      ) : null}
                    </InputAdornment>
                  ),
                },
              }}
            />
          </Box>
          {medicineSelected.length !== 0 ? (
            <>
              {medicineSelected.map((item) => (
                <Box className="element" key={item.id} sx={{ gap: "20" }}>
                  <div className="panel-element">
                    <div className="medecine-name">
                      <div className="medecine-name-title">
                        <Box className="medecine-title">{item.name}</Box>
                      </div>
                      <div className="medecine-title-button">
                        <ArrowForwardIosIcon
                          onClick={() => handleMedicine(item.id)}
                        />
                      </div>
                    </div>
                    <div className="aline-button">
                      <div
                        onClick={() => handleRemove(item)}
                        className="medecine-name-button"
                      >
                        <Button
                          sx={{ color: "white", width: "100%" }}
                          className="medecine-button"
                        >
                          REMOVE
                        </Button>
                      </div>
                      <div className="medecine-name-button">
                        <Button
                          sx={{ color: "white", width: "100%" }}
                          className="medecine-button"
                          onClick={() => handleAddPrescription(item.id)}
                        >
                          ADD PROGRAM
                        </Button>
                      </div>
                    </div>
                  </div>
                </Box>
              ))}

              <Box className="element" sx={{ gap: "20" }}>
                <Box
                  sx={{
                    width: "100%",
                  }}
                >
                  Add another medication
                </Box>

                <FormControl fullWidth margin="normal">
                  <InputLabel>Search here your medecine</InputLabel>
                  <Select
                    value=""
                    onChange={handleSelect}
                    label="Select one or more medicines"
                  >
                    {!medicationError ? (
                      medicines.map((item) => {
                        return (
                          <MenuItem key={item.id} value={item.id}>
                            {item.name}
                          </MenuItem>
                        );
                      })
                    ) : (
                      <MenuItem>{medicationError}</MenuItem>
                    )}
                  </Select>
                </FormControl>
              </Box>
              <Box className="element" sx={{ gap: "20" }}>
                <Box
                  sx={{
                    width: "100%",
                  }}
                >
                  Select a doctor
                </Box>

                <FormControl fullWidth margin="normal">
                  <InputLabel>Select a doctor</InputLabel>
                  <Select
                    value={doctors.id}
                    name="doctor"
                    label="Select a doctor"
                    onChange={handleDoctor}
                    error={!!errorDoctor}
                  >
                    {contacts.length !== 0 ? (
                      contacts.map((item) => {
                        return (
                          <MenuItem key={item.id} value={item.id}>
                            {item.name}
                          </MenuItem>
                        );
                      })
                    ) : (
                      <MenuItem>{contactError}</MenuItem>
                    )}
                  </Select>
                  {errorDoctor && <p className="decoration">{errorDoctor}</p>}
                </FormControl>
              </Box>
              <Box className="element" sx={{ gap: "20" }}>
                <Box
                  sx={{
                    width: "100%",
                  }}
                >
                  Notes
                </Box>
                <TextField
                  id="outlined-multiline-static"
                  multiline
                  rows={3}
                  className="therapieField"
                  sx={{ width: "100%", height: "83px" }}
                  margin="normal"
                  name="notes"
                  value={therapies.notes}
                  label="Write your notes here"
                  onChange={handleNotes}
                />
              </Box>
            </>
          ) : (
            <Box className="element" sx={{ gap: "20" }}>
              <Box
                sx={{
                  width: "100%",
                }}
              >
                Select one ore more therapy
              </Box>

              <FormControl fullWidth margin="normal">
                <InputLabel>Select one or more medicines</InputLabel>
                <Select
                  value=""
                  onChange={handleSelect}
                  label="Select one or more medicines"
                >
                  {!medicationError ? (
                    medicines.map((item) => {
                      return (
                        <MenuItem key={item.id} value={item.id}>
                          {item.name}
                        </MenuItem>
                      );
                    })
                  ) : (
                    <MenuItem>{medicationError}</MenuItem>
                  )}
                </Select>
              </FormControl>
            </Box>
          )}
        </div>
        <div className="bottom-page">
          {medicineSelected.length === 0 ? (
            <Button
              className="bottom-button"
              sx={{
                backgroundColor: "#F00",
                color: "white",
                width: "100%",
              }}
            >
              <SaveIcon /> Save
            </Button>
          ) : (
            <Button
              className="bottom-button-active"
              sx={{
                backgroundColor: "#F00",
                color: "white",
                width: "100%",
              }}
              type="submit"
            >
              <SaveIcon /> Save
            </Button>
          )}
        </div>
      </form>
      <Snackbar
        open={!!fetchError}
        autoHideDuration={10000}
        onClose={handleClose}
        message={fetchError}
      />
      <Snackbar
        open={!!errorDelete}
        autoHideDuration={10000}
        onClose={handleClose}
        message={errorDelete}
      />
    </>
  );
}

export default AddEditTherapy;
