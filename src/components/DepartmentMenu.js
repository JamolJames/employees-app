import { useState, useEffect } from "react"
import { Box, InputLabel, MenuItem, FormControl, Select } from "@mui/material"

export default function DepartmentMenu({ getDepartment, getId }) {
  const [selected, setSelected] = useState("")
  const [departments, setDepartments] = useState([])

  useEffect(() => {
    fetch(
      fetch(`${process.env.REACT_APP_BASE_URL}/api/departments`)
        .then((res) => res.json())
        .then((response) => setDepartments(response.rows))
    )
  }, [])

  const handleChange = (event) => {
    event.preventDefault()
    const deptNum = event.target.value
    setSelected(deptNum)
    getDepartment(
      departments.find((department) => department.dept_no === deptNum).dept_name
    )
    getId(deptNum)
  }

  return (
    <Box sx={{ Width: 200, mt: 2 }}>
      <FormControl>
        <InputLabel>Department</InputLabel>
        <Select
          sx={{ minWidth: 120, mt: 2 }}
          value={selected}
          label="Department"
          onChange={handleChange}
        >
          {departments.map(({ dept_name, dept_no }) => {
            return (
              <MenuItem key={dept_no} value={dept_no}>
                {dept_name}
              </MenuItem>
            )
          })}
        </Select>
      </FormControl>
    </Box>
  )
}
