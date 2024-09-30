import { useState } from "react"; 
//import ReactDOM from "react-dom/client";
import { Button, TextField, Typography,  IconButton, Divider, Stack, Alert } from "@mui/material";
import "./Login.css";
import logo from "../../assets/images/Group.png";
import appName from "../../assets/images/MEDIMEMO.png";
import apple from "../../assets/images/Apple.png";
import facebook from "../../assets/images/Facebook.png";
import google from "../../assets/images/Google.png";
import { validationField, validationForm, FormValue, FormError } from "../../utils/Validation";
import { useNavigate,Link } from "react-router-dom";


  
export function Login() {
    const [credentials, setCredentials] = useState<FormValue>({
      username: "",
      password: "",
    });
  
    const navigate = useNavigate();
  
    const [errors, setErrors] = useState<FormError>({});
    const [logged, setLogged] = useState<string>("");
    const [login, setLogin] = useState<string>("");
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const fieldName = e.target.name;
      const value = e.target.value;
      const error = validationField(fieldName, value);
  
      if (!error) {
        setErrors((prevState) => {
          const newState = { ...prevState };
          delete newState[fieldName];
          return newState;
        });
      } else {
        setErrors((prevState) => ({ ...prevState, [fieldName]: error }));
      }
  
      setCredentials((prevState) => {
        setLogin("");
        return { ...prevState, [fieldName]: value };
      });
    };
  
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
  
      try {
        const validationErrors = validationForm(credentials);
        if (Object.keys(validationErrors).length === 0) {
          const result = await fetch("http://localhost:3000/users");
          const data = await result.json();
  
          const exists = data.some(
            (item: { username: string; password: string }) =>
              item.username === credentials.username && item.password === credentials.password
          );
  
          if (exists) {
            setLogged("it's ok!!!");
            navigate("/dashboard");
          } else {
            setLogin("This is a filled error Alert.");
          }
        } else {
          setErrors(validationErrors);
        }
      } catch (e) {
        console.error(e);
      }
    };

  return (
    <div className="container">
      <div className="logo-container">
        <img className="logo" src={logo} alt="Logo" />
        <img className="appName" src={appName} alt="App Name" />
      </div>
      <div className="panel">
        <Typography fontWeight={700} fontSize={20} textAlign="center">
          Let&apos;s Sign You in!
        </Typography>

        {login && (
          <Stack sx={{ width: '100%' }} spacing={2}>
            <Alert variant="filled" severity="error">
              Username and password error !!
            </Alert>
          </Stack> 
        )}

        <form className="form-login" onSubmit={handleSubmit}>
          <TextField
            value={credentials.username}
            name="username"
            type="text"
            label="Email or Username"
            onChange={handleChange}
            error={!!errors.username}
            helperText={errors.username}
          />
          <TextField
            value={credentials.password}
            name="password"
            label="Password"
            type="password"
            onChange={handleChange}
            error={!!errors.password}
            helperText={errors.password}
          />
              
          <Typography textAlign="right">
            <Link to="/url">Forget password</Link>
          </Typography>
          <Button
            variant="contained"
            type="submit"
            sx={{ backgroundColor: "#F00" }}
          >
            Login
          </Button>
          <Typography>
            {logged}
          </Typography>
        </form>
        <Typography textAlign="center">
          Don&apos;t have an account? <Link to="/url">Sign up!</Link>
        </Typography>
        <Typography variant="body2" textAlign="center">or</Typography>
        <Divider />
        <div className="icon">
            <IconButton component={Link} to="/apple-link">
            <img src={apple} alt="Apple" />
            </IconButton>

            <IconButton component={Link} to="/google-link">
                <img src={google} alt="Google" />
            </IconButton>

            <IconButton component={Link} to="/facebook-link">
                <img src={facebook} alt="Facebook" />
            </IconButton>
        </div>
      </div>
    </div>
  );
}
