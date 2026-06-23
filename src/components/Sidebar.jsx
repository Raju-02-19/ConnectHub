import { useState, useEffect } from "react";
import axios from "axios";

const Sidebar = ({
    setSelectedChat,
    darkMode,
    setDarkMode,
}) => {

    const [search, setSearch] = useState("");
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {

        try {

            const myCode =
                localStorage.getItem("userCode");

            const friendsResponse =
                await axios.get(
                    `https://connecthub-backend-4t3q.onrender.com/api/friends/list/${myCode}`
                );

            const friends =
                friendsResponse.data;
            ;
            ;

            const usersData = [];

            for (let friend of friends) {

                const friendCode =
                    friend.user1 === myCode
                        ? friend.user2
                        : friend.user1;

                const userResponse =
                    await axios.get(
                        `https://connecthub-backend-4t3q.onrender.com/api/users/code/${friendCode}`
                    );

                const userData =
                    userResponse.data;

                const msgResponse =
                    await axios.get(
                        `https://connecthub-backend-4t3q.onrender.com/api/messages/chat/${myCode}/${friendCode}`
                    );

                const messages =
                    msgResponse.data;

                let lastMessage =
                    "No messages yet";

                if (messages.length > 0) {

                    lastMessage =
                        messages[messages.length - 1]
                            .message;
                }

                const unreadResponse =
                    await axios.get(
                        `https://connecthub-backend-4t3q.onrender.com/api/messages/unread/${friendCode}/${myCode}`
                    );

                const unreadCount =
                    unreadResponse.data;

                usersData.push({
                    ...userData,
                    lastMessage,
                    unreadCount,
                });
            }
            ;
            setUsers(usersData);

        } catch (error) {

            console.error(
                "Error fetching friends:",
                error
            );

        }
    };
    const filteredUsers = users.filter((user) =>
        user.name?.toLowerCase().includes(
            search.toLowerCase()
        )
    );

    return (
        <div
            className="h-100 p-3"
            style={{
                background: darkMode
                    ? "#111827"
                    : "#f8f9fa",
                color: darkMode
                    ? "white"
                    : "black",
            }}
        >
            {/* Header */}
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="mb-0">ChatApp</h4>
                <div className="mt-3 mb-3">
                    <h6 className="mb-1">
                        {localStorage.getItem("userName")}
                    </h6>

                    <small className="text-muted">
                        {localStorage.getItem("userCode")}
                    </small>
                </div>

                <button
                    className="btn btn-sm btn-light"
                    onClick={() =>
                        setDarkMode(!darkMode)
                    }
                >
                    {darkMode
                        ? "☀️"
                        : "🌙"}
                </button>
                <button
                    className="btn btn-danger btn-sm ms-2"
                    onClick={async () => {

                        try {

                            const userCode =
                                localStorage.getItem("userCode");


                            await axios.put(
                                `https://connecthub-backend-4t3q.onrender.com/api/users/offline/${userCode}`
                            );

                        } catch (error) {

                            console.error(error);

                        }

                        localStorage.clear();

                        window.location.href =
                            "/login";

                    }}
                >
                    Logout
                </button>
            </div>

            {/* Search */}
            <input
                type="text"
                className="form-control mb-3"
                placeholder="Search user..."
                value={search}
                onChange={(e) =>
                    setSearch(e.target.value)
                }
            />

            {/* Users */}
            {filteredUsers.map((user) => (
                <div
                    key={user.id}
                    className="card mb-2 border-0 shadow-sm"
                    style={{
                        cursor: "pointer",
                    }}
                    onClick={() => {
                        if (setSelectedChat) {
                            setSelectedChat(user);
                        }
                    }}
                >
                    <div className="card-body py-2">

                        <div className="d-flex align-items-center">
                            <img
                                src={
                                    user.profilePic
                                        ? user.profilePic
                                        : `https://ui-avatars.com/api/?name=${user.name}`
                                }
                                alt={user.name}
                                className="rounded-circle"
                                width="50"
                                height="50"
                                style={{
                                    objectFit: "cover",
                                    border: "2px solid #ddd"
                                }}
                            />

                            <div className="ms-3 flex-grow-1">

                                <div className="d-flex justify-content-between align-items-center">

                                    <div>
                                        <h6 className="mb-0 fw-bold">
                                            {user.name}
                                        </h6>
                                    </div>

                                    <div className="d-flex align-items-center gap-2">

                                        {user.unreadCount > 0 && (
                                            <span
                                                className="badge bg-success rounded-pill"
                                            >
                                                {user.unreadCount}
                                            </span>
                                        )}

                                        <small
                                            className={
                                                user.status === "ONLINE"
                                                    ? "text-success"
                                                    : "text-secondary"
                                            }
                                        >
                                            {user.status === "ONLINE"
                                                ? "🟢 Online"
                                                : "⚫ Offline"}
                                        </small>

                                    </div>

                                </div>

                                <small
                                    className="text-muted d-block"
                                    style={{
                                        maxWidth: "180px",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                        whiteSpace: "nowrap"
                                    }}
                                >
                                    {user.lastMessage}
                                </small>

                            </div>

                        </div>

                    </div>
                </div>
            ))}

            {filteredUsers.length === 0 && (
                <div className="text-center mt-4">
                    <small>
                        No users found
                    </small>
                </div>
            )}
        </div>
    );
};

export default Sidebar;