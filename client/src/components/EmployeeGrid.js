// import { useState } from "react";
// import { DataGrid } from "@mui/x-data-grid";
// import Button from "@mui/material/Button";
// import Modal from "@mui/material/Modal";

// const columns = [
//     { field: "id", headerName: "ID", width: 70 },
//     { field: "name", headerName: "Name", width: 130 },
//     { field: "email", headerName: "Email", width: 200 },
//     { field: "phone", headerName: "Phone", width: 130 },
//     {
//         field: "delete",
//         headerName: "",
//         width: 70,
//         renderCell: (params) => (
//             <Button onClick={() => handleDelete(params.row.id)}>
//                 <i className="fas fa-trash"></i>
//             </Button>
//         ),
//     },
// ];

// const EmployeeGrid = () => {
//     const [employees, setEmployees] = useState([
//         { id: 1, name: "John Doe", email: "john.doe@example.com", phone: "555-555-5555" },
//         { id: 2, name: "Jane Smith", email: "jane.smith@example.com", phone: "555-555-5555" },
//     ]);

//     const handleDelete = (id) => {
//         const filteredEmployees = employees.filter((employee) => employee.id !== id);
//         setEmployees(filteredEmployees);
//     };

//     const [open, setOpen] = useState(false);
//     const [name, setName] = useState("");
//     const [email, setEmail] = useState("");
//     const [phone, setPhone] = useState("");

//     const handleAdd = () => {
//         const newEmployee = { id: employees.length + 1, name, email, phone };
//         setEmployees([...employees, newEmployee]);
//         setOpen(false);
//         setName("");
//         setEmail("");
//         setPhone("");
//     };

//     return (
//         <div style={{ height: 400, width: "100%" }}>
//             <Button onClick={() => setOpen(true)}>Add Employee</Button>
//             <DataGrid rows={employees} columns={columns} pageSize={5} />
//             <Modal open={open} onClose={() => setOpen(false)}>
//                 <div>
//                     <h2>Add Employee</h2>
//                     <label>Name:</label>
//                     <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
//                     <br></br>
//                 </div>
//             </Modal>
//         </div>
//     );
// };
// export default EmployeeGrid;
