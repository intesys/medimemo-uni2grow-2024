import React from "react";
import "../../pages/login/Login.css";

import { Button, CircularProgress, Typography } from "@mui/material";
import { TextField } from "@mui/material";
import { Link } from "@mui/material";
import { Divider } from "@mui/material";
import { IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";

import logo from "../../assets/images/logo-color.png";
import medimemo from "../../assets/images/MEDIMEMO.png";
import frame1 from "../../assets/icons/Frame 8.png";
import frame2 from "../../assets/icons/Frame 11.png";
import frame3 from "../../assets/icons/Frame 10.png";
import { useState } from "react";
import { validateField, validateForm } from "../../utils/LoginValidation.ts";

interface Credentials {
  email: string;
  password: string;
}
interface Errors {
  [key: string]: string;
}

export function Login() {
  const navigate = useNavigate();

  const [credentials, setcredentials] = useState<Credentials>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<Errors>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fieldName = e.target.name;
    const value = e.target.value;

    const error = validateField(fieldName, value);

    if (!error) {
      setErrors((prevState) => {
        const newState = { ...prevState };
        delete newState[fieldName];
        return newState;
      });
    } else {
      setErrors((prevState) => ({
        ...prevState,
        [fieldName]: error,
      }));
    }

    setcredentials((prevState) => {
      return { ...prevState, [fieldName]: value };
    });
    setLogged("");
  };
  const [logged, setLogged] = useState<string>("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const result = validateForm(credentials);
      if (Object.keys(result).length === 0) {
        setLoading(true);
        const result = await fetch("http://localhost:3000/users");
        const data = await result.json();

        setLoading(false);

        const user = data.find((item) => item.email);

        if (user && user.email === credentials.email) {
          navigate("/dashboard");

          setLogged("The user is successfully logged");
        } else {
          setLogged("The Email or Username and Password are incorrect");
        }

        console.log(data);
      } else {
        setErrors(result);
      }
    } catch (e) {
      setLoading(false);
      console.error(e);
    }
  };

  return (
    <>
      <div className="container">
        <div className="logo-container">
          <img className="logo" src={logo} alt="" />
          <img className="medimemo" src={medimemo} alt="" />
        </div>
        <div className="panel">
          <Typography fontWeight={700} fontSize={20} textAlign="center">
            {" "}
            Let's Sign you in!
          </Typography>
          <form className="login_form" onSubmit={handleSubmit}>
            <TextField
              id="text"
              name="email"
              value={credentials.email}
              label="Email or Username"
              variant="outlined"
              onChange={handleChange}
              helperText={errors.email}
              error={!!errors.email}
              // onAbort={ErrorEvent}
            />

            <TextField
              id="textfield"
              label="Password"
              variant="outlined"
              name="password"
              type="password"
              value={credentials.password}
              helperText={errors.password}
              onChange={handleChange}
              error={!!errors.password}
            />

            <Typography textAlign="right">
              <Link>Forgot password</Link>
            </Typography>

            <Button
              className="login"
              variant="contained"
              disableElevation
              disabled={loading}
              color="error"
              sx={{ backgroundColor: "#F00" }}
              type="submit"
              startIcon={loading && logged && <CircularProgress size={20} />}
              onClick={() => {
                if (
                  logged === "The Email or Username and Password are incorrect"
                ) {
                  setLogged("");
                }
              }}
            >
              Login
            </Button>
            {logged && logged !== "" && (
              <Typography sx={{ color: "#F00" }}>{logged}</Typography>
            )}
          </form>

          <Typography textAlign="center">
            Don't have an account?
            <Link>Sign up!</Link>
          </Typography>

          <Divider textAlign="center" sx={{ fontSize: 20 }}>
            or
          </Divider>
          <div className="icon">
            <IconButton component={Link} href="link_url">
              <img src={frame1} alt="" />
            </IconButton>

            <IconButton component={Link} href="link_url">
              <img src={frame2} alt="" />
            </IconButton>

            <IconButton component={Link} href="link_url">
              <img src={frame3} alt="" />
            </IconButton>
          </div>
        </div>
      </div>
    </>
  );
}
