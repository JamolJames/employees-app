import Box from "@mui/material/Box";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Container from "@mui/material/Container";
import { useState } from "react";
import AddEmployee from "./AddEmployee";

const columns = [
    { field: "id", headerName: "ID", width: 150 },
    {
        field: "firstName",
        headerName: "First name",
        width: 150,
        editable: true,
    },
    {
        field: "lastName",
        headerName: "Last name",
        width: 150,
        editable: true,
    },
    {
        field: "salary",
        headerName: "Salary",
        width: 150,
        editable: true,
    },
    {
        field: "startDate",
        headerName: "Start Date",
        width: 150,
        editable: true,
    },
    {
        field: "endDate",
        headerName: "End Date",
        width: 150,
        editable: true,
    },
    {
        field: "age",
        headerName: "Age",
        type: "number",
        width: 110,
        editable: true,
    },
    {
        field: "gender",
        headerName: "Gender",
        type: "string",
        width: 90,
    },
];

const employees = [
    { id: "AGLA.ST.001", lastName: "Snow", firstName: "Jon", age: 35, gender: "M" },
    { id: "AGLA.ST.002", lastName: "Lannister", firstName: "Cersei", age: 42, gender: "F" },
    { id: "AGLA.ST.003", lastName: "Lannister", firstName: "Jaime", age: 45, gender: "M" },
    { id: "AGLA.ST.004", lastName: "Stark", firstName: "Arya", age: 16, gender: "F" },
    { id: "AGLA.ST.005", lastName: "Targaryen", firstName: "Daenerys", age: null, gender: "M" },
    { id: "AGLA.ST.006", lastName: "Melisandre", firstName: null, age: 150, gender: "F" },
    { id: "AGLA.ST.007", lastName: "Clifford", firstName: "Ferrara", age: 44, gender: "M" },
    { id: "AGLA.ST.008", lastName: "Frances", firstName: "Rossini", age: 36, gender: "M" },
    { id: "AGLA.ST.009", lastName: "Roxie", firstName: "Harvey", age: 65, gender: "F" },
];

export default function AllEmployees() {
    const [rows] = useState(employees);

    return (
        <Container maxWidth="lg">
            <Box sx={{ height: 600, width: "100%", mt: 5 }}>
                <DataGrid
                    slots={{ toolbar: GridToolbar }}
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
                />
            </Box>
            {/* <AddEmployee /> */}
        </Container>
    );
}
