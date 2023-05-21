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

export default function UpdateBio({ handleClose, empId }) {
  const validationSchema = yup.object({
    firstName: yup.string().required("Email is required"),
    lastName: yup.string().required("Password is required"),
    gender: yup.string().required("Gender is required"),
    dob: yup.string().required("Dob is required"),
  })

  const { touched, values, errors, handleChange, handleSubmit, setFieldValue } =
    useFormik({
      initialValues: {
        firstName: "",
        lastName: "",
        gender: "",
        dob: null,
      },
      validationSchema: validationSchema,
      onSubmit: () => {
        const { firstName, lastName, ...rest } = values
        fetch(`${process.env.REACT_APP_BASE_URL}/employees/${empId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            first_name: firstName,
            last_name: lastName,
            ...rest,
          }),
        })
      },
    })
  return (
    <Dialog open={true} onClose={handleClose}>
      <DialogTitle>Update Employee</DialogTitle>
      <DialogContent>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Stack
            component="form"
            onSubmit={handleSubmit}
            gap={3}
            sx={{ minWidth: "480px", padding: 2 }}
          >
            <TextField
              fullWidth
              name="firstName"
              label="First Name"
              value={values.firstName}
              onChange={handleChange}
              error={touched.firstName && Boolean(errors.firstName)}
              helperText={touched.firstName && errors.firstName}
            />
            <TextField
              fullWidth
              name="lastName"
              label="Last Name"
              value={values.lastName}
              onChange={handleChange}
              error={touched.lastName && Boolean(errors.lastName)}
              helperText={touched.lastName && errors.lastName}
            />
            <TextField
              fullWidth
              name="gender"
              label="Gender"
              value={values.gender}
              onChange={handleChange}
              error={touched.gender && Boolean(errors.gender)}
              helperText={touched.gender && errors.gender}
            />
            <DatePicker
              label="DOB"
              value={values.dob}
              onChange={(value) => setFieldValue("dob", value, true)}
              renderInput={(params) => (
                <TextField
                  error={Boolean(touched.dob && errors.dob)}
                  helperText={touched.dob && errors.dob}
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
