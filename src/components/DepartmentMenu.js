import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useState } from "react";
import { departments as d } from "./departments";

export default function DepartmentMenu(props) {
    const [department, setDepartment] = useState("");
    const departments = d.map((dep) => dep.name);

    const handleChange = (event) => {
        const department = event.target.value;
        event.preventDefault();
        setDepartment(department);
        props.getDepartment(department);
        props.getId(departments.indexOf(department) + 1);
        // console.log(department);
        // console.log();
    };

    return (
        <Box sx={{ Width: 200, mt: 2 }}>
            <FormControl>
                <InputLabel>Department</InputLabel>
                <Select
                    sx={{ minWidth: 120, mt: 2 }}
                    value={department}
                    label="Department"
                    onChange={handleChange}
                >
                    {departments.map((department) => {
                        return (
                            <MenuItem key={departments.indexOf(department) + 1} value={department}>
                                {department}
                            </MenuItem>
                        );
                    })}
                </Select>
            </FormControl>
        </Box>
    );
}
