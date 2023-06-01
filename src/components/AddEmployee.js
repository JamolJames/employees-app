import { useState } from "react"
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
import DepartmentMenu from "./DepartmentMenu"

export default function AddEmployee({ handleClose, setIsLoading }) {
    const [deptId, setDeptId] = useState("")

    const getDeptId = (deptId) => {
        console.log(deptId)
        setDeptId(deptId)
    }

    const validationSchema = yup.object({
        firstName: yup.string().required("First name is required"),
        lastName: yup.string().required("Last name is required"),
        gender: yup.string().required("Gender is required"),
        dob: yup.string().required("Dob is required"),
    })

    const {
        touched,
        values,
        errors,
        handleChange,
        handleSubmit,
        setFieldValue,
    } = useFormik({
        initialValues: {
            empId: "",
            firstName: "",
            lastName: "",
            gender: "",
            dob: null,
            salary: "",
            fromDate: null,
            endDate: null,
            role: "",
            post: "",
            // deptName: null,
            // deptId: null,
        },
        validationSchema,
        onSubmit: async () => {
            try {
                setIsLoading(true)
                const {
                    empId,
                    firstName,
                    lastName,
                    fromDate,
                    endDate,
                    salary,
                    ...rest
                } = values
                console.log(values)
                await query("employees", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        emp_id: empId,
                        first_name: firstName,
                        last_name: lastName,
                        from_date: fromDate,
                        to_date: endDate,
                        salary: Number(salary),
                        ...rest,
                        dept_no: deptId,
                    }),
                })
                setIsLoading(false)
                handleClose()
            } catch (e) {
                console.error(e)
            }
        },
    })

    return (
        <Dialog open={true} onClose={handleClose}>
            <DialogTitle>Add Employee</DialogTitle>
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
                            name="empId"
                            label="Employee Id"
                            value={values.empId}
                            onChange={handleChange}
                            error={touched.empId && Boolean(errors.empId)}
                            helperText={touched.empId && errors.empId}
                        />
                        <TextField
                            fullWidth
                            name="firstName"
                            label="First Name"
                            value={values.firstName}
                            onChange={handleChange}
                            error={
                                touched.firstName && Boolean(errors.firstName)
                            }
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
                            onChange={(value) =>
                                setFieldValue("dob", value, true)
                            }
                            textField={(params) => (
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
                            onChange={(value) =>
                                setFieldValue("fromDate", value, true)
                            }
                            textField={(params) => (
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
                            onChange={(value) =>
                                setFieldValue("endDate", value, true)
                            }
                            textField={(params) => (
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
                            name="post"
                            label="Position"
                            value={values.post}
                            onChange={handleChange}
                            error={touched.post && Boolean(errors.post)}
                            helperText={touched.post && errors.post}
                        />
                        <TextField
                            fullWidth
                            name="role"
                            label="Role"
                            value={values.role}
                            onChange={handleChange}
                            error={touched.role && Boolean(errors.role)}
                            helperText={touched.role && errors.role}
                        />
                        <DepartmentMenu getDeptId={getDeptId} />

                        <Button
                            color="primary"
                            variant="outlined"
                            fullWidth
                            type="submit"
                        >
                            Submit
                        </Button>
                    </Stack>
                </LocalizationProvider>
            </DialogContent>
        </Dialog>
    )
}
