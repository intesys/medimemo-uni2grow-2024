import { useState, ChangeEvent, FormEvent } from "react";
import "./Login.css";
import {
  Button,
  TextField,
  Typography,
  IconButton,
  CircularProgress,
  Divider,
  Alert,
} from "@mui/material";

// import des images du logo
import mediMemoImg from "../../assets/images/MEDIMEMO.png";
import ohImg from "../../assets/images/Group.png";

// import pour les icones à la page de login
import frame1 from "../../assets/icons/Frame 1.png";
import frame2 from "../../assets/icons/Frame 2.png";
import frame3 from "../../assets/icons/Frame 3.png";

// Import validation functions
import { validateForm, validateField } from "../../utils/Validation";
import { useNavigate, Link } from "react-router-dom";

// Définir les types des objets
interface Credentials {
  username: string;
  password: string;
}

interface Errors {
  username?: string;
  password?: string;
}

// Le corps même du composant
export function Login() {
  const [credentials, setCredentials] = useState<Credentials>({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState<Errors>({});
  const [showAlert, setShowAlert] = useState(false);

  // Handle form field changes
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const fieldName = e.target.name;
    const value = e.target.value;

    setCredentials((prevState) => ({
      ...prevState,
      [fieldName]: value,
    }));

    // Validate the specific field on change
    const errorMessage = validateField(fieldName, value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: errorMessage,
    }));

    // Hide the alert if the username or the password is updated
    if (fieldName === "username" || fieldName === "password") {
      setShowAlert(false);
    }
  };

  const [logged, setLogged] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  // Pour la navigation
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const formErrors = validateForm(credentials);

      if (Object.keys(formErrors).length === 0) {
        setLoading(true);

        const result = await fetch("http://localhost:3000/users");
        const data = await result.json();

        setLoading(false);

        const user = data.find(
          (item: { username: string; password: string }) =>
            item.username === credentials.username &&
            item.password === credentials.password
        );
        if (user) {
          setLogged("successful user login !!!");
          navigate("/dashboard");
        } else {
          setShowAlert(true);
        }

        console.log(data);
      } else {
        setErrors(formErrors);
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
            {showAlert && (
              <Alert severity="error" sx={{ mb: 2, backgroundColor: "red" }}>
                Wrong Username or Password. Please try again!
              </Alert>
            )}

            <TextField
              id="username"
              label="Email or Username"
              name="username"
              value={credentials.username}
              onChange={handleChange}
              error={!!errors.username}
              helperText={errors.username}
              variant="outlined"
            />

            <TextField
              id="password"
              label="Password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              type="password"
              error={!!errors.password}
              helperText={errors.password}
              variant="outlined"
            />

            <Typography className="wronguser" textAlign="left">
              {logged}
            </Typography>

            <Typography textAlign="right">
              <Link to="#">Forgot password?</Link>
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
            <Link to="#" className="custom-link">
              Sign Up!
            </Link>
          </Typography>

          <Divider>or</Divider>
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
