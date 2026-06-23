import React from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {

    const navigate = useNavigate();

    return (
        <div className="container mt-5">

            <div className="card shadow p-4">

                <h2 className="mb-4">
                    My Profile
                </h2>

                <p>
                    <strong>Name:</strong>{" "}
                    {localStorage.getItem("userName")}
                </p>

                <p>
                    <strong>User Code:</strong>{" "}
                    {localStorage.getItem("userCode")}
                </p>

                <p>
                    <strong>Email:</strong>{" "}
                    {localStorage.getItem("userEmail")}
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