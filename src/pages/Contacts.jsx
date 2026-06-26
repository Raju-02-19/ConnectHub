import React, { useEffect, useState, useCallback, useMemo, useRef } from "react";
import api from "../services/api";
import MainLayout from "../layouts/MainLayout";
import { useNavigate } from "react-router-dom";

const Contacts = () => {
  const [friends, setFriends] = useState([]);
  const [search, setSearch] = useState("");
  const abortControllerRef = useRef(null);

  const navigate = useNavigate();

  const fetchFriends = useCallback(async () => {
    abortControllerRef.current?.abort();
    abortControllerRef.current = new AbortController();

    try {
      const myCode = localStorage.getItem("userCode");
      if (!myCode) {
        setFriends([]);
        return;
      }

      const response = await api.get(
        `/friends/list/${myCode}`,
        { signal: abortControllerRef.current.signal }
      );

      const friendsList = Array.isArray(response.data)
        ? response.data
        : [];

      const usersData = await Promise.all(
        friendsList.map(async (friend) => {
          const friendCode =
            friend.user1 === myCode ? friend.user2 : friend.user1;

          const userResponse = await api.get(
            `/users/code/${friendCode}`,
            { signal: abortControllerRef.current.signal }
          );

          return userResponse.data;
        })
      );

      setFriends(usersData);
    } catch (error) {
      if (
        error.name === "CanceledError" ||
        error.message === "canceled"
      ) {
        console.warn("Contacts fetch canceled");
      } else {
        console.error("Error fetching contacts:", error);
      }
    }
  }, []);

  useEffect(() => {
    fetchFriends();

    return () => {
      abortControllerRef.current?.abort();
    };
  }, [fetchFriends]);

const filteredFriends = useMemo(
    () =>
        friends.filter((user) =>
            user.name
                ?.toLowerCase()
                .includes(search.toLowerCase())
        ),
    [friends, search]
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
