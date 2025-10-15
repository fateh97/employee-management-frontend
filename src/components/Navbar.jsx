import { NavLink, useNavigate } from "react-router-dom"; 
import styles from "./Navbar.module.css";

function Navbar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <nav className={styles.navbar}>
            <NavLink to="/dashboard" className={styles.navLogo}>
                Employee Management System
            </NavLink>
            <div className={styles.navLinks}>
                <NavLink to="/dashboard">Dashboard</NavLink>
                <NavLink to="/employees">Employees</NavLink>
                <NavLink to="/departments">Departments</NavLink>

                <button onClick={handleLogout} className={styles.logoutButton}>
                    Logout
                </button>
            </div>
        </nav>
    );
}

export default Navbar;