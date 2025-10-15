import { useEffect, useState } from "react";
import api from "../services/api";
import axios from "axios";
import styles from "./Crud.module.css"; // Use CSS module import

function Employees() {
    // --- THIS LOGIC WAS MISSING ---
    const [employees, setEmployees] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [form, setForm] = useState({ fullname: "", email: "", department_id: "", salary: "" });
    const [editingId, setEditingId] = useState(null);

    const fetchData = async () => {
        const [empRes, depRes] = await Promise.all([
            api.get("/employees"),
            api.get("/departments")
        ]);
        setEmployees(empRes.data);
        setDepartments(depRes.data);
    };

    useEffect(() => { fetchData(); }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editingId) {
            await axios.post(`/api/employees/${editingId}/edit`, form);
        } else {
            await axios.post("/api/employees", form);
        }
        setForm({ fullname: "", email: "", department_id: "", salary: "" });
        setEditingId(null);
        fetchData();
    };

    const handleEdit = (emp) => {
        setForm(emp);
        setEditingId(emp.id);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Delete this employee?")) {
            await axios.delete(`/employees/${id}`);
            fetchData();
        }
    };
    // --- END OF MISSING LOGIC ---

    return (
        <div className={styles.crudPage}>
            <h1>Employees</h1>
            <form className={styles.crudForm} onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Name"
                    value={form.fullname}
                    onChange={(e) => setForm({ ...form, fullname: e.target.value })}
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    required
                />
                <select
                    value={form.department_id}
                    onChange={(e) => setForm({ ...form, department_id: e.target.value })}
                    required
                >
                    <option value="">Select Department</option>
                    {departments.map((d) => (
                        <option key={d.id} value={d.id}>{d.name}</option>
                    ))}
                </select>
                <input
                    type="number"
                    placeholder="Salary"
                    value={form.salary}
                    onChange={(e) => setForm({ ...form, salary: e.target.value })}
                    required
                />
                <button type="submit">{editingId ? "Update" : "Add"}</button>
            </form>

            <table className={styles.crudTable}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Department</th>
                        <th>Salary</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((emp) => (
                        <tr key={emp.id}>
                            <td>{emp.fullname}</td>
                            <td>{emp.email}</td>
                            <td>{emp.department?.name}</td>
                            <td>RM {emp.salary}</td>
                            <td>
                                <button onClick={() => handleEdit(emp)} className={styles.edit}>Edit</button>
                                <button onClick={() => handleDelete(emp.id)} className={styles.delete}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Employees;