// src/components/MainLayout.jsx

import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

function MainLayout() {
    return (
        <div>
            <Navbar />
            <main className="page-container">
                <Outlet />
            </main>
        </div>
    );
}

export default MainLayout;