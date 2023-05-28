import { useState } from "react"
import {
    Button,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from "@mui/material"
import GenderMenu from "./GenderMenu"
import DepartmentMenu from "./DepartmentMenu"
import { query } from "../util/query"

export default function AddEmployee({ handleClose, setIsLoading }) {
    const [empId, setEmpId] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [salary, setSalary] = useState("")
    const [fromDate, setFromDate] = useState("")
    const [endDate, setEndDate] = useState("")
    const [role, setRole] = useState("")
    const [post, setPost] = useState("")
    const [dob, setDob] = useState("")
    const [gender, setGender] = useState("")
    const [deptName, setDeptName] = useState("")
    const [deptId, setDeptId] = useState("")

    const getGender = (gender) => {
        setGender(gender)
    }

    const getDeptName = (deptName) => {
        setDeptName(deptName)
    }

    const getDeptId = (deptId) => {
        setDeptId(deptId)
    }

    const handleSumbit = async (e) => {
        setIsLoading(true)
        const data = {
            emp_deptId: empId,
            first_name: firstName,
            last_name: lastName,
            salary: salary,
            from_date: fromDate,
            to_date: endDate,
            role: role,
            post: post,
            dob: dob,
            gender: gender,
            deptName_no: deptId,
        }
        e.preventDefault()
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }

        try {
            await query(`/employees`, options)

            handleClose()
        } catch (e) {
            console.error(e)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Dialog open={true} onClose={handleClose}>
            <DialogTitle>Add Employee</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="empId"
                    label="Employee ID"
                    type="string"
                    fullWidth
                    variant="standard"
                    onChange={(e) => {
                        setEmpId(e.target.value)
                    }}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="firstName"
                    label="First Name"
                    type="string"
                    fullWidth
                    variant="standard"
                    value={firstName}
                    onChange={(e) => {
                        setFirstName(e.target.value)
                    }}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="lastName"
                    label="Last Name"
                    type="string"
                    fullWidth
                    variant="standard"
                    value={lastName}
                    onChange={(e) => {
                        setLastName(e.target.value)
                    }}
                />

                <label className="Form" style={{ color: "grey" }}>
                    DOB:
                </label>
                <TextField
                    autoFocus
                    margin="dense"
                    id="dob"
                    type="date"
                    fullWidth
                    variant="standard"
                    value={dob}
                    onChange={(e) => {
                        setDob(e.target.value)
                    }}
                />
                <GenderMenu getGender={getGender} />
                <DepartmentMenu
                    getDeptName={getDeptName}
                    getDeptId={getDeptId}
                />

                <TextField
                    autoFocus
                    margin="dense"
                    id="role"
                    label="Role"
                    type="string"
                    fullWidth
                    variant="standard"
                    value={role}
                    onChange={(e) => {
                        setRole(e.target.value)
                    }}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="post"
                    label="Position"
                    type="string"
                    fullWidth
                    variant="standard"
                    value={post}
                    onChange={(e) => {
                        setPost(e.target.value)
                    }}
                />

                <TextField
                    autoFocus
                    margin="dense"
                    id="salary"
                    label="Salary"
                    fullWidth
                    variant="standard"
                    onChange={(e) => setSalary(Number(e.target.value))}
                />
                <label className="Form" style={{ color: "grey" }}>
                    From Date:
                </label>
                <TextField
                    autoFocus
                    margin="dense"
                    id="fromDate"
                    fullWidth
                    variant="standard"
                    onChange={(e) => setFromDate(e.target.value)}
                />
                <label className="Form" style={{ color: "grey" }}>
                    End Date:
                </label>
                <TextField
                    autoFocus
                    margin="dense"
                    id="endDate"
                    type="date"
                    fullWidth
                    variant="standard"
                    onChange={(e) => setEndDate(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={async (e) => await handleSumbit(e)}>
                    Submit
                </Button>
            </DialogActions>
        </Dialog>
    )
}
