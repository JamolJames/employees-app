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

export default function UpdateSalary({ handleClose, setIsLoading, id }) {
    const initialValues = {
        salary: "",
        fromDate: null,
        endDate: null,
        position: "",
        deptId: "",
        role: "",
    }
    const validationSchema = yup.object({
        salary: yup.string().required("Salary is required"),
        fromDate: yup.string().required("From Date is required"),
        endDate: yup.string().required("End Date is required"),
        position: yup.string().required("Position is required"),
    })

    const onSubmit = async () => {
        try {
            setIsLoading(true)
            const { salary, fromDate, endDate, position, role, deptId } = values
            await query(`employees/salary/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    salary: Number(salary),
                    from_date: fromDate,
                    to_date: endDate,
                    post: position,
                    role,
                    dept_no: deptId,
                }),
            })
            setIsLoading(false)
            handleClose()
        } catch (e) {
            console.error(e)
        }
    }

    const getDeptId = (value) => {
        setFieldValue("deptId", value, true)
    }

    const {
        touched,
        values,
        errors,
        handleChange,
        handleSubmit,
        setFieldValue,
    } = useFormik({
        initialValues,
        validationSchema,
        onSubmit,
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
                            name="position"
                            label="Position"
                            value={values.position}
                            onChange={handleChange}
                            error={touched.position && Boolean(errors.position)}
                            helperText={touched.position && errors.position}
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
