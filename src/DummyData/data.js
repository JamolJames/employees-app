import dayjs from "dayjs"
import { GridActionsCellItem } from "@mui/x-data-grid"
import { DeleteForever, Edit } from "@mui/icons-material"

const formatDate = (date) => dayjs(date).format("MMM D, YYYY")

export const columns = ({
    handleUpdateBio,
    handleUpdateSalary,
    handleDeleteEntry,
}) => [
    { field: "empId", headerName: "EID", width: 150 },
    {
        field: "firstName",
        headerName: "First name",
        width: 150,
    },
    {
        field: "lastName",
        headerName: "Last name",
        width: 150,
    },
    {
        field: "salary",
        headerName: "Salary",
        width: 150,
    },
    {
        field: "fromDate",
        headerName: "Start Date",
        width: 150,
        valueGetter: ({ value }) => (!value ? value : formatDate(value)),
    },
    {
        field: "endDate",
        headerName: "End Date",
        width: 150,
        valueGetter: ({ value }) => (!value ? value : formatDate(value)),
    },
    {
        field: "post",
        headerName: "Position",
        width: 150,
    },
    {
        field: "role",
        headerName: "Role",
        width: 100,
    },
    {
        field: "age",
        headerName: "Age",
        type: "number",
        width: 100,
    },
    {
        field: "gender",
        headerName: "Gender",
        type: "string",
        width: 100,
    },
    {
        field: "dept",
        headerName: "Department",
        type: "string",
        width: 100,
    },
    {
        field: "actions",
        headerName: "Edit",
        type: "actions",
        width: 100,
        getActions: ({ row }) => [
            <GridActionsCellItem
                icon={<DeleteForever sx={{ color: "#8b0000" }} />}
                label="Delete Entry"
                onClick={() => handleDeleteEntry(row.id)}
                showInMenu
            />,
            <GridActionsCellItem
                icon={<Edit />}
                label="Update Bio"
                onClick={() => handleUpdateBio(row.empId)}
                showInMenu
            />,
            <GridActionsCellItem
                icon={<Edit />}
                label="Update Salary"
                onClick={() => handleUpdateSalary(row.id)}
                showInMenu
            />,
        ],
    },
]
