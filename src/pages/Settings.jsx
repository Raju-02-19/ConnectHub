import React from "react";

const Settings = () => {
    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };
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

                        <button className="list-group-item list-group-item-action text-danger">
                            🚪 Logout
                        </button>

                    </div>

                </div>
            </div>
        </div>
    );
};

export default Settings;