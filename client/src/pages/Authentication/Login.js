import CloseIcon from '@mui/icons-material/Close';
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import {
    Alert, Box, Button, Checkbox, CircularProgress,
    Collapse, FormControlLabel, IconButton, InputAdornment, Link, Stack,
    TextField, Typography
} from "@mui/material";
import axios from "axios";
import { APIService } from 'config';
import { Form, FormikProvider, useFormik } from "formik";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import * as Yup from "yup";

let easing = [0.6, -0.05, 0.01, 0.99];
const fadeInUp = {
    initial: {
        y: 60,
        opacity: 0,
        transition: { duration: 0.6, ease: easing },
    },
    animate: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.6,
            ease: easing,
        },
    },
};

const animate = {
    opacity: 1,
    y: 0,
    transition: {
        duration: 0.6,
        ease: easing,
        delay: 0.16,
    },
};

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const [error, setError] = React.useState("");
    const [open, setOpen] = React.useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [authenticating, setAuthenticating] = React.useState(false);

    useEffect(() => {
        if (localStorage.getItem("authToken")) {
            navigate("/");
        }
    });

    const LoginSchema = Yup.object().shape({
        email: Yup.string()
            .email("Provide a valid email address")
            .required("Email is required"),
        password: Yup.string().required("Password is required"),
    });

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            remember: true,
        },
        validationSchema: LoginSchema,
        onSubmit: async (values, props) => {
            setOpen(false);
            setAuthenticating(true);

            const config = {
                header: {
                    "Content-Type": "application/json",
                },
            };

            const email = values.email;
            const password = values.password;

            try {
                const url = APIService + "/api/auth/login"

                const { data } = await axios.post(
                    url,
                    {
                        email,
                        password
                    },
                    config
                );


                localStorage.setItem("authToken", data.token);

                console.log("Login sucessful");
                setAuthenticating(false)
                navigate(from, { replace: true });

            } catch (error) {
                setAuthenticating(false);
                setError(error.response.data.error);
                setOpen(true);
               
                console.log(error.response.data);

                setTimeout(() => { setOpen(false) }, 5000);

            }
        },
    });

    const { errors, touched, values, getFieldProps } = formik;

    return (
        <Box>
            <Typography sx={{ color: "text.secondary", mb: 1, mt: 3 }}>
                Login to your account
            </Typography>

            <Box sx={{ width: '100%', pt: 1 }}>
                <Collapse in={open} >

                    <Alert severity="error"
                        action={

                            <IconButton
                                aria-label="close"
                                color="inherit"
                                size="small"
                                onClick={() => {
                                    setOpen(false);
                                }}
                            >
                                <CloseIcon fontSize="inherit" />

                            </IconButton>
                        }
                        sx={{ mb: 2 }}
                    >
                        {error}

                    </Alert>

                </Collapse>
            </Box>

            <FormikProvider value={formik}>
                <Form>
                    <Box
                        component={motion.div}
                        animate={{
                            transition: {
                                staggerChildren: 0.55,
                            },
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 3,
                            }}
                            component={motion.div}
                            initial={{ opacity: 0, y: 40 }}
                            animate={animate}
                        >
                            <TextField
                                fullWidth
                                autoComplete="username"
                                type="email"
                                label="Email Address"
                                {...getFieldProps("email")}
                                error={Boolean(touched.email && errors.email)}
                                helperText={touched.email && errors.email}
                            />

                            <TextField
                                fullWidth
                                autoComplete="current-password"
                                type={showPassword ? "text" : "password"}
                                label="Password"
                                {...getFieldProps("password")}
                                error={Boolean(touched.password && errors.password)}
                                helperText={touched.password && errors.password}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={() => setShowPassword((prev) => !prev)}
                                            >
                                                {showPassword ? (
                                                    <VisibilityIcon />
                                                ) : (
                                                    <VisibilityOffIcon />
                                                )}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Box>

                        <Box
                            component={motion.div}
                            initial={{ opacity: 0, y: 20 }}
                            animate={animate}
                        >
                            <Stack
                                direction="row"
                                alignItems="center"
                                justifyContent="space-between"
                                sx={{ my: 2 }}
                            >
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            {...getFieldProps("remember")}
                                            checked={values.remember}
                                        />
                                    }
                                    label="Remember me"
                                />

                                <Link
                                    component={RouterLink}
                                    variant="subtitle2"
                                    to="/forgotpassword"
                                    underline="hover"
                                >
                                    Forgot password?
                                </Link>
                            </Stack>

                            <Button
                                fullWidth
                                size="large"
                                type="submit"
                                variant="contained"
                                disabled={authenticating}
                            >
                                {authenticating ? (
                                    <CircularProgress color="grey" />
                                ) : (
                                    "Login"
                                )}
                            </Button>
                        </Box>
                    </Box>
                </Form>
            </FormikProvider>

            <Typography
                component={motion.p}
                {...fadeInUp}
                variant="body2"
                align="center"
                sx={{ mt: 3 }}
            >
                Don’t have an account?{" "}
                <Link
                    color="primary"
                    component={RouterLink}
                    to="/signup"
                    underline="hover"
                >
                    Sign up
                </Link>
            </Typography>
        </Box>
    );
};

export default Login;
