import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import BottomNav from "../components/BottomNav";

const MainLayout = ({ children }) => {

    const [darkMode, setDarkMode] =
        useState(false);

    return (
        <div className="d-flex">

            {/* Desktop Sidebar */}
            <div
                className="d-none d-md-block"
                style={{
                    width: "300px",
                    height: "100vh",
                    position: "fixed",
                    left: 0,
                    top: 0,
                    overflowY: "auto",
                    borderRight: "1px solid #ddd"
                }}
            >
                <Sidebar
                    darkMode={darkMode}
                    setDarkMode={setDarkMode}
                />
            </div>

            {/* Main Content */}
            <div
                style={{
                    marginLeft:
                        window.innerWidth >= 768
                            ? "300px"
                            : "0",
                    width: "100%",
                    minHeight: "100vh",
                    paddingBottom: "70px"
                }}
            >
                {children}
            </div>

            {/* Mobile Bottom Nav */}
            <div className="d-md-none">
                <BottomNav />
            </div>

        </div>
    );
};

export default MainLayout;