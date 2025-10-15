import { useEffect, useState } from "react";
import api from "../services/api";
import axios from "axios";
import styles from "./Crud.module.css"; // Use CSS module import

function Departments() {
    // --- THIS LOGIC WAS MISSING ---
    const [departments, setDepartments] = useState([]);
    const [form, setForm] = useState({ name: "", description: "" });
    const [editingId, setEditingId] = useState(null);

    const fetchDepartments = async () => {
        const res = await api.get("departments");
        setDepartments(res.data);
    };

    useEffect(() => { fetchDepartments(); }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                await axios.post(`/api/departments/${editingId}/edit`, form);
            } else {
                await axios.post("/api/departments", form);
            }
            setForm({ name: "", description: "" });
            setEditingId(null);
            fetchDepartments();
        } catch (error) {
            console.error("Error submitting form:", error.response || error.message);
        }
    };

    const handleEdit = (dep) => {
        setForm(dep);
        setEditingId(dep.id);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure?")) return;
        try {
            await axios.post(`api/departments/${id}/delete`);
            fetchDepartments();
        } catch (error) {
            console.error("Delete failed:", error);
        }
    };
    // --- END OF MISSING LOGIC ---

    return (
        <div className={styles.crudPage}>
            <h1>Departments</h1>
            <form className={styles.crudForm} onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                />
                <input
                    type="text"
                    placeholder="Description"
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                />
                <button type="submit">{editingId ? "Update" : "Add"}</button>
            </form>

            <table className={styles.crudTable}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {departments.map((dep) => (
                        <tr key={dep.id}>
                            <td>{dep.name}</td>
                            <td>{dep.description}</td>
                            <td>
                                <button onClick={() => handleEdit(dep)} className={styles.edit}>Edit</button>
                                <button onClick={() => handleDelete(dep.id)} className={styles.delete}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Departments;