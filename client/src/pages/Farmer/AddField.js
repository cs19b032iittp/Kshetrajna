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
import Autocomplete from '@mui/material/Autocomplete';
import axios from "axios";
import { FarmerService } from "config";

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
  const [consultants, setConsultants] = React.useState(["Vivek", "Aditya", "Yashwanth"]);
  const [submitting, setSubmitting] = React.useState(false);

  const [date, setDate] = React.useState('');

  const handleDateChange = (newValue) => {
    setDate(newValue);
  };

  //TODO: pass date as date object
  const AddFieldSchema = Yup.object().shape({
    farm: Yup.string()
      .required("farm type is required"),
    soil: Yup.string()
      .required("soil type is required"),
    season: Yup.string()
      .required("season is required"),
    date: Yup.string()
      .required("date is required"),
    consultant: Yup.string()
      .required("consultant is required"),
  });

  const formik = useFormik({
    initialValues: {
      farm: "",
      soil: "",
      season: "",
      date: "",
      consultant: ""
    },
    validationSchema: AddFieldSchema,
    onSubmit: async (values, { resetForm }, props) => {
      console.log("Submitting Form")
      setOpen(false);
      setSubmitting(true);

      let img = ''
      switch (values.farm) {
        case 'Paddy':
          img = 'https://cdn.britannica.com/89/140889-050-EC3F00BF/Ripening-heads-rice-Oryza-sativa.jpg'
          break;
        case 'Sugar Cane':
          img = 'https://t0.gstatic.com/licensed-image?q=tbn:ANd9GcQFUmCbrbIsGEKL_jmd8PZH0WuKoEgXAtwE0gYbTjJI-N4frgDNYWi6DEN7by8phYkLaQoLwHy1f8NHtGw'
          break;
        case 'Mango':
          img = 'https://cdn.britannica.com/05/75905-050-C7AE0733/Mangoes-tree.jpg'
          break;
        default:
          break
      }

      values = {
        ...values,
        farmerId: "63e537d68b30684dfff02a60",
        consultantId: "63e539ebce9f46c959482e85",
        img: img
      }
      console.log(values);

      const config = {
        header: {
          "Content-Type": "application/json",
        },
      };

      const url = FarmerService + '/api/farmer/crops/addcrop'
      console.log(url)

      try {
        const { data } = await axios.put(url, values, config);

        console.log(data)
        resetForm();
        setSubmitting(false);
        setOpen(true);
        setTimeout(() => {
          setOpen(false);
        }, 2000);

        // localStorage.setItem("authToken", data.token);

        // console.log("Login sucessful");
        // setAuthenticating(false)
        // navigate(from, { replace: true });

      } catch (error) {

        setSubmitting(false);

        alert(error.message)


      }

    },
  });

  const { errors, touched, getFieldProps, setFieldValue } = formik;


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

                    <TextField
                      fullWidth
                      label="Season"
                      {...getFieldProps("season")}
                      error={Boolean(touched.season && errors.season)}
                      helperText={touched.season && errors.season}
                    />

                    <TextField
                      fullWidth
                      label="Plantation date"
                      {...getFieldProps("date")}

                      placeholder="YYYY/MM/DD"
                      error={Boolean(touched.date && errors.date)}
                      helperText={touched.date && errors.date}
                    />

                    <Autocomplete
                      fullWidth
                      disablePortal
                      id="combo-box-demo"
                      options={consultants}
                      {...getFieldProps("consultant")}
                      onChange={(e, value) => {
                        setFieldValue("consultant", value)
                      }}
                      renderInput={(params) => <TextField {...params} label="Consultant" error={Boolean(touched.consultant && errors.consultant)}
                        helperText={touched.consultant && errors.consultant} />}
                    />

                    {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DesktopDatePicker
                        label="Plantation date"
                        inputFormat="MM/DD/YYYY"
                        value={date}
                        onChange={handleDateChange}

                        renderInput={(params) => <TextField {...params}

                          error={Boolean(touched.date && errors.date)}
                          helperText={touched.date && errors.date} />}
                      />
                    </LocalizationProvider> */}
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
