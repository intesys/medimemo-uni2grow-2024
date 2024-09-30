import React, { useState, ChangeEvent, FormEvent } from "react";
import { Button, Link, TextField, Typography, Card, Snackbar, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from "react-router-dom";
import { validateForm, validationField } from "../../utils/Validation";

import "./Login.css";
import logoImage from "../../assets/login-img/logo.jpeg";
import MeduimImage from "../../assets/login-img/medimemo.jpeg";
import facebook from "../../assets/login-img/facebook.jpeg";
import google from "../../assets/login-img/google.png";
import iphone from "../../assets/login-img/apple.png";

// Define types for credentials
interface Credentials {
  username: string;
  password: string;
}

//difine types for errors
interface Errors {
  username?: string;
  password?: string;
}

function Login() {
  const navigate = useNavigate();

  // Definition du state avec son type
  const [credentials, setCredentials] = useState<Credentials>({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState<Errors>({
    username: "",
    password:"",
  });

  const [open, setOpen] = useState<boolean>(false); // Snackbar open state
  const [snackbarMessage, setSnackbarMessage] = useState<string>(""); // Message for the Snackbar

  // Handle close for Snackbar
  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  // Handle input change with proper event typing
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const fieldName = e.target.name;
    const value = e.target.value;
    const error = validationField(fieldName, value);

    if (!error) {
      setErrors((prevState) => ({ ...prevState, [fieldName]: "" }));
    } else {
      setErrors((prevState) => ({ ...prevState, [fieldName]: error }));
    }

    setCredentials((prevState) => {
      return { ...prevState, [fieldName]: value };
    });
  };

  // Handle login submission
  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const errors = validateForm(credentials);
      if (Object.keys(errors).length === 0) {
        const result = await fetch("http://localhost:3000/users");
        const datas = await result.json();

        const userFound = datas.find(
          (user: { userName: string; password: string }) => 
            user.userName === credentials.username && 
            user.password === credentials.password
        );

        if (userFound) {
          console.log("Login successful, redirecting...");
          setCredentials({ username: "", password: "" });
          navigate("/dashboard");
        } else {
          console.log("Invalid username or password");
          setErrors({ username: "Username not found", password: "" });
          setSnackbarMessage("Invalid username or password");
          setOpen(true);
        }
      } else {
        setErrors(errors);
      }
    } catch (error) {
     
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
                  error={!!errors.username}
                  helperText={errors.username}
                />
              </div>
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
                  name="password"
                  error={!!errors.password}
                  helperText={errors.password}
                />
              </div>
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
                  <Typography component="span">
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
                <img width={30} height={30} alt="google" src={google} />
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
