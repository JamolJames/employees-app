import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useState, useEffect } from "react";
import SelectRole from "./SelectRole";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { IconButton } from "@mui/material";

export default function AddEmployee({ addInfo, rows }) {
    const [open, setOpen] = useState(false);
    const [empId, setEmpId] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [salary, setSalary] = useState("");
    const [fromDate, setFromDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [role, setRole] = useState("");
    const [position, setPosition] = useState("");

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const getRole = (role) => {
        setRole(role);
    };

    useEffect(() => {
        const found = rows.find((employee) => employee.empId === empId);
        if (found) {
            setFirstName(found.firstName);
            setLastName(found.lastName);
        }
    }, [empId, rows]);

    return (
        <div>
            <IconButton
                size="small"
                color="primary"
                sx={{ mt: "1px", marginLeft: 20 }}
                onClick={handleClickOpen}
                justify="space-between"
            >
                <AddBoxIcon>Add Employee</AddBoxIcon>
            </IconButton>

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
                    <SelectRole getRole={getRole} />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="position"
                        label="Position"
                        type="string"
                        fullWidth
                        variant="standard"
                        value={position}
                        onChange={(e) => {
                            setPosition(e.target.value);
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
                            const newEntry = {
                                empId: empId,
                                firstName: firstName,
                                lastName: lastName,
                                salary: salary,
                                fromDate: fromDate,
                                endDate: endDate,
                                role: role,
                                position: position,
                            };
                            e.preventDefault();
                            addInfo(newEntry);
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
