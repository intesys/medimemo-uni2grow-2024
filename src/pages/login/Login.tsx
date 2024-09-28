import "../../App.css";
import React, { useState } from "react";
import {
  Button,
  Typography,
  CircularProgress,
  Divider,
  Alert,
} from "@mui/material";
import AppleIcon from "@mui/icons-material/Apple";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import { TextField } from "@mui/material";
import { Link } from "@mui/material";
import Oh from "../../assets/images/oh.jpg";
import Medimemo from "../../assets/images/medimemo.jpg";
import {
  validationField,
  validationForm,
} from "../../utils/validationSchema.ts";
import { useNavigate } from "react-router-dom";

interface IUser {
  id?: number;
  name?: string;
  username?: string;
  password?: string;
  lastName?: string;
  image?: string;
  allergies?: string;
  phone?: string;
  email?: string;
  address?: string;
}

function Login() {
  const navigate = useNavigate();
  const [errorConnection, setErrorConnection] = useState("");
  const [loading, setLoading] = useState(false);

  let user: IUser = {
    username: "",
    password: "",
  };

  const [login, setLogin] = useState(user);

  const [error, setError] = useState(user);

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    const error = validationField(name, value);
    if (!error) {
      setError((prevSate) => {
        return {
          ...prevSate,
          [name]: "",
        };
      });
      setErrorConnection("");
    } else {
      setError((prevSate) => {
        return {
          ...prevSate,
          [name]: error,
        };
      });
    }
    setLogin((prevSate) => {
      return {
        ...prevSate,
        [name]: value,
      };
    });
  };

  const handlerSubmit = async (e: any) => {
    try {
      e.preventDefault();
      handleClick();
      const errors:IUser = validationForm(login);

      if (Object.keys(errors).length === 0) {
        const result = await fetch("http://localhost/users");
        const data = await result.json();
        const userData: IUser = data.find(
          (item:IUser) =>
            item.username === login.username && item.password === login.password
        );
        if (userData) {
          setErrorConnection("");
          navigate("/dashboard");
          console.log(userData);
        } else {
          setErrorConnection("Username or password are incorrect");
        }
      } else {
        setError(errors);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  return (
    <>
      <div className="container">
        <div className="logo-container">
          <img className="logo" src={Oh} alt="" />
          <br />
          <img className="appName" src={Medimemo} alt="" />
        </div>

        <div className="panel">
          <Typography textAlign="center" color="black">
            Let's sign you in
          </Typography>
          <form onSubmit={handlerSubmit} className="login-form">
            <TextField
              value={login.username}
              name="username"
              label="Email  or username"
              onChange={handleChange}
              error={!!error.username}
              helperText={error.username}
            />
            <TextField
              name="password"
              value={login.password}
              label="Password"
              type="password"
              onChange={handleChange}
              error={!!error.password}
              helperText={error.password}
            />
            <Typography textAlign="right" color="#F00">
              <Link>Forgot password</Link>
            </Typography>
            <Button
              className="button"
              variant="contained"
              sx={{ backgroundColor: "#F00" }}
              type="submit"
              disabled={loading}
              startIcon={
                loading && <CircularProgress size={30} color="inherit" />
              }
            >
              {loading ? "Loading..." : "Login"}
            </Button>
          </form>
          {errorConnection ? (
            <Alert severity="error">{errorConnection}</Alert>
          ) : null}
          <Typography textAlign="center" color="black">
            Don't have an account? <Link>Sign Up</Link>
          </Typography>

          <Divider>Or</Divider>

          <div className="footer">
            <Button
              className="button"
              sx={{ color: "black", border: "1px solid black" }}
            >
              <AppleIcon />
            </Button>
            <Button
              className="button"
              sx={{ color: "black", border: "1px solid black" }}
            >
              <GoogleIcon />
            </Button>
            <Button
              className="button"
              sx={{ color: "black", border: "1px solid black" }}
            >
              <FacebookIcon />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
