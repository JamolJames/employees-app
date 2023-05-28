import { useState, useEffect } from "react"
import { Typography, Box, Container, Button } from "@mui/material"
import {
    DataGrid,
    GridToolbarQuickFilter,
    GridToolbarContainer,
    GridToolbarColumnsButton,
    GridToolbarFilterButton,
    GridToolbarExport,
} from "@mui/x-data-grid"
import AlertTrash from "./AlertTrash"
import logo from "../img/Logo.svg"
import { columns } from "../DummyData/data"
import AddEmployee from "./AddEmployee"
import UpdateBio from "./UpdateBio"
import UpdateSalary from "./UpdateSalary"
import { query } from "../util/query"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import DeleteEntry from "./DeleteEntry"
dayjs.extend(relativeTime)

export default function AllEmployees() {
    const [rowSelectionModel, setRowSelectionModel] = useState([])
    const [rows, setRows] = useState([])
    const [addEmployee, setAddEmployee] = useState(false)
    const [updateBio, setUpdateBio] = useState(false)
    const [updateSalary, setUpdateSalary] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [empId, setEmpId] = useState(null)
    const [salaryId, setSalaryId] = useState(null)
    const [deleteEntry, setDeleteEntry] = useState(false)

    const handleClose = () => {
        setAddEmployee(false)
        setUpdateBio(false)
        setUpdateSalary(false)
        setDeleteEntry(false)
    }

    const handleUpdateBio = (id) => {
        setUpdateBio((prev) => !prev)
        setEmpId(id)
    }
    const handleUpdateSalary = (id) => {
        setUpdateSalary((prev) => !prev)
        setSalaryId(id)
    }

    const handleDeleteEntry = (id) => {
        setDeleteEntry((prev) => !prev)
        setSalaryId(id)
        setIsLoading((prev) => !prev)
    }

    const AddEmployeeIcon = () => (
        <Button
            size="small"
            sx={{ color: "#8b0000" }}
            onClick={() => setAddEmployee((prev) => !prev)}
        >
            Add Employee
        </Button>
    )

    useEffect(() => {
        if (!isLoading)
            query("employees")
                .then((res) => res.json())
                .then((data) =>
                    setRows(
                        data.rows.map(
                            // prettier-ignore
                            ({id, emp_id, last_name, first_name, dob, gender, salary, from_date, to_date, post,role, dept_name,
                            }) => ({
                            id,
                            empId: emp_id,
                            lastName: last_name,
                            firstName: first_name,
                            age: parseInt(dayjs().from(dayjs(dob),true)),
                            gender,
                            salary: Number(salary),
                            fromDate: dayjs(from_date).format('YYYY-MM-DD'),
                            endDate: dayjs(to_date).format('YYYY-MM-DD'),
                            post,
                            role,
                            dept: dept_name,
                            })
                        )
                    )
                )
    }, [isLoading])

    const deleteEmployees = async () => {
        // setRows((prev) =>
        //     prev.filter((employee) => !rowSelectionModel.includes(employee.id))
        // )
        try {
            const toDelete = rows.filter((employee) =>
                rowSelectionModel.includes(employee.id)
            )
            // Fetch to hit "delete sever route" each time per employee from "toDelete--(Array)"
            try {
                setIsLoading(true)
                toDelete.map(async ({ id }) => {
                    await query(`employees/salary/${id}`, {
                        method: "DELETE",
                    })
                })

                setIsLoading(false)
                handleClose()
            } catch (error) {
                console.log(error)
            }
        } catch (e) {
            console.log(e)
        }
    }

    function CustomToolbar() {
        return (
            <GridToolbarContainer>
                <GridToolbarColumnsButton sx={{ color: "#8b0000" }} />
                <GridToolbarFilterButton sx={{ color: "#8b0000" }} />
                <GridToolbarQuickFilter sx={{ color: "#8b0000" }} />
                <GridToolbarExport sx={{ color: "#8b0000" }} />
                <AddEmployeeIcon />

                {/* Conditionally display Delete Button */}
                {rowSelectionModel.length ? (
                    <AlertTrash confirmDelete={deleteEmployees} />
                ) : null}
            </GridToolbarContainer>
        )
    }

    //Table Display
    return (
        <Container maxWidth="xl" sx={{ position: "relative", zIndex: "1" }}>
            <Box sx={{ mt: 2 }}>
                <Box
                    component="img"
                    src={logo}
                    className="Logo"
                    alt="Coat of Arms Logo"
                    width={100}
                    height={100}
                />
            </Box>
            <Typography fontSize={30}>Short Term Employees</Typography>
            <Box
                sx={{
                    height: 600,
                    width: "100%",
                    mt: 5,
                    background: "#eceff6",
                }}
            >
                <DataGrid
                    slots={{
                        toolbar: CustomToolbar,
                    }}
                    sx={{ boxShadow: 2 }}
                    rows={rows}
                    columns={columns({
                        handleUpdateBio,
                        handleUpdateSalary,
                        handleDeleteEntry,
                    })}
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
                    onRowSelectionModelChange={(newRowSelectionModel) =>
                        setRowSelectionModel(newRowSelectionModel)
                    }
                    rowSelectionModel={rowSelectionModel}
                />
            </Box>
            {addEmployee && (
                <AddEmployee
                    handleClose={handleClose}
                    setIsLoading={setIsLoading}
                />
            )}
            {updateBio && (
                <UpdateBio
                    handleClose={handleClose}
                    setIsLoading={setIsLoading}
                    empId={empId}
                    isLoading={isLoading}
                />
            )}
            {updateSalary && (
                <UpdateSalary
                    handleClose={handleClose}
                    setIsLoading={setIsLoading}
                    id={salaryId}
                />
            )}
            {deleteEntry && (
                <DeleteEntry
                    handleClose={handleClose}
                    setIsLoading={setIsLoading}
                    id={salaryId}
                />
            )}
            <Typography>Version 1.0.0</Typography>
        </Container>
    )
}
