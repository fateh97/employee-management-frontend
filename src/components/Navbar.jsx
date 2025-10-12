import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
    return (
        <nav className="navbar">
            <div className="nav-logo">Employee Management</div>
            <div className="nav-links">
                <Link to="/">Dashboard</Link>
                <Link to="/employees">Employees</Link>
                <Link to="/departments">Departments</Link>
            </div>
        </nav>
    );
}

export default Navbar;
