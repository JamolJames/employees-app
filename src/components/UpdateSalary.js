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
import { query } from "../util/query"

export default function UpdateSalary({ handleClose, setIsLoading, id }) {
  const validationSchema = yup.object({
    salary: yup.string().required("Email is required"),
    fromDate: yup.string().required("Password is required"),
    endDate: yup.string().required("Gender is required"),
    position: yup.string().required("Dob is required"),
    role: yup.string().required("Dob is required"),
    dept: yup.string().required("Dob is required"),
  })

  const { touched, values, errors, handleChange, handleSubmit, setFieldValue } =
    useFormik({
      initialValues: {
        salary: "",
        fromDate: null,
        endDate: null,
        position: "",
        role: "",
        dept: "",
      },
      validationSchema: validationSchema,
      onSubmit: () => {
        try {
          setIsLoading(true)
          const { salary, fromDate, ...rest } = values
          query(`/employees/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              salary: salary,
              from_date: fromDate,
              ...rest,
            }),
          })
          setIsLoading(false)
        } catch (e) {
          console.error(e)
        }
      },
    })
  return (
    <Dialog open={true} onClose={handleClose}>
      <DialogTitle>Update Salary Entry</DialogTitle>
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
              name="salary"
              label="Salary"
              value={values.salary}
              onChange={handleChange}
              error={touched.salary && Boolean(errors.salary)}
              helperText={touched.salary && errors.salary}
            />

            <DatePicker
              label="From Date"
              value={values.fromDate}
              onChange={(value) => setFieldValue("fromDate", value, true)}
              renderInput={(params) => (
                <TextField
                  error={Boolean(touched.dob && errors.dob)}
                  helperText={touched.dob && errors.dob}
                  label="fromDate"
                  name="fromDate"
                  fullWidth
                  {...params}
                />
              )}
            />
            <DatePicker
              label="End Date"
              value={values.endDate}
              onChange={(value) => setFieldValue("endDate", value, true)}
              renderInput={(params) => (
                <TextField
                  error={Boolean(touched.dob && errors.dob)}
                  helperText={touched.dob && errors.dob}
                  label="endDate"
                  name="endDate"
                  fullWidth
                  {...params}
                />
              )}
            />
            <TextField
              fullWidth
              name="position"
              label="Position"
              value={values.position}
              onChange={handleChange}
              error={touched.salary && Boolean(errors.salary)}
              helperText={touched.salary && errors.salary}
            />
            <TextField
              fullWidth
              name="role"
              label="Role"
              value={values.role}
              onChange={handleChange}
              error={touched.salary && Boolean(errors.salary)}
              helperText={touched.salary && errors.salary}
            />
            <TextField
              fullWidth
              name="dept_name"
              label="Department"
              value={values.dept_name}
              onChange={handleChange}
              error={touched.salary && Boolean(errors.salary)}
              helperText={touched.salary && errors.salary}
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
