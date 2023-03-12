import { Button } from "@mui/material";
import { useState } from "react";

const AddEmployee = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
            <Button onClick={handleOpen} variant="contained" sx={{ mt: 1 }}>
                Add Employee
            </Button>
        </>
    );
};
export default AddEmployee;
