import { useEffect } from "react"
import { useFormik } from "formik"
import {
  Stack,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material"
import * as yup from "yup"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"

export default function UpdateBio({ handleClose }) {
  const validationSchema = yup.object({
    firstName: yup.string().required("Email is required"),
    lastName: yup.string().required("Password is required"),
    gender: yup.string().required("Gender is required"),
    dob: yup.string().required("Dob is required"),
  })

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      gender: "",
      dob: null,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      fetch(`${process.env.REACT_APP_BASE_URL}/employees`)
    },
  })
  return (
    <Dialog open={true} onClose={handleClose}>
      <DialogTitle>Update Employee</DialogTitle>
      <DialogContent>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Stack
            component="form"
            onSubmit={formik.handleSubmit}
            gap={3}
            sx={{ minWidth: "480px", padding: 2 }}
          >
            <TextField
              fullWidth
              name="firstName"
              label="First Name"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              error={
                formik.touched.firstName && Boolean(formik.errors.firstName)
              }
              helperText={formik.touched.firstName && formik.errors.firstName}
            />
            <TextField
              fullWidth
              name="lastName"
              label="Last Name"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              helperText={formik.touched.lastName && formik.errors.lastName}
            />
            <TextField
              fullWidth
              name="gender"
              label="Gender"
              value={formik.values.gender}
              onChange={formik.handleChange}
              error={formik.touched.gender && Boolean(formik.errors.gender)}
              helperText={formik.touched.gender && formik.errors.gender}
            />
            <DatePicker
              label="DOB"
              value={formik.values.dob}
              onChange={(value) => formik.setFieldValue("dob", value, true)}
              renderInput={(params) => (
                <TextField
                  error={Boolean(formik.touched.dob && formik.errors.dob)}
                  helperText={formik.touched.dob && formik.errors.dob}
                  label="Birthday"
                  name="dob"
                  fullWidth
                  {...params}
                />
              )}
            />
            <Button color="primary" variant="outlined" fullWidth type="submit">
              Submit
            </Button>
          </Stack>
        </LocalizationProvider>
      </DialogContent>
    </Dialog>
  )
}
