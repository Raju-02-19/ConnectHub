import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";

const Settings = () => {
    const navigate = useNavigate();

    const handleLogout = useCallback(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("userCode");
        localStorage.removeItem("userName");
        localStorage.removeItem("userEmail");
        navigate("/login");
    }, [navigate]);

    return (
        <div className="container py-4">
            <div className="card shadow border-0">
                <div className="card-body">

                    <h2 className="mb-4">
                        <i className="bi bi-gear-fill me-2"></i>
                        Settings
                    </h2>

                    <div className="list-group">

                        <button className="list-group-item list-group-item-action">
                            🌙 Dark Mode
                        </button>

                        <button className="list-group-item list-group-item-action">
                            🔔 Notifications
                        </button>

                        <button className="list-group-item list-group-item-action">
                            🔒 Privacy
                        </button>

                        <button className="list-group-item list-group-item-action">
                            🌐 Language
                        </button>

                        <button className="list-group-item list-group-item-action">
                            📁 Storage & Data
                        </button>

                        <button className="list-group-item list-group-item-action">
                            ❓ Help Center
                        </button>

                        <button className="list-group-item list-group-item-action">
                            ℹ️ About
                        </button>

                        <button
                            className="list-group-item list-group-item-action text-danger"
                            onClick={handleLogout}
                        >
                            🚪 Logout
                        </button>

                    </div>

                </div>
            </div>
        </div>
    );
};

export default Settings;