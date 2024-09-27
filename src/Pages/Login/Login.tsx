import { useState } from "react";
// import * as React from 'react';
import "../../App.css";
import Group from "../../assets/Images/Group.png";
import MEDIMEMO from "../../assets/Images/MEDIMEMO.png";
import {
  TextField,
  Link,
  Typography,
  Button,
  Divider,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./login.css";
import { validateForm, validateField } from "../../Utils/validateForm";
// import AppleIcon from "@mui/icons-material/Apple";

// const validationSchema = {
//   emailusername: isNotEmpty,
//   passw: isNotEmpty,
// };

function Login() {
  const [err, setError] = useState({ userName: "", passWord: "" });
  const [isLogin, setIsLogin] = useState("");
  const [credentials, setcredentials] = useState({
    userName: "",
    passWord: "",
  });

  const navigate = useNavigate();

  const handlerChange = (e) => {
    const fieldName = e.target.name;
    const value = e.target.value;
    const errMessage = validateField(fieldName, value);
    if (!errMessage) {
      setError((prevState) => {
        const newState = { ...prevState };
        delete newState[fieldName];
        return newState;
      });
    } else {
      setError((prevState) => ({ ...prevState, [fieldName]: "" }));
    }
    setcredentials((prevState) => {
      setIsLogin("");
      return { ...prevState, [fieldName]: value };
    });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const error = validateForm(credentials);
      if (Object.keys(error).length === 0) {
        const result = await fetch(
          "http://localhost:3000/users"

          // "https://jsonplaceholder.typicode.com/users"
        );
        const data = await result.json();
        console.log(data);

        const isThere = data.find((item) => {
          return (
            item.name === credentials.userName &&
            item.password === credentials.passWord
          );
        });
        if (isThere) {
          console.log(isThere);

          navigate("/Dashboard");
        } else {
          setIsLogin("login");
        }
      } else {
        setError(error);
      }
    } catch (e) {
      //   console.log(e);
    }
  };

  return (
    <div className="background">
      <div className="logo-container">
        <img className="Group" src={Group} alt="Group" />
        <img className="MEDIMEMO" src={MEDIMEMO} alt="MEDIMEMO" />
      </div>
      <div className="panel">
        <Typography fontWeight={700} textAlign={"center"}>
          Let's sign you in!
        </Typography>

        {isLogin ? (
            <Alert variant="outlined" severity="error">
              password or login is incorrect!
            </Alert>
          ) : (
            ""
          )}

        <form className="login-form" onSubmit={handleSubmit}>
          <TextField
            label="Email or Username "
            onChange={handlerChange}
            variant="outlined"
            value={credentials.userName}
            type="Email or Username"
            name="userName"
            error={!!err.userName}
            helperText={err.userName}
          />
          <TextField
            label="Password "
            variant="outlined"
            onChange={handlerChange}
            value={credentials.passWord}
            type="password"
            name="passWord"
            error={!!err.passWord}
            helperText={err.passWord}
          />
          <Typography marginBottom={3} textAlign="right" fontSize={12}>
            <Link href="#">{"forgot password"}</Link>
          </Typography>
          <Button type="submit" color="error" variant="contained">
            login
          </Button>
         

          <Typography marginBottom={3} textAlign="center" fontSize={12}>
            Don't have an account?
            <Link style={{ color: "#f00" }} href="#">
              {"Sign Up!"}
            </Link>
          </Typography>
          <Divider>or</Divider>
          {/* <button>
          <div className="icons">
            <AppleIcon />
          </div>
        </button> */}
        </form>
      </div>
    </div>
  );
}

export default Login;
