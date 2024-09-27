import "./Login.css"

import { Alert, Button, Snackbar, SnackbarCloseReason, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/images/logo-color.svg";
import MediMemo from "../../assets/images/MEDIMEMO.svg";
import Apple from "../../assets/images/login/apple.svg";
import Google from "../../assets/images/login/google.svg";
import Facebook from "../../assets/images/login/facebook.svg";
import React, { useState } from "react";
import { validateForm, validationField } from "../../utils/validation";

function Login() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        username: "",
        password: "",
    });
    const [errors, setErrors] = useState({
        username: "",
        password: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const fieldName = e.target.name;
        const value = e.target.value;
        const error = validationField(fieldName, value);
        //const isvalid = isNoEmpty(value);
        if (!error) {
            setErrors((prevState) => ({ ...prevState, [fieldName]: "" }));
        } else {
            setErrors((prevState) => ({ ...prevState, [fieldName]: error }));
        }

        setForm((prevState) => {
            return { ...prevState, [fieldName]: value };
        });
    };

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const errors = validateForm(form);
        if (Object.keys(errors).length === 0) {
            const result = await fetch("http://localhost:3000/users");
            const data = await result.json();
            const test = data.some((item) => item.username === form.username && item.password === form.password);
            if (test) {
                console.log("Login Successful");
                navigate("/dashboard");
            } else {
                setOpen(true);
            }
            console.log(data);
            setForm({ username: "", password: "" });
            // console.log(form);
        } else {
            setErrors(errors);
        }
    };

    const [open, setOpen] = React.useState(false);

    const handleClose = (
        event?: React.SyntheticEvent | Event,
        reason?: SnackbarCloseReason,
    ) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    return (
        <div className="container">
            <div className="logo-container">
                <img src={Logo} alt="Logo" />
                <img src={MediMemo} alt="MediMemo" />
            </div>
            <form onSubmit={handleLogin}>
                <div className="secondary">
                    <div className="title">{`Let's Sign You in`}</div>

                    <TextField
                        fullWidth
                        variant="outlined"
                        label="Email or Username"
                        onBlur={validateForm}
                        name="username"
                        value={form.username}
                        onChange={handleChange}
                        error={!!errors.username}
                        helperText={errors.username}
                    ></TextField>
                    <TextField
                        id="outlined-password-input"
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                        onBlur={validateForm}
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        error={!!errors.password}
                        helperText={errors.password}
                    />
                    <div className="forgot-password">Forgot Password?</div>
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{
                            backgroundColor: "red",
                            color: "white",
                            fontWeight: "bold",
                            padding: "10px 20px",
                            borderRadius: "5px",
                        }}
                    >
                        Login
                    </Button>
                    <div className="sign-up">
                        {`Don't have an account? `}
                        <span>Sign Up!</span>
                    </div>
                    <div className="divider-container">
                        <div className="divider"></div>
                        <span>or</span>
                        <div className="divider"></div>
                    </div>
                    <div className="buttons">
                        <Button variant="outlined" color="inherit" sx={{ px: "30px" }}>
                            <img className="image" src={Apple} alt="Apple" />
                        </Button>
                        <Button variant="outlined" color="inherit" sx={{ px: "30px" }}>
                            <img className="image" src={Google} alt="Apple" />
                        </Button>
                        <Button variant="outlined" color="inherit" sx={{ px: "30px" }}>
                            <img className="image" src={Facebook} alt="Apple" />
                        </Button>
                    </div>
                    <Snackbar
                        open={open}
                        autoHideDuration={6000}
                        onClose={handleClose}
                        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                    >
                        <Alert
                            onClose={handleClose}
                            severity="error"
                            variant="filled"
                            sx={{ width: '100%' }}
                        >
                            Invalid Username or password !!!
                        </Alert>
                    </Snackbar>
                </div>
            </form>
        </div>
    );
}

export default Login;