import React, { useState, useRef, useMemo, useCallback } from "react";
import api from "../services/api";

const Search = () => {
  const [userCode, setUserCode] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const abortControllerRef = useRef(null);

  const currentUserCode = useMemo(
    () => localStorage.getItem("userCode"),
    []
  );

  const searchUser = useCallback(async () => {
    if (!userCode.trim()) {
      return;
    }

    abortControllerRef.current?.abort();
    abortControllerRef.current = new AbortController();

    try {
      setLoading(true);

      const response = await api.get(
        `/users/search/${userCode}`,
        { signal: abortControllerRef.current.signal }
      );

      setUser(response.data || null);
    } catch (error) {
      if (
        error.name === "CanceledError" ||
        error.message === "canceled"
      ) {
        console.warn("Search canceled");
      } else {
        console.error("Search error:", error);
      }
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, [userCode]);

  const sendFriendRequest = useCallback(async () => {
    if (!currentUserCode || !user || currentUserCode === user.userCode) {
      return;
    }

    try {
      await api.post("/friends/send", {
        senderId: currentUserCode,
        receiverId: user.userCode,
      });

      setUser(null);
      setUserCode("");
    } catch (error) {
      console.error("Send friend request failed:", error);
    }
  }, [currentUserCode, user]);

  const isOwnAccount = useMemo(
    () => currentUserCode === user?.userCode,
    [currentUserCode, user]
  );

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Search Users</h2>

      <div className="input-group mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Enter User Code (CH1002)"
          value={userCode}
          onChange={(e) => setUserCode(e.target.value.toUpperCase())}
        />

        <button
          className="btn btn-primary"
          onClick={searchUser}
          disabled={loading}
        >
          {loading ? "Searching..." : "Search"}
        </button>

            </div>

            {user && (

                <div className="card shadow border-0">

                    <div className="card-body">

                        <div className="text-center mb-3">

                            <img
                                src={
                                    user.profilePic ||
                                    `https://ui-avatars.com/api/?name=${user.name}`
                                }
                                alt={user.name}
                                className="rounded-circle"
                                width="90"
                                height="90"
                            />

                        </div>

                        <h4 className="text-center">
                            {user.name}
                        </h4>

                        <p className="text-center text-muted">
                            {user.userCode}
                        </p>

                        <hr />

                        <p>
                            <strong>Status:</strong>{" "}
                            {user.status || "OFFLINE"}
                        </p>

                        <p>
                            <strong>Email:</strong>{" "}
                            {user.email}
                        </p>

                        <button
                            className="btn btn-success w-100"
                            onClick={sendFriendRequest}
                            disabled={isOwnAccount}
                        >
                            {isOwnAccount
                                ? "Your Account"
                                : "Send Friend Request"}
                        </button>

                    </div>

                </div>

            )}

        </div>
    );
};

export default Search;