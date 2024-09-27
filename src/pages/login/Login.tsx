import { useState } from "react";
import "./Login.css";
import {
  Button,
  TextField,
  Typography,
  Link,
  IconButton,
  CircularProgress,
  Divider,
} from "@mui/material";

// import des images du logo
import mediMemoImg from "../../assets/images/MEDIMEMO.png";
import ohImg from "../../assets/images/Group.png";

// import pour les icones a la page de login
import frame1 from "../../assets/icons/Frame 1.png";
import frame2 from "../../assets/icons/Frame 2.png";
import frame3 from "../../assets/icons/Frame 3.png";

// Import validation functions
import { validateForm, validateField } from "../../utils/Validation";
import { useNavigate } from "react-router-dom";

// Le corps meme du composant
export function Login() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  // Handle form field changes
  const handleChange = (e) => {
    const fieldName = e.target.name;
    const value = e.target.value;

    setCredentials((prevState) => ({
      ...prevState,
      [fieldName]: value,
    }));
    setLogged("");

    // Validate the specific field on change
    const errorMessage = validateField(fieldName, value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: errorMessage,
    }));
  };

  // Handle form submission

  const [logged, setLogged] = useState("");

  // to disable the login button after the first submit click
  const [loading, setLoading] = useState(false);

  // Pour la navigation
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const formErrors = validateForm(credentials);
      // setErrors(formErrors);

      // Check if form has no errors before submitting
      if (Object.keys(formErrors).length === 0) {
        setLoading(true); // lock the button here

        const result = await fetch("http://localhost:3000/users");
        const data = await result.json();

        setLoading(false); // unlock the button here

        // comparing if the username is matching for
        // person

        const user = data.find(
          (item) =>
            item.username == credentials.username &&
            item.password == credentials.password
        );
        if (user) {
          setLogged("succesfull user login !!!");

          navigate("/dashboard"); // Navigation
        } else {
          setLogged("Wrong Username or password, please check it again!");
        }

        console.log(data);
      } else {
        setErrors(formErrors);
      }
    } catch (e) {
      setLoading(false); // unlock the button here
      console.error(e);
    }
  };

  return (
    <>
      <div className="container">
        <div className="logo-container">
          <img className="logo" src={ohImg} alt="logo" />
          <img className="appName" src={mediMemoImg} alt="app name" />
        </div>
        <div className="panel">
          <Typography
            className="indication"
            fontWeight={700}
            textAlign="center"
          >
            Let&apos;s Sign you in
          </Typography>

          <form className="login-form" onSubmit={handleSubmit}>
            <TextField
              id="username"
              label="Email or Username"
              name="username"
              value={credentials.username}
              onChange={handleChange}
              error={!!errors.username} // Show error if validation fails
              helperText={errors.username} // Show error message
              variant="outlined"
              // required
            />

            <TextField
              id="password"
              label="Password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              type="password"
              error={!!errors.password} //added for the validation task
              helperText={errors.password} //added for the validation task
              variant="outlined"
              // required
            />
            {/* this happen in case of wrong credentials */}
            <Typography className="wronguser" textAlign="left">
              {" "}
              {logged}{" "}
            </Typography>

            <Typography textAlign="right">
              <Link href="#">Forgot password?</Link>
            </Typography>

            <Button
              variant="contained"
              sx={{ backgroundColor: "red" }}
              type="submit"
              startIcon={loading && <CircularProgress size={20} />}
              disabled={loading}
            >
              LOGIN
            </Button>
          </form>

          <Typography textAlign="right">
            Don&apos;t have an account?{" "}
            <Link href="#" sx={{ color: "red" }}>
              Sign Up!
            </Link>
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
