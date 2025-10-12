import { useEffect, useState } from "react";
import api from "../services/api";
import axios from "axios";
import "./Crud.css";

function Departments() {
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
                await axios.post(`/api/departments/${editingId}/edit`, form, {
                    headers: { "Content-Type": "application/json" }
                });
            } else {
                await axios.post("/api/departments", form, {
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                    }
                },);
            }

            setForm({ name: "", description: "" });
            setEditingId(null);
            fetchDepartments();
        } catch (error) {
            console.error("Error submitting form:", error.response || error.message);
            alert(`Error: ${error.response?.data?.message || error.message}`);
        }
    };

    const handleEdit = (dep) => {
        setForm(dep);
        setEditingId(dep.id);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this employee?")) return;

        try {
            await axios.post(`api/departments/${id}/delete`, null, {
                headers: { "Content-Type": "application/json" }
            });
            fetchDepartments(); // reload employee list
        } catch (error) {
            console.error("Delete failed:", error);
        }
    };

    return (
        <div className="crud-page">
            <h1>Departments</h1>

            <form className="crud-form" onSubmit={handleSubmit}>
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

            <table className="crud-table">
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
                                <button onClick={() => handleEdit(dep)} className="edit">Edit</button>
                                <button onClick={() => handleDelete(dep.id)} className="delete">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Departments;
