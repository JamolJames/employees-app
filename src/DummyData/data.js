import dayjs from "dayjs"
import { GridActionsCellItem } from "@mui/x-data-grid"
import { DeleteForever, Edit } from "@mui/icons-material"

const formatDate = (date) => dayjs(date).format("MMM D, YYYY")

export const columns = [
  { field: "empId", headerName: "EID", width: 150 },
  {
    field: "firstName",
    headerName: "First name",
    width: 150,
    // editable: true,
  },
  {
    field: "lastName",
    headerName: "Last name",
    width: 150,
    // editable: true,
  },
  {
    field: "salary",
    headerName: "Salary",
    width: 150,
    // editable: true,
  },
  {
    field: "fromDate",
    headerName: "Start Date",
    width: 150,
    valueGetter: ({ value }) => (!value ? value : formatDate(value)),
    // editable: true,
  },
  {
    field: "endDate",
    headerName: "End Date",
    width: 150,
    valueGetter: ({ value }) => (!value ? value : formatDate(value)),
    // editable: true,
  },
  {
    field: "post",
    headerName: "Position",
    width: 150,
    // editable: true,
  },
  {
    field: "role",
    headerName: "Role",
    width: 100,
    // editable: true,
  },
  {
    field: "age",
    headerName: "Age",
    type: "number",
    width: 100,
    // editable: true,
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
    getActions: ({ id }) => [
      <GridActionsCellItem
        icon={<DeleteForever sx={{ color: "#8b0000" }} />}
        label="Delete"
        onClick={() => alert(id)}
      />,
      <GridActionsCellItem
        icon={<Edit />}
        label="Edit"
        onClick={() => alert(id)}
      />,
    ],
  },
]
