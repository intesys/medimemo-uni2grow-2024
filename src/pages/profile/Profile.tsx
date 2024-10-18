import "./Profile.css";
import {
  Avatar,
  Button,
  InputAdornment,
  TextField,
  Typography,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Snackbar,
  Alert,
  SnackbarCloseReason,
  SxProps,
} from "@mui/material";
import UserAvatar from "../../assets/images/avatar.svg";
import UniversalCur from "../../assets/images/profile/universal_currency.svg";
import Allergies from "../../assets/images/profile/allergies.svg";
import Home from "../../assets/images/profile/home.svg";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import MailOutlinedIcon from "@mui/icons-material/MailOutlined";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import Header from "../../components/header/Header";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  ArrowBackIos,
  Cancel,
  Edit,
  LocalSee,
  Logout,
  ReportOutlined,
} from "@mui/icons-material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { IUser } from "../../models/User";
import { LOGGED } from "../../utils/Constants";

const Profile = () => {
  const navigate = useNavigate();
  const [editable, setEditable] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [user, setUser] = useState<IUser>({
    name: "",
    lastName: "",
    medicalID: "",
    allergies: "",
    phone: "",
    email: "",
    address: "",
  });
  const [error, setError] = useState("");
  const [openSnack, setOpenSnack] = useState(false);

  const handleEdit = () => {
    setEditable(!editable);
  };

  const handleLogout = () => {
    if (!editable) handleOpenAlert();
    setEditable(false);
  };

  const handleSave = async (value: IUser) => {
    setEditable(false);
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(value),
    };

    try {
      setError("");
      const response = await fetch("http://localhost:3000/me", requestOptions);
      if (response.ok) {
        getUserProfile();
        setOpenSnack(true);
      } else {
        setError("Error saving user profile");
      }
    } catch {
      setError("Error saving user profile");
    }
  };

  const handleCloseSnack = (
    _event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnack(false);
  };

  const handleOpenAlert = () => {
    setOpenAlert(true);
  };

  const handleCloseAlert = () => {
    setOpenAlert(false);
  };

  const logout = () => {
    localStorage.removeItem(LOGGED);
    navigate("/login");
  };

  const handleClean = (name: string) => {
    formik.setValues((prevValues) => ({ ...prevValues, [name]: "" }));
  };

  const validationSchema = Yup.object({
    medicalID: Yup.string().required("MedicalID is required"),
    allergies: Yup.string().required("Allergies is required"),
    phone: Yup.string().required("Phone number is required"),
    email: Yup.string()
      .required("Email is required")
      .email("Invalid email format"),
    address: Yup.string().required("Address is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: user.name,
      lastName: user.lastName,
      medicalID: user.medicalID,
      allergies: user.allergies,
      phone: user.phone,
      email: user.email,
      address: user.address,
    },
    validationSchema,
    onSubmit: (value) => handleSave(value),
    validateOnBlur: true,
  });

  const getUserProfile = async () => {
    try {
      setError("");
      const response = await fetch("http://localhost:3000/me");
      const data: IUser = await response.json();
      setUser(data);
      formik.setValues(data);
    } catch {
      setError("Error fetching user profile");
    }
  };

  useEffect(() => {
    getUserProfile();
  }, []);

  const inputStyle: SxProps = {
    width: "100%",
    "& .MuiInputBase-input.Mui-disabled": {
      WebkitTextFillColor: "#222",
    },
    "& .css-1mnoz6i-MuiInputBase-root-MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline":
      {
        borderColor: "#555",
      },
  };

  return (
    <div className="first-container">
      <Header
        title={"Profile"}
        showBackButton={true}
        showRightButton={!editable && true}
        RightButton={<Edit />}
        // onBackButtonClick={() => navigate("/medications")}
        onBackButtonClick={() => navigate(-1)}
        onRightButtonClick={handleEdit}
      />
      <Dialog
        open={openAlert}
        onClose={handleCloseAlert}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          color: "#F00",
        }}
        PaperProps={{
          sx: {
            borderRadius: "25px",
          },
        }}
      >
        <DialogTitle
          variant="h6"
          id="alert-dialog-title"
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            color: "#222",
            gap: "10px",
            fontWeight: "bold",
          }}
        >
          <ReportOutlined sx={{ color: "#555" }} />
          Log-out Confirmation
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to log out? Any unsaved changes will be lost.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseAlert}
            sx={{
              textTransform: "capitalize",
              color: "#555",
              fontWeight: "bold",
            }}
          >
            <ArrowBackIos />
            &nbsp;Back
          </Button>
          <Button
            sx={{
              textTransform: "capitalize",
              color: "#F00",
              fontWeight: "bold",
            }}
            onClick={logout}
            autoFocus
          >
            <Logout />
            &nbsp;Log-out
          </Button>
        </DialogActions>
      </Dialog>
      <form className="profile-container" onSubmit={formik.handleSubmit}>
        <div className="secondary">
          <div className="avatar-container">
            <Avatar
              src={UserAvatar}
              alt="Avatar"
              sx={{ width: "100px", height: "auto" }}
            />
            {editable && (
              <IconButton
                aria-label="profile"
                onClick={() => console.log("cliked")}
                sx={{
                  position: "absolute",
                  bottom: "0px",
                  right: "0px",
                  padding: "5px",
                  backgroundColor: "#F00",
                  color: "#FFF",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "50%",
                }}
              >
                <LocalSee sx={{ fontSize: "1rem" }} />
              </IconButton>
            )}
          </div>
          <div className="credentials">
            <Typography variant="h6" color="initial">
              {`${formik.values.lastName} ${formik.values.name}`}
            </Typography>
            <div className="informations">
              <Typography
                variant="body1"
                color="error"
                sx={{
                  widh: "100%",
                  display: "flex",
                  justifyContent: "center",
                  fontWeight: "bold",
                }}
              >
                {error}
              </Typography>
              <TextField
                name="medicalID"
                disabled={!editable}
                value={formik.values.medicalID}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.medicalID && Boolean(formik.errors.medicalID)
                }
                helperText={formik.touched.medicalID && formik.errors.medicalID}
                label={editable ? "Medical ID" : null}
                sx={inputStyle}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <img
                          className="input-image"
                          src={UniversalCur}
                          alt="universal currency"
                        />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <>
                        {editable && (
                          <>
                            {formik.values.medicalID != "" && (
                              <IconButton
                                sx={{ color: "#F00", p: "0px" }}
                                onClick={() => handleClean("medicalID")}
                              >
                                <Cancel />
                              </IconButton>
                            )}
                          </>
                        )}
                      </>
                    ),
                  },
                }}
              />
              <TextField
                name="allergies"
                disabled={!editable}
                value={formik.values.allergies}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.allergies && Boolean(formik.errors.allergies)
                }
                helperText={formik.touched.allergies && formik.errors.allergies}
                label={editable ? "Allergies" : null}
                sx={inputStyle}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <img
                          className="input-image"
                          src={Allergies}
                          alt="universal currency"
                        />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <>
                        {editable && (
                          <>
                            {formik.values.allergies != "" && (
                              <IconButton
                                sx={{ color: "#F00", p: "0px" }}
                                onClick={() => handleClean("allergies")}
                              >
                                <Cancel />
                              </IconButton>
                            )}
                          </>
                        )}
                      </>
                    ),
                  },
                }}
              />
              <TextField
                name="phone"
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.phone && Boolean(formik.errors.phone)}
                helperText={formik.touched.phone && formik.errors.phone}
                disabled={!editable}
                label={editable ? "Phone Number" : null}
                sx={inputStyle}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <PhoneOutlinedIcon
                          sx={{ color: "#222", opacity: "0.9" }}
                        />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <>
                        {editable && (
                          <>
                            {formik.values.phone != "" && (
                              <IconButton
                                sx={{ color: "#F00", p: "0px" }}
                                onClick={() => handleClean("phone")}
                              >
                                <Cancel />
                              </IconButton>
                            )}
                          </>
                        )}
                      </>
                    ),
                  },
                }}
              />
              <TextField
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                disabled={!editable}
                label={editable ? "Email" : null}
                id="outlined-start-adornment"
                sx={inputStyle}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <MailOutlinedIcon
                          sx={{ color: "#222", opacity: "0.9" }}
                        />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <>
                        {editable && (
                          <>
                            {formik.values.email != "" && (
                              <IconButton
                                sx={{ color: "#F00", p: "0px" }}
                                onClick={() => handleClean("email")}
                              >
                                <Cancel />
                              </IconButton>
                            )}
                          </>
                        )}
                      </>
                    ),
                  },
                }}
              />
              <TextField
                multiline
                name="address"
                value={formik.values.address}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.address && Boolean(formik.errors.address)}
                helperText={formik.touched.address && formik.errors.address}
                disabled={!editable}
                label={editable ? "Address" : null}
                sx={{
                  width: "100%",
                  "& .MuiInputBase-input.Mui-disabled": {
                    WebkitTextFillColor: "#222",
                  },
                  "& .css-ukn3g9-MuiInputBase-root-MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline":
                    {
                      borderColor: "#555",
                    },
                }}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment
                        position="start"
                        sx={{ alignSelf: "start" }}
                      >
                        <img
                          className="input-image"
                          src={Home}
                          alt="universal currency"
                        />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <>
                        {editable && (
                          <>
                            {formik.values.address != "" && (
                              <IconButton
                                sx={{ color: "#F00", p: "0px" }}
                                onClick={() => handleClean("address")}
                              >
                                <Cancel />
                              </IconButton>
                            )}
                          </>
                        )}
                      </>
                    ),
                  },
                }}
              />
            </div>
          </div>
        </div>
        <Snackbar
          open={openSnack}
          autoHideDuration={4000}
          onClose={handleCloseSnack}
        >
          <Alert
            onClose={handleCloseSnack}
            severity="success"
            variant="filled"
            sx={{ width: "100%" }}
          >
            User Profile edited successfully.!
          </Alert>
        </Snackbar>
        {!editable ? (
          <Button
            onClick={handleLogout}
            variant="contained"
            sx={{
              width: "100%",
              backgroundColor: "red",
              color: "white",
              fontWeight: "bold",
              padding: "10px 20px",
              borderRadius: "5px",
              gap: "10px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            Logout
          </Button>
        ) : (
          <Button
            type="submit"
            variant="contained"
            sx={{
              width: "100%",
              backgroundColor: "red",
              color: "white",
              fontWeight: "bold",
              padding: "10px 20px",
              borderRadius: "5px",
              gap: "10px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <SaveOutlinedIcon /> {"Save"}
          </Button>
        )}
      </form>
    </div>
  );
};

export default Profile;
