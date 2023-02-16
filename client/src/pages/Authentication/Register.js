import CloseIcon from "@mui/icons-material/Close";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import {
    Alert, Box, Button,
    CircularProgress,
    Collapse, IconButton, InputAdornment, Link, Stack,
    TextField, Typography
} from "@mui/material";
import axios from "axios";
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

const Register = () => {
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

    const SignupSchema = Yup.object().shape({
        firstName: Yup.string()
            .min(2, "Too Short!")
            .max(50, "Too Long!")
            .required("First name required"),
        lastName: Yup.string().max(50, "Too Long!").required("Last name required"),
        email: Yup.string()
            .email("Email must be a valid email address")
            .required("Email is required"),
        password: Yup.string().required("Password is required"),
    });

    const formik = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
        },
        validationSchema: SignupSchema,
        onSubmit: async (values, props) => {
            setOpen(false);
            setAuthenticating(true);

            const config = {
                header: {
                    "Content-Type": "application/json",
                },
            };

            try {
                const { data } = await axios.post("/api/auth/register", values, config);

                localStorage.setItem("authToken", data.token);

                console.log("Login sucessful");
                setAuthenticating(false);
                navigate(from, { replace: true });
            } catch (error) {
                setAuthenticating(false);
                setError(error.response.data.error);
                setOpen(true);
                console.log("data");
                console.log(error.response.data);

                setTimeout(() => {
                    setOpen(false);
                }, 5000);
            }
        },
    });

    const { errors, touched, getFieldProps } = formik;

    return (
        <Box>

            <Typography sx={{ color: "text.secondary", mt: 4, mb: 2 }}>
                Enter your details to create an account
            </Typography>

            <Box sx={{ width: "100%", pt: 1 }}>
                <Collapse in={open}>
                    <Alert
                        severity="error"
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
                    <Stack spacing={3}>
                        <Stack
                            component={motion.div}
                            initial={{ opacity: 0, y: 60 }}
                            animate={animate}
                            direction={{ xs: "column", sm: "row" }}
                            spacing={2}
                        >
                            <TextField
                                fullWidth
                                label="First name"
                                {...getFieldProps("firstName")}
                                error={Boolean(touched.firstName && errors.firstName)}
                                helperText={touched.firstName && errors.firstName}
                            />

                            <TextField
                                fullWidth
                                label="Last name"
                                {...getFieldProps("lastName")}
                                error={Boolean(touched.lastName && errors.lastName)}
                                helperText={touched.lastName && errors.lastName}
                            />
                        </Stack>

                        <Stack
                            spacing={3}
                            component={motion.div}
                            initial={{ opacity: 0, y: 40 }}
                            animate={animate}
                        >
                            <TextField
                                fullWidth
                                autoComplete="username"
                                type="email"
                                label="Email address"
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
                                error={Boolean(touched.password && errors.password)}
                                helperText={touched.password && errors.password}
                            />
                        </Stack>

                        <Box
                            component={motion.div}
                            initial={{ opacity: 0, y: 20 }}
                            animate={animate}
                        >
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
                                    "Register"
                                )}
                            </Button>
                        </Box>
                    </Stack>
                </Form>
            </FormikProvider>

            <Typography
                component={motion.p}
                {...fadeInUp}
                variant="body2"
                align="center"
                sx={{ mt: 3 }}
            >
                Have an account?{" "}
                <Link
                    color="primary"
                    component={RouterLink}
                    to="/login"
                    underline="hover"
                >
                    Login
                </Link>
            </Typography>
        </Box>
    );
};

export default Register;
