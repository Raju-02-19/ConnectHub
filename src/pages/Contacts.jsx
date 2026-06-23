import React, { useEffect, useState } from "react";
import axios from "axios";
import MainLayout from "../layouts/MainLayout";
import { useNavigate } from "react-router-dom";

const Contacts = () => {

const [friends, setFriends] = useState([]);
const [search, setSearch] = useState("");

const navigate = useNavigate();

useEffect(() => {
    fetchFriends();
}, []);

const fetchFriends = async () => {

    try {

        const myCode =
            localStorage.getItem("userCode");

        const response =
            await axios.get(
                `https://connecthub-backend-4t3q.onrender.com/api/friends/list/${myCode}`
            );

        const friendsList =
            response.data;

        const usersData = [];

        for (let friend of friendsList) {

            const friendCode =
                friend.user1 === myCode
                    ? friend.user2
                    : friend.user1;

            const userResponse =
                await axios.get(
                    `https://connecthub-backend-4t3q.onrender.com/api/users/code/${friendCode}`
                );

            usersData.push(
                userResponse.data
            );
        }

        setFriends(usersData);

    } catch (error) {

        console.error(error);

    }
};

const filteredFriends =
    friends.filter((user) =>
        user.name
            ?.toLowerCase()
            .includes(
                search.toLowerCase()
            )
    );

return (

    <MainLayout>

        <div className="container-fluid py-3 px-3 px-md-4">

            {/* Header */}

            <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">

                <h2 className="fw-bold mb-0">
                    My Friends
                </h2>

                <button
                    className="btn btn-primary"
                    onClick={() =>
                        navigate("/search")
                    }
                >
                    <i className="bi bi-person-plus-fill me-2"></i>
                    Add Friend
                </button>

            </div>

            {/* Search */}

            <input
                type="text"
                className="form-control form-control-lg mb-4"
                placeholder="Search Friends..."
                value={search}
                onChange={(e) =>
                    setSearch(
                        e.target.value
                    )
                }
            />

            {/* Friends */}

            {filteredFriends.length === 0 ? (

                <div className="alert alert-info">
                    No Friends Found
                </div>

            ) : (

                filteredFriends.map((user) => (

                    <div
                        key={user.id}
                        className="card border-0 shadow-sm mb-3"
                        style={{
                            cursor: "pointer"
                        }}
                        onClick={() =>
                            navigate("/dashboard", {
                                state: {
                                    selectedUser: user
                                }
                            })
                        }
                    >

                        <div className="card-body">

                            <div className="d-flex align-items-center">

                                <img
                                    src={
                                        user.profilePic
                                            ? user.profilePic
                                            : `https://ui-avatars.com/api/?name=${user.name}`
                                    }
                                    alt={user.name}
                                    width="60"
                                    height="60"
                                    className="rounded-circle"
                                    style={{
                                        objectFit: "cover",
                                        border: "2px solid #ddd"
                                    }}
                                />

                                <div className="ms-3 flex-grow-1">

                                    <h5 className="mb-1">
                                        {user.name}
                                    </h5>

                                    <small className="text-muted">
                                        {user.email}
                                    </small>

                                    <br />

                                    <small
                                        className={
                                            user.status === "ONLINE"
                                                ? "text-success"
                                                : "text-secondary"
                                        }
                                    >
                                        {
                                            user.status === "ONLINE"
                                                ? "🟢 Online"
                                                : "⚫ Offline"
                                        }
                                    </small>

                                </div>

                                <button
                                    className="btn btn-outline-primary btn-sm"
                                    onClick={(e) => {

                                        e.stopPropagation();

                                        navigate(
                                            "/dashboard",
                                            {
                                                state: {
                                                    selectedUser: user
                                                }
                                            }
                                        );

                                    }}
                                >
                                    <i className="bi bi-chat-dots-fill me-1"></i>
                                    Chat
                                </button>

                            </div>

                        </div>

                    </div>

                ))

            )}

        </div>

    </MainLayout>

);


};

export default Contacts;
