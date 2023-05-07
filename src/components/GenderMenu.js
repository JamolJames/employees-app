import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useState } from "react";

export default function GenderMenu(props) {
    const [gender, setGender] = useState("");
    const genders = ["M", "F"];
    const handleChange = (event) => {
        let gender = event.target.value;
        event.preventDefault();
        setGender(gender);
        props.getGender(gender);
    };

    return (
        <Box sx={{ minWidth: 120, mt: 2 }}>
            <FormControl>
                <InputLabel>Gender</InputLabel>
                <Select
                    sx={{ width: 120, mt: 2 }}
                    value={gender}
                    label="Gender"
                    onChange={handleChange}
                >
                    {genders.map((gender) => {
                        return (
                            <MenuItem key={gender} value={gender}>
                                {gender}
                            </MenuItem>
                        );
                    })}
                </Select>
            </FormControl>
        </Box>
    );
}
