import {
    Box, Button,
    CircularProgress, Paper, Stack,
    TextField, Typography
} from "@mui/material";
import { Form, FormikProvider, useFormik } from "formik";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import DragAndDrop from "./DragAndDrop";

let easing = [0.6, -0.05, 0.01, 0.99];

const animate = {
    opacity: 1,
    y: 0,
    transition: {
        duration: 0.6,
        ease: easing,
        delay: 0.16,
    },
};

const Prediction = () => {

    const [submitting, setSubmitting] = React.useState(false);
    const [img, setImg] = useState(undefined)
    useEffect(() => {
        console.log(img)

    }, [img])

    const RequestSchema = Yup.object().shape({
        farm: Yup.string()
            .required("farm type is required"),
        description: Yup.string().required("description required"),
    });

    const formik = useFormik({
        initialValues: {
            farm: "",
            description: "",
        },
        validationSchema: RequestSchema,
        onSubmit: async (values, { resetForm }, props) => {
            resetForm()
            setImg(undefined)
            setSubmitting(false);
        }
    });

    const { errors, touched, getFieldProps } = formik;

    const Display = (props) => {
        const img = props.img.preview
        return (
            <>
                <Box>
                    <Paper
                        sx={{
                            position: 'relative',
                            backgroundColor: 'white',
                            color: '#fff',
                            height: 450,
                            width: 400,
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'bottom',
                            backgroundImage: `url(${img})`,
                        }}
                    />
                </Box>
            </>
        )
    }

    return (
        <>
            <Box
                sx={{
                    background: "rgb(249, 250, 251)",
                    height: "100vh",
                    p: 5,
                }}
                color="neutral"
                variant="soft"
            >
                <Box
                    sx={{
                        background: "#fff",
                        maxWidth: 480,
                        padding: 5,
                        margin: "auto",
                        display: "flex",
                        justifyContent: "center",
                        flexDirection: "column",
                    }}
                >
                    <Box>
                        <Typography sx={{ color: "text.secondary", mb: 5 }}>
                            Enter the details below,
                        </Typography>
                        <FormikProvider value={formik}>
                            <Form>
                                <Stack spacing={3}>
                                    <Stack
                                        component={motion.div}
                                        initial={{ opacity: 0, y: 60 }}
                                        animate={animate}
                                        spacing={2}
                                    >
                                        <TextField
                                            fullWidth
                                            label="Farm"
                                            {...getFieldProps("farm")}
                                            error={Boolean(touched.firstName && errors.firstName)}
                                            helperText={touched.firstName && errors.firstName}
                                        />

                                        <TextField
                                            fullWidth
                                            multiline
                                            rows={4}
                                            label="Description"
                                            {...getFieldProps("description")}
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

                                        {!img ? <DragAndDrop setImg={setImg} /> : <Display img={img} />}

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
                                            disabled={submitting || !img}
                                        >
                                            {submitting ? (
                                                <CircularProgress color="grey" />
                                            ) : (
                                                "Submit"
                                            )}
                                        </Button>
                                    </Box>
                                </Stack>
                            </Form>
                        </FormikProvider>


                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default Prediction;
