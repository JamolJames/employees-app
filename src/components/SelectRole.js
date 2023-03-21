import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useState } from "react";

export default function SelectRole(props) {
    const [role, setRole] = useState("");
    const roles = ["BO1", "BO2", "BOC"];
    const handleChange = (event) => {
        let role = event.target.value;
        event.preventDefault();
        setRole(role);
        props.getRole(role);
    };

    return (
        <Box sx={{ minWidth: 120, mt: 2 }}>
            <FormControl>
                <InputLabel>Role</InputLabel>
                <Select
                    sx={{ width: 120, mt: 2 }}
                    value={role}
                    label="Role"
                    onChange={handleChange}
                >
                    {roles.map((role) => {
                        return (
                            <MenuItem key={role} value={role}>
                                {role}
                            </MenuItem>
                        );
                    })}
                </Select>
            </FormControl>
        </Box>
    );
}
