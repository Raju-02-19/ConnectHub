import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import api from "../services/api";

const Sidebar = ({
    setSelectedChat,
    darkMode,
    setDarkMode,
}) => {

    const [search, setSearch] = useState("");
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const controllerRef = useRef(null);

    const fetchUsers = useCallback(async () => {
        setLoading(true);

        const myCode = localStorage.getItem("userCode");
        if (!myCode) {
            setUsers([]);
            setLoading(false);
            return;
        }

        try {
            controllerRef.current?.abort();
        } catch (err) {
            console.warn("Abort error:", err);
        }

        const controller = new AbortController();
        controllerRef.current = controller;

        try {
            const friendsResponse = await api.get(
                `/friends/list/${myCode}`,
                { signal: controller.signal }
            );

            const friends = Array.isArray(friendsResponse.data)
                ? friendsResponse.data
                : [];

            const usersData = await Promise.all(
                friends.map(async (friend) => {
                    const friendCode =
                        friend.user1 === myCode
                            ? friend.user2
                            : friend.user1;

                    const [userResponse, msgResponse, unreadResponse] =
                        await Promise.all([
                            api.get(
                                `/users/code/${friendCode}`,
                                { signal: controller.signal }
                            ),
                            api.get(
                                `/messages/chat/${myCode}/${friendCode}`,
                                { signal: controller.signal }
                            ),
                            api.get(
                                `/messages/unread/${friendCode}/${myCode}`,
                                { signal: controller.signal }
                            )
                        ]);

                    const messages = Array.isArray(msgResponse.data)
                        ? msgResponse.data
                        : [];

                    return {
                        ...userResponse.data,
                        lastMessage:
                            messages.length > 0
                                ? messages[messages.length - 1].message
                                : "No messages yet",
                        unreadCount: unreadResponse.data || 0,
                    };
                })
            );

            setUsers(usersData);
        } catch (error) {
            if (error.name === "CanceledError" || error.message === "canceled") {
                console.warn("Sidebar fetch canceled");
            } else {
                console.error("Error fetching friends:", error);
            }
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchUsers();

        return () => {
            controllerRef.current?.abort();
        };
    }, [fetchUsers]);

    const filteredUsers = useMemo(
        () => users.filter((user) =>
            user.name?.toLowerCase().includes(
                search.toLowerCase()
            )
        ),
        [users, search]
    );

    const userName = useMemo(
        () => localStorage.getItem("userName"),
        []
    );

    const userCode = useMemo(
        () => localStorage.getItem("userCode"),
        []
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
                        {userName}
                    </h6>

                    <small className="text-muted">
                        {userCode}
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


                            await api.put(
                                `/users/offline/${userCode}`
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
            {loading ? (
                <div className="text-center py-4">
                    Loading chats...
                </div>
            ) : filteredUsers.length === 0 ? (
                <div className="text-center py-4">
                    No chats available.
                </div>
            ) : (
                filteredUsers.map((user) => (
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
            ))) }
        </div>
    );
};

export default Sidebar;