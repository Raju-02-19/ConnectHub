import React, { useState, useEffect } from "react";
import axios from "axios";

const EditProfile = () => {

    const [name, setName] = useState("");
    const [bio, setBio] = useState("");
    const [status, setStatus] = useState("ONLINE");
    const [profilePic, setProfilePic] = useState("");

    useEffect(() => {
        loadProfile();
    }, []);

    const loadProfile = async () => {

        try {

            const userCode =
                localStorage.getItem("userCode");

            const response =
                await axios.get(
                    `https://connecthub-backend-4t3q.onrender.com/api/users/code/${userCode}`
                );

            setName(
                response.data.name || ""
            );

            setBio(
                response.data.bio || ""
            );

            setStatus(
                response.data.status || "ONLINE"
            );

            setProfilePic(
                response.data.profilePic || ""
            );

        } catch (error) {

            console.error(error);

        }
    };

    const saveProfile = async () => {

        try {

            const userCode =
                localStorage.getItem("userCode");

            const userResponse =
                await axios.get(
                    `https://connecthub-backend-4t3q.onrender.com/api/users/code/${userCode}`
                );

            const userId =
                userResponse.data.id;

            await axios.put(
                `https://connecthub-backend-4t3q.onrender.com/api/users/update/${userId}`,
                {
                    name,
                    bio,
                    status,
                    profilePic
                }
            );

            localStorage.setItem(
                "userName",
                name
            );



        } catch (error) {

            console.error(error);



        }
    };

    return (
        <div className="container mt-5">

            <div className="card shadow p-4">

                <h2 className="mb-4">
                    Edit Profile
                </h2>

                <div className="text-center mb-4">

                    <img
                        src={
                            profilePic
                                ? profilePic
                                : `https://ui-avatars.com/api/?name=${name}`
                        }
                        alt="Profile"
                        className="rounded-circle border"
                        width="120"
                        height="120"
                    />

                </div>

                <div className="mb-3">

                    <label className="form-label">
                        Name
                    </label>

                    <input
                        type="text"
                        className="form-control"
                        value={name}
                        onChange={(e) =>
                            setName(
                                e.target.value
                            )
                        }
                    />

                </div>

                <div className="mb-3">

                    <label className="form-label">
                        Bio
                    </label>

                    <textarea
                        className="form-control"
                        rows="3"
                        value={bio}
                        onChange={(e) =>
                            setBio(
                                e.target.value
                            )
                        }
                    />

                </div>

                <div className="mb-3">

                    <label className="form-label">
                        Status
                    </label>

                    <select
                        className="form-select"
                        value={status}
                        onChange={(e) =>
                            setStatus(
                                e.target.value
                            )
                        }
                    >
                        <option value="ONLINE">
                            ONLINE
                        </option>

                        <option value="OFFLINE">
                            OFFLINE
                        </option>

                        <option value="BUSY">
                            BUSY
                        </option>

                    </select>

                </div>

                <div className="mb-3">

                    <label className="form-label">
                        Profile Picture URL
                    </label>

                    <input
                        type="text"
                        className="form-control"
                        placeholder="Paste Image URL"
                        value={profilePic}
                        onChange={(e) =>
                            setProfilePic(
                                e.target.value
                            )
                        }
                    />

                </div>

                <button
                    className="btn btn-success"
                    onClick={saveProfile}
                >
                    Save Profile
                </button>

            </div>

        </div>
    );
};

export default EditProfile;

