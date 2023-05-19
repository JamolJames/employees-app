import { useState, useEffect } from "react"
import { Typography, Box, Container, IconButton, Button } from "@mui/material"
import {
  DataGrid,
  GridToolbarQuickFilter,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid"
import AlertTrash from "./AlertTrash"
import logo from "../img/Logo.svg"
import { columns } from "../DummyData/data"
import AddCircle from "@mui/icons-material/AddCircle"
import AddEmployee from "./AddEmployee"
import UpdateBio from "./UpdateBio"

export default function AllEmployees() {
  const [rowSelectionModel, setRowSelectionModel] = useState([])
  const [rows, setRows] = useState([])
  const [addEmployee, setAddEmployee] = useState(false)
  const [updateBio, setUpdateBio] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleClose = () => {
    setAddEmployee(false)
    setUpdateBio(false)
  }

  const AddEmployeeIcon = () => (
    <IconButton
      size="small"
      sx={{ color: "#8b0000" }}
      onClick={() => setAddEmployee((prev) => !prev)}
    >
      <AddCircle />
    </IconButton>
  )

  const UpdateBioBtn = () => (
    <Button
      size="small"
      sx={{ color: "#8b0000" }}
      onClick={() => setUpdateBio((prev) => !prev)}
    >
      Update Bio
    </Button>
  )

  useEffect(() => {
    if (!isLoading)
      fetch(`${process.env.REACT_APP_BASE_URL}/api/employees`)
        .then((res) => res.json())
        .then((data) =>
          setRows(
            data.rows.map(
              // prettier-ignore
              ({id, emp_id, last_name, first_name, age, gender, salary, from_date, to_date, post,role, dept_name,
            }) => ({
              id,
              empId: emp_id,
              lastName: last_name,
              firstName: first_name,
              age,
              gender,
              salary,
              fromDate: from_date,
              endDate: to_date,
              post,
              role,
              dept: dept_name,
            })
            )
          )
        )
  }, [isLoading])

  const deleteEmployees = () => {
    setRows((prev) =>
      prev.filter((employee) => !rowSelectionModel.includes(employee.id))
    )
  }

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarColumnsButton sx={{ color: "#8b0000" }} />
        <GridToolbarDensitySelector sx={{ color: "#8b0000" }} />
        <GridToolbarFilterButton sx={{ color: "#8b0000" }} />
        <GridToolbarQuickFilter sx={{ color: "#8b0000" }} />
        <GridToolbarExport sx={{ color: "#8b0000" }} />
        <AddEmployeeIcon />
        <UpdateBioBtn />

        {/* Conditionally display Delete Button */}
        {rowSelectionModel.length ? (
          <AlertTrash confirmDelete={deleteEmployees} />
        ) : null}
      </GridToolbarContainer>
    )
  }

  function CustomFilterPanel() {
    return
  }
  //Table Display
  return (
    <Container maxWidth="xl" sx={{ position: "relative", zIndex: "1" }}>
      <Box sx={{ mt: 2 }}>
        <img
          src={logo}
          className="Logo"
          alt="Coat of Arms Logo"
          width={100}
          height={100}
        />
      </Box>
      <Typography fontSize={30}>Short Term Employees</Typography>
      <Box sx={{ height: 600, width: "100%", mt: 5, background: "#eceff6" }}>
        <DataGrid
          slots={{
            toolbar: CustomToolbar,
          }}
          slotProps={{
            filterPanel: CustomFilterPanel,
          }}
          sx={{ boxShadow: 2 }}
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 8,
              },
            },
          }}
          pageSizeOptions={[8]}
          checkboxSelection
          disableRowSelectionOnClick
          onRowSelectionModelChange={(newRowSelectionModel) => {
            setRowSelectionModel(newRowSelectionModel)
            console.log(newRowSelectionModel)
          }}
          rowSelectionModel={rowSelectionModel}
        />
      </Box>
      {addEmployee && (
        <AddEmployee handleClose={handleClose} setIsLoading={setIsLoading} />
      )}
      {updateBio && <UpdateBio handleClose={handleClose} />}
    </Container>
  )
}
