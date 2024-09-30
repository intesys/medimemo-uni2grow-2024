import "../App.css";
import { Button, CircularProgress, Typography } from "@mui/material";
import { TextField } from "@mui/material";
import { Link } from "@mui/material";
import { Divider } from "@mui/material";
import { IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";

import logo from "../assets/logo-color.png";
import medimemo from "../assets/MEDIMEMO.png";
import frame1 from "../assets/Frame 8.png";
import frame2 from "../assets/Frame 11.png";
import frame3 from "../assets/Frame 10.png";
import { useState } from "react";
import { validateField, validateForm } from "";

export function Login() {
  const navigate = useNavigate();

  const [credentials, setcredentials] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
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
  };
  const [logged, setLogged] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const result = validateForm(credentials);
      if (Object.keys(result).length === 0) {
        setLoading(true);
        const result = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );
        const data = await result.json();

        setLoading(false);

        const user = data.find((item) => item.username);

        if (user && user.username === credentials.username) {
          navigate("/dashboard");

          setLogged("The user is successfully logged");
        } else {
          setLogged("The users with this information doesn't exist");
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
              name="username"
              value={credentials.username}
              label="Email or Username"
              variant="outlined"
              onChange={handleChange}
              helperText={errors.username}
              error={!!errors.username}
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
              startIcon={loading && <CircularProgress size={20} />}
            >
              Login
            </Button>
            <Typography sx={{ color: "#F00" }}>{logged}</Typography>
          </form>

          <Typography textAlign="center">
            Don't have an account?
            <Link>Sign up!</Link>
          </Typography>

          <Divider size="small">or</Divider>
          <div className="icon">
            <IconButton component={Link} to="link_url">
              <img src={frame1} alt="" />
            </IconButton>

            <IconButton component={Link} to="link_url">
              <img src={frame2} alt="" />
            </IconButton>

            <IconButton component={Link} to="link_url">
              <img src={frame3} alt="" />
            </IconButton>
          </div>
        </div>
      </div>
    </>
  );
}