import { useEffect, useState } from "react";
import api from "../services/api";
import "./Dashboard.css";

function Dashboard() {
    const [data, setData] = useState(null);

    useEffect(() => {
        api.get("/dashboard").then((res) => setData(res.data));
    }, []);

    if (!data) return <p>Loading...</p>;

    return (
        <div className="dashboard">
            <h1>Dashboard</h1>

            <div className="card-grid">
                <div className="card">
                    <h3>Total Employees</h3>
                    <p className="big-number">{data.totalEmployees}</p>
                </div>

                <div className="card">
                    <h3>Employees by Department</h3>
                    <ul>
                        {data.employeesByDept.map((d) => (
                            <li key={d.id}>
                                {d.name}: {d.employees_count}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="card">
                    <h3>Average Salary by Department</h3>
                    <ul>
                        {data.avgSalaryByDept.map((d) => (
                            <li key={d.id}>
                                {d.name}: RM <nbsp></nbsp>
                                {!isNaN(parseFloat(d.employees_avg_salary))
                                    ? parseFloat(d.employees_avg_salary).toFixed(2)
                                    : 0}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
