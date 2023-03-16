import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useState, useEffect } from "react";

export default function AddEmployee({ addInfo, rows }) {
    const [open, setOpen] = useState(false);
    const [empId, setEmpId] = useState("");
    const [firstName, setFirstName] = useState("");
    const [salary, setSalary] = useState("");
    const [fromDate, setFromDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        if (open)
            setFirstName(
                rows.filter((employee) => {
                    return employee.empId === empId;
                })[0]?.firstName
            );
    }, [empId, open, rows]);
    console.log(firstName);

    return (
        <div>
            <Button variant="contained" sx={{ mt: 1 }} onClick={handleClickOpen}>
                Add Employee
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add Info</DialogTitle>
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
                    />
                    {/* <TextField
                        autoFocus
                        margin="dense"
                        id="lastName"
                        label="Last Name"
                        type="string"
                        fullWidth
                        variant="standard"
                        onChange={}
                    /> */}
                    <TextField
                        autoFocus
                        margin="dense"
                        id="salary"
                        label="Salary"
                        type="number"
                        fullWidth
                        variant="standard"
                        onChange={(e) => setSalary(e.target.value)}
                    />
                    <label className="Form">From Date:</label>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="fromDate"
                        type="date"
                        fullWidth
                        variant="standard"
                        onChange={(e) => setFromDate(e.target.value)}
                    />
                    <label className="Form">End Date:</label>
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
                            e.preventDefault();
                            addInfo(empId, salary, fromDate, endDate);
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
