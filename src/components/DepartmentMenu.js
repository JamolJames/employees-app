import { useState, useEffect } from "react"
import { InputLabel, MenuItem, FormControl, Select } from "@mui/material"
import { query } from "../util/query"

export default function DepartmentMenu({ getDeptId, selectedEmployee }) {
    const [selected, setSelected] = useState(
        selectedEmployee && selectedEmployee.dept_no
            ? selectedEmployee.dept_no
            : ""
    )
    const [departments, setDepartments] = useState([])
    useEffect(() => {
        query(`/departments`)
            .then((res) => res.json())
            .then((response) => {
                const data = response.rows
                setDepartments(data)
                if (selected)
                    setSelected(
                        data.find(
                            (dept) => dept.dept_name === selectedEmployee.dept
                        ).dept_no
                    )
            })
    }, [selectedEmployee, selected])

    const handleChange = (event) => {
        const deptNum = event.target.value
        setSelected(deptNum)
        getDeptId(deptNum)
    }

    return (
        <FormControl fullWidth>
            <InputLabel>Department</InputLabel>
            <Select value={selected} label="Department" onChange={handleChange}>
                {departments.map(({ dept_name, dept_no }) => {
                    return (
                        <MenuItem key={dept_no} value={dept_no}>
                            {dept_name}
                        </MenuItem>
                    )
                })}
            </Select>
        </FormControl>
    )
}

DepartmentMenu.defaultProps = {
    selectedEmployee: {
        deptNum: "",
    },
}
