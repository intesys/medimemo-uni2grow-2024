import { Button, Link, TextField, Typography, Card, Snackbar, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import "./Login.css";
import logoImage from "../../assets/login-img/logo.jpeg";
import MeduimImage from "../../assets/login-img/medimemo.jpeg";
import facebook from "../../assets/login-img/facebook.jpeg";
import google from "../../assets/login-img/google.png";
import iphone from "../../assets/login-img/apple.png";
import React, { useState } from "react";
import { validateForm, validationField } from "../../utils/Validation";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });

  const [open, setOpen] = useState(false); // Snackbar open state
  const [snackbarMessage, setSnackbarMessage] = useState(""); // Message for the Snackbar


  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleChange = (e) => {
    const fieldName = e.target.name;
    const value = e.target.value;
    const error = validationField(fieldName, value);
    //const isvalid = isNoEmpty(value);
    if (!error) {
      setErrors((prevState) => ({ ...prevState, [fieldName]: "" }));
    } else {
      setErrors((prevState) => ({ ...prevState, [fieldName]: error }));
    }

    setCredentials((prevState) => {
      return { ...prevState, [fieldName]: value };
    });
  };

  const handleLogin = async (e) => {
    try {
      e.preventDefault();
      const errors = validateForm(credentials);
      if (Object.keys(errors).length === 0) {
        const result = await fetch(
          "http://localhost:3000/users"
        );
        const datas = await result.json();
        console.log(datas);
        setCredentials({ username: "", password: "" });
        const userFound = datas.find(
          (user) => user.username === credentials.userName && user.password === credentials.password
        );

        if (userFound) {
          console.log("Login successful, redirecting...");
          setCredentials({ username: "", password: "" });
          navigate("/dashboard");
        } else {
          console.log("Invalid username or password");
          setErrors({ username: "Username not found" });
          setSnackbarMessage("Invalid username or password");
          setOpen(true);
        }
      } else {
        setErrors(errors);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <div className="container">
        <div className="img">
          <img alt="title" src={logoImage} />
        </div>

        <div className="img">
          <img alt="title" src={MeduimImage} />
        </div>
        <form onSubmit={handleLogin}>
          <div className="container2">
            <div className="divTitle">
              <Typography fontWeight={700} fontSize={20}>
                Lets Sign You In
              </Typography>
            </div>
            <div className="container3">
              <div className="textfielddiv">
                <TextField
                  id="outlined-basic"
                  label="Email or Username"
                  variant="outlined"
                  color="error"
                  value={credentials.username}
                  sx={{ width: "80%" }}
                  onChange={handleChange}
                  name="username"
                  //onBlur={validateForm}
                  error={!!errors.username}
                  helperText={errors.username}
                />
              </div>
              {/*   {errors.username && (
                    <div className="error">{errors.username}</div>
                  )} */}
              <div className="textfielddiv">
                <TextField
                  id="outlined-basic"
                  label="Password"
                  type="password"
                  variant="outlined"
                  color="error"
                  value={credentials.password}
                  sx={{ width: "80%" }}
                  onChange={handleChange}
                  // onBlur={validateForm}
                  name="password"
                  error={!!errors.password}
                  helperText={errors.password}
                />
              </div>

              {/* {errors.password && (
                    <div className="error">{errors.password}</div>
                  )} */}
            </div>
            <div className="divforgot">
              <Typography>
                <Link sx={{ color: "black" }}>Forgot Password</Link>
              </Typography>
            </div>
            <div className="divbutton">
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "red",
                  color: "white",
                  fontWeight: "bold",
                  width: "80%",
                }}
                type="submit"
              >
                Login
              </Button>
            </div>

            <div>
              <Typography sx={{ display: "flex", justifyContent: "center" }}>
                Dont have an account?
                <span>
                  <Typography>
                    <Link sx={{ color: "red" }}>Sign up!</Link>
                  </Typography>
                </span>
              </Typography>
            </div>
            <div className="divor">
              <span>
                <hr />
              </span>
              <span>or</span>
              <span>
                <hr />
              </span>
            </div>

            <div className="divimage">
              <Card
                sx={{
                  width: 100,
                  height: 50,
                  justifyContent: "center",
                  alignItems: "center",
                  display: "flex",
                }}
              >
                <img width={30} height={30} alt="apple" src={iphone} />
              </Card>

              <Card
                sx={{
                  width: 100,
                  height: 50,
                  justifyContent: "center",
                  alignItems: "center",
                  display: "flex",
                }}
              >
                <img width={30} height={30} alt="goofle" src={google} />
              </Card>
              <Card
                sx={{
                  width: 100,
                  height: 50,
                  justifyContent: "center",
                  alignItems: "center",
                  display: "flex",
                }}
              >
                <img width={30} height={30} alt="facebook" src={facebook} />
              </Card>
            </div>
          </div>
        </form>
        <Snackbar
          
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          message={snackbarMessage}
          security="error"
          action={
            <IconButton size="small" color="inherit" onClick={handleClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
          }
          
        />

      </div>
    </>
  );
}
export default Login;
