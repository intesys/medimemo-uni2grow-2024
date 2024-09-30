import { useState } from "react";
import { Button, TextField, Link, Typography, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import oh_img from "../../assets/icons/oh.png";
import medimemo_img from "../../assets/icons/MEDIMEMO.png";
import {
  validateField,
  validateForm,
  FormError,
  Formvalues,
} from "../../utils/validationSchema";

export function Login() {
  const navigate = useNavigate();

  const [errors, setErrors] = useState<FormError>({
    username: "",
    password: "",
  });

  const [credentials, setCredentials] = useState<Formvalues>({
    username: "",
    password: "",
  });

  const [loginError, setLoginError] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fieldName = e.target.name;
    const value = e.target.value;

    setCredentials((prevState) => {
      setLoginError("");
      return { ...prevState, [fieldName]: value };
    });

    const error = validateField(fieldName, value);
    if (error) {
      setErrors((prevState) => ({
        ...prevState,
        [fieldName]: error,
      }));
    } else {
      setErrors((prevState) => {
        const newState = { ...prevState };
        delete newState[fieldName];
        return newState;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); //pour annuler les evenements par defaut sur les formulaires
    const validationErrors = validateForm(credentials);
    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await fetch("http://localhost:3000/users");
        const data = await response.json();

        const isAuthenticated = data.some(
          (item: { name: string; password: string }) =>
            credentials.username === item.name &&
            credentials.password === item.password
        );

        if (isAuthenticated) {
          navigate("/dashboard");
        } else {
          setLoginError("Authentication failed");
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className="container">
      <div className="logoContainer">
        <div>
          <img className="logo" src={oh_img} alt="Logo" />
        </div>
        <div>
          <img className="appName" src={medimemo_img} alt="App Name" />
        </div>
      </div>

      <div className="panel">
        <Typography
          fontWeight={700}
          fontSize={20}
          marginTop={2}
          marginBottom={7}
          textAlign="center"
        >
          Let's sign you in
        </Typography>
        {loginError && <Alert severity="error">{loginError}</Alert>}
        <form className="login-form" onSubmit={handleSubmit}>
          <TextField
            value={credentials.username}
            fullWidth
            name="username"
            label="Email or Username"
            variant="outlined"
            onChange={handleChange}
            error={!!errors.username}
            helperText={errors.username}
          />
          <TextField
            margin="normal"
            value={credentials.password}
            fullWidth
            name="password"
            label="Password"
            variant="outlined"
            onChange={handleChange}
            error={!!errors.password}
            helperText={errors.password}
          />

          <Typography marginTop={3} marginBottom={5} textAlign="right">
            <Link>forgot password</Link>
          </Typography>

          <Button
            variant="contained"
            style={{ backgroundColor: "red" }}
            type="submit"
          >
            LOGIN
          </Button>
        </form>
        <Typography marginTop={5}>
          Don't have an account?
          <Link>Sign up</Link>
        </Typography>
      </div>
    </div>
  );
}
