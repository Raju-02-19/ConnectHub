import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const navigate = useNavigate();

    const userName = useMemo(
        () => localStorage.getItem("userName") || "Unknown",
        []
    );
    const userCode = useMemo(
        () => localStorage.getItem("userCode") || "N/A",
        []
    );
    const userEmail = useMemo(
        () => localStorage.getItem("userEmail") || "Not provided",
        []
    );

    return (
        <div className="container mt-5">

            <div className="card shadow p-4">

                <h2 className="mb-4">
                    My Profile
                </h2>

                <p>
                    <strong>Name:</strong>{" "}
                    {userName}
                </p>

                <p>
                    <strong>User Code:</strong>{" "}
                    {userCode}
                </p>

                <p>
                    <strong>Email:</strong>{" "}
                    {userEmail}
                </p>

                <button
                    className="btn btn-primary"
                    onClick={() =>
                        navigate("/edit-profile")
                    }
                >
                    Edit Profile
                </button>

            </div>

        </div>
    );
};

export default Profile;