import { ChangeEvent, FormEvent, useState } from "react";
import medimoImg from "../../assets/images/medimo.jpeg";
import ohIcon from "../../assets/images/oh.jpeg";
import Divider from "@mui/material/Divider";
import "./login.css";
import AppleIcon from "@mui/icons-material/Apple";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import {
  validateForm,
  validateField,
  formErrors,
  formValue,
} from "../../utils/validationSchemat.ts";
import { Button, Link, Typography } from "@mui/material";
import { TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";

export function Login() {
  const navigate = useNavigate();
  interface Users {
    name: string;
    password: string;
  }

  const [credentials, setCredentials] = useState<formValue>({
    username: "",
    password: "",
  });

  const [submitError, setSubmitError] = useState<formErrors>({
    username: "",
    password: "",
  });
  const [login, setlogin] = useState("");

  const handlerChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const fieldname = e.target.name;
    const value = e.target.value;
    setCredentials((prev) => {
      return { ...prev, [fieldname]: value };
    });

    const error = validateField(fieldname, value);
    if (!error) {
      setSubmitError((prevState) => ({
        ...prevState,
        [fieldname]: error || "",
      }));
    } else {
      setSubmitError((prevState) => {
        return { ...prevState, [fieldname]: error };
      });
    }
    setCredentials((prev) => {
      setlogin("");
      return { ...prev, [fieldname]: value };
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    try {
      e.preventDefault();
      const errors = validateForm(credentials);
      if (Object.keys(errors).length == 0) {
        const result = await fetch("http://localhost:3001/users");
        const data = await result.json();
        const test = data.some(
          (item: Users) =>
            credentials.username === item.name &&
            credentials.password === item.password
        );
        if (test) {
          navigate("/dashboard");
        } else {
          setlogin("something");
        }
      } else {
        setSubmitError(errors);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="container">
        <div className="logoContainer">
          <img src={ohIcon} className="logo" />{" "}
          <img src={medimoImg} className="appName" />
        </div>

        <div className="panel">
          <Typography fontWeight={700} fontSize={20} textAlign={"center"}>
            Let sign you in
          </Typography>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit(e);
            }}
            className="login-form"
          >
            <TextField
              label="Email or Username"
              name="username"
              value={credentials.username}
              onChange={handlerChange}
              fullWidth
              error={!!submitError.username}
              helperText={submitError.username}
            />
            <TextField
              label="password"
              onChange={handlerChange}
              name="password"
              value={credentials.password}
              type="password"
              fullWidth
              error={!!submitError.password}
              helperText={submitError.password}
            />
            <Typography textAlign="right">
              <Link>forgot password</Link>
            </Typography>
            <Button
              type="submit"
              variant="contained"
              sx={{ backgroundColor: "#f00" }}
            >
              LOGIN
            </Button>
            {login ? (
              <Alert severity="error">error of login or password</Alert>
            ) : (
              ""
            )}
            <Typography>
              Don't have a account
              <Link style={{ color: "red" }}> Sign up</Link>
            </Typography>
          </form>
          <Divider>or</Divider>
          <div className="icon">
            <Link className="custom_Icon">
              <AppleIcon className="apple" />
            </Link>
            <Link className="custom_Icon">
              <GoogleIcon className="google" />
            </Link>
            <Link className="custom_Icon">
              <FacebookIcon className="facebook" style={{ color: "blue" }} />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
