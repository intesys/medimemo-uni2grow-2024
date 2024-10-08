import "./Profile.css";
import { Avatar, Button, InputAdornment, TextField, Typography, IconButton } from "@mui/material";
import UserAvatar from "../../assets/images/avatar.svg";
import UniversalCur from "../../assets/images/profile/universal_currency.svg";
import Allergies from "../../assets/images/profile/allergies.svg";
import Home from "../../assets/images/profile/home.svg";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import MailOutlinedIcon from "@mui/icons-material/MailOutlined";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import Header from "../../components/header/Header";
import { useNavigate } from "react-router-dom";
import { FormEvent, useState } from "react";
import { Cancel, Edit, LocalSee } from "@mui/icons-material";

const data = {
  name: "Francesca Greco",
  medicalID: "GRCFNCXXXXXXXXXX",
  allergies: "No Allergies",
  phone: "(555) 123-4567",
  email: "francesca.greco@example.com",
  address: "123 Vision Lane, Suite 200, Cityville, ST 12345",
};

const Profile = () => {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState(data);
  const [editable, setEditable] = useState(false);

  const handleEdit = () => {
    setEditable(!editable);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    if (editable) handleLogout(e);
    else handleSave(e);
    setEditable(false);
  };

  const handleSave = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("You data has been saved !!!");
  };
  const handleLogout = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate("/login");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleClean = (name: string) => {
    // const { name } = e.name;
    setFormValues((prevForm) => ({ ...prevForm, [name]: "" }))
  }

  return (
    <div className="first-container">
      <Header
        title={"Profile"}
        showBackButton={true}
        showRightButton={!editable && true}
        RightButton={<Edit />}
        onBackButtonClick={() => navigate("/medications")}
        onRightButtonClick={handleEdit}
      />
      <form className="profile-container" onSubmit={handleSubmit}>
        <div className="secondary">
          <div className="avatar-container">
            <Avatar src={UserAvatar} alt="Avatar" sx={{ width: "100px", height: "auto" }} />
            {editable && <IconButton
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
                borderRadius: "50%"
              }}
            >
              <LocalSee sx={{ fontSize: "1rem" }} />

            </IconButton>}
          </div>
          <div className="credentials">
            <Typography variant="h6" color="initial">
              {formValues.name}
            </Typography>
            <div className="informations">
              <TextField
                name="medicalID"
                value={formValues.medicalID}
                onChange={handleChange}
                disabled={!editable}
                label={editable ? "Medical ID" : null}
                sx={{ width: "100%", borderColor: "red" }}
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
                        {editable &&
                          <>
                            {formValues.medicalID != "" &&
                              <IconButton sx={{ color: "#F00", p: "0px" }} onClick={() => handleClean("medicalID")} >
                                <Cancel />
                              </IconButton>
                            }
                          </>
                        }
                      </>
                    )
                  },
                }}
              />
              <TextField
                name="allergies"
                disabled={!editable}
                label={editable ? "Allergies" : null}
                value={formValues.allergies}
                onChange={handleChange}
                sx={{ width: "100%" }}
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
                        {editable &&
                          <>
                            {formValues.allergies != "" &&
                              <IconButton sx={{ color: "#F00", p: "0px" }} onClick={() => handleClean("allergies")} >
                                <Cancel />
                              </IconButton>
                            }
                          </>
                        }
                      </>
                    )
                  },
                }}
              />
              <TextField
                name="phone"
                value={formValues.phone}
                onChange={handleChange}
                disabled={!editable}
                label={editable ? "Phone Number" : null}
                sx={{ width: "100%" }}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <PhoneOutlinedIcon />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <>
                        {editable &&
                          <>
                            {formValues.phone != "" &&
                              <IconButton sx={{ color: "#F00", p: "0px" }} onClick={() => handleClean("phone")} >
                                <Cancel />
                              </IconButton>
                            }
                          </>
                        }
                      </>
                    )
                  },
                }}
              />
              <TextField
                name="email"
                value={formValues.email}
                onChange={handleChange}
                disabled={!editable}
                label={editable ? "Email" : null}
                id="outlined-start-adornment"
                sx={{ width: "100%" }}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <MailOutlinedIcon />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <>
                        {editable &&
                          <>
                            {formValues.email != "" &&
                              <IconButton sx={{ color: "#F00", p: "0px" }} onClick={() => handleClean("email")} >
                                <Cancel />
                              </IconButton>
                            }
                          </>
                        }
                      </>
                    )
                  },
                }}
              />
              <TextField
                name="address"
                value={formValues.address}
                onChange={handleChange}
                disabled={!editable}
                label={editable ? "Address" : null}
                sx={{ width: "100%" }}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <img
                          className="input-image"
                          src={Home}
                          alt="universal currency"
                        />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <>
                        {editable &&
                          <>{formValues.address != "" &&
                            <IconButton sx={{ color: "#F00", p: "0px" }} onClick={() => handleClean("address")} >
                              <Cancel />
                            </IconButton>}
                          </>
                        }
                      </>
                    )
                  },
                }}
              />
            </div>
          </div>
        </div>
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
          {!editable ? (
            "Logout"
          ) : (
            <>
              <SaveOutlinedIcon /> {"Save"}
            </>
          )}
        </Button>
      </form >
    </div >
  );
};

export default Profile;
