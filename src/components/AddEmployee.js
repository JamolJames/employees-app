import { useState } from "react";
import {
    Button,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
} from "@mui/material";
import AddCircle from "@mui/icons-material/AddCircle";
import GenderMenu from "./GenderMenu";
import DepartmentMenu from "./DepartmentMenu";

export default function AddEmployee({ addInfo, rows }) {
    const [open, setOpen] = useState(false);
    const [empId, setEmpId] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [salary, setSalary] = useState("");
    const [fromDate, setFromDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [role, setRole] = useState("");
    const [post, setPost] = useState("");
    const [dob, setDob] = useState("");
    const [gender, setGender] = useState("");
    const [dept, setDept] = useState("");
    const [id, setId] = useState("");

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const getGender = (gender) => {
        setGender(gender);
    };

    const getDepartment = (dept) => {
        setDept(dept);
    };

    const getId = (id) => {
        setId(id);
    };

    // Brings up Problems in console
    // useEffect(() => {
    //     const found = rows.find((employee) => employee.empId === empId);
    //     if (found) {
    //         setFirstName(found.firstName);
    //         setLastName(found.lastName);
    //         setDob(found.dob);
    //         setGender(found.gender);
    //     }
    // }, [empId, rows]);

    return (
        <div>
            <IconButton size="small" sx={{ color: "#8b0000" }} onClick={handleClickOpen}>
                <AddCircle></AddCircle>
            </IconButton>

            <Dialog open={open} onClose={handleClose}>
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
                            setEmpId(e.target.value);
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
                            setFirstName(e.target.value);
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
                            setLastName(e.target.value);
                        }}
                    />
                    <label className="DOB" style={{ color: "grey" }}>
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
                            setDob(e.target.value);
                        }}
                    />
                    <GenderMenu getGender={getGender} />
                    <DepartmentMenu getDepartment={getDepartment} getId={getId} />

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
                            setRole(e.target.value);
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
                            setPost(e.target.value);
                        }}
                    />

                    <TextField
                        autoFocus
                        margin="dense"
                        id="salary"
                        label="Salary"
                        type="number"
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
                        type="date"
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
                    <Button
                        onClick={(e) => {
                            const data = {
                                emp_id: empId,
                                first_name: firstName,
                                last_name: lastName,
                                salary: salary,
                                from_date: fromDate,
                                to_date: endDate,
                                role: role,
                                post: post,
                                dob: dob,
                                gender: gender,
                                dept_no: id,
                            };
                            e.preventDefault();
                            const options = {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify(data),
                            };

                            fetch(`${process.env.REACT_APP_BASE_URL}/api/employees`, options)
                                .then((response) => response.json())
                                .then((data) => {
                                    console.log(data); // do something with the response data
                                })
                                .catch((error) => console.error(error));

                            // addInfo(newEntry);
                            handleClose();
                        }}
                    >
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}