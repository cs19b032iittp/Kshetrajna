import CloseIcon from "@mui/icons-material/Close";
import {
  Alert, Box, Button,
  CircularProgress,
  Collapse, IconButton,
  Stack,
  TextField, Typography
} from "@mui/material";
import { Form, FormikProvider, useFormik } from "formik";
import { motion } from "framer-motion";
import React from "react";
import * as Yup from "yup";

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

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




const AddField = () => {

  const [open, setOpen] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);

  const [date, setDate] = React.useState('');

  const handleDateChange = (newValue) => {
    setDate(newValue);
  };

  const AddFieldSchema = Yup.object().shape({
    farm: Yup.string()
      .required("farm type is required"),
    soil: Yup.string()
      .required("soil type is required"),
    date: Yup.date().nullable()
  });

  const formik = useFormik({
    initialValues: {
      farm: "",
      date: "",
    },
    validationSchema: AddFieldSchema,
    onSubmit: (values, { resetForm }, props) => {
      console.log("Submitting Form")
      setOpen(false);
      setSubmitting(true);

      console.log(values);
      resetForm();
      setSubmitting(false);
      setOpen(true);
      setTimeout(() => {
        setOpen(false);
      }, 2000);
    },
  });

  const { errors, touched, getFieldProps } = formik;


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

            <Box sx={{ width: "100%" }}>
              <Collapse in={open}>
                <Alert
                  severity="success"
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
                  {'Your field has been added!'}
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
                    spacing={2}
                  >
                    <TextField
                      fullWidth
                      label="Farm"
                      {...getFieldProps("farm")}
                      error={Boolean(touched.farm && errors.farm)}
                      helperText={touched.farm && errors.farm}
                    />

                    <TextField
                      fullWidth
                      label="Soil"
                      {...getFieldProps("soil")}
                      error={Boolean(touched.soil && errors.soil)}
                      helperText={touched.soil && errors.soil}
                    />

                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DesktopDatePicker
                        label="Plantation date"
                        inputFormat="MM/DD/YYYY"
                        value={date}
                        onChange={handleDateChange}

                        renderInput={(params) => <TextField {...params}

                          error={Boolean(touched.date && errors.date)}
                          helperText={touched.date && errors.date} />}
                      />
                    </LocalizationProvider>
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
                      disabled={submitting}
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

export default AddField;
