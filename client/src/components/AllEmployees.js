import { useState, useEffect } from "react";
import { Typography, Box, Container } from "@mui/material";
import {
    DataGrid,
    GridToolbarQuickFilter,
    GridToolbarContainer,
    GridToolbarColumnsButton,
    GridToolbarFilterButton,
    GridToolbarExport,
    GridToolbarDensitySelector,
} from "@mui/x-data-grid";
import AddEmployee from "./AddEmployee";
import AlertTrash from "./AlertTrash";
import logo from "../img/Logo.svg";
import { columns } from "../DummyData/data";

export default function AllEmployees() {
    const [rowSelectionModel, setRowSelectionModel] = useState([]);
    const [rows, setRows] = useState([]);
    // const [del, setDel] = useState(true);
    // const [rowSelectionModel, setRowSelectionModel] = useState([]);
    // const addInfo = (nEntry) => {
    //     const newEntry = {
    //         id: "",
    //         empId: nEntry.empId,
    //         firstName: nEntry.firstName,
    //         lastName: nEntry.lastName,
    //         salary: nEntry.salary,
    //         fromDate: nEntry.fromDate,
    //         endDate: nEntry.endDate,
    //         role: nEntry.role,
    //         position: nEntry.position,
    //     };
    //     console.log(newEntry);
    //     setRows([...rows, newEntry]);
    // };

    useEffect(() => {
        fetch(`${process.env.REACT_APP_BASE_URL}/api/employees`)
            .then((res) => res.json())
            .then((data) =>
                setRows(
                    data.rows.map((employee) => ({
                        id: employee.id,
                        empId: employee.emp_id,
                        lastName: employee.last_name,
                        firstName: employee.first_name,
                        age: employee.age,
                        gender: employee.gender,
                        salary: employee.salary,
                        fromDate: employee.from_date,
                        endDate: employee.to_date,
                        post: employee.post,
                        role: employee.role,
                        dept: employee.dept_name,
                    }))
                )
            );
    }, []);

    const deleteEmployees = () => {
        setRows((prev) => prev.filter((employee) => !rowSelectionModel.includes(employee.id)));
    };

    function CustomToolbar() {
        return (
            <GridToolbarContainer>
                <GridToolbarColumnsButton sx={{ color: "#8b0000" }} />
                <GridToolbarDensitySelector sx={{ color: "#8b0000" }} />
                <GridToolbarFilterButton sx={{ color: "#8b0000" }} />
                <GridToolbarQuickFilter sx={{ color: "#8b0000" }} />
                <GridToolbarExport sx={{ color: "#8b0000" }} />
                <AddEmployee rows={rows} />
                {/* Conditionally display Delete Button */}
                {rowSelectionModel.length ? <AlertTrash confirmDelete={deleteEmployees} /> : null}
            </GridToolbarContainer>
        );
    }

    function CustomFilterPanel() {
        return;
    }
    //Table Display
    return (
        <Container maxWidth="lg" sx={{ position: "relative", zIndex: "1" }}>
            <Box sx={{ mt: 2 }}>
                <img src={logo} className="Logo" alt="Coat of Arms Logo" width={100} height={100} />
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
                        setRowSelectionModel(newRowSelectionModel);
                    }}
                    rowSelectionModel={rowSelectionModel}
                />
            </Box>
        </Container>
    );
}
