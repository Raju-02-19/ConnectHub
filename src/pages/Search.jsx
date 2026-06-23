import React, { useState } from "react";
import axios from "axios";

const Search = () => {

    const [userCode, setUserCode] = useState("");
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    const searchUser = async () => {

        if (!userCode.trim()) {

            return;
        }

        try {

            setLoading(true);

            const response = await axios.get(
                `https://connecthub-backend-4t3q.onrender.com/api/users/search/${userCode}`
            );

            if (!response.data) {
                setUser(null);
  
                return;
            }

            setUser(response.data);

        } catch (error) {

            console.error(error);

            setUser(null);



        } finally {

            setLoading(false);

        }
    };

    const sendFriendRequest = async () => {

        try {

            const senderCode =
                localStorage.getItem("userCode");

            if (!senderCode) {

                return;
            }

            if (senderCode === user.userCode) {


                return;
            }

            await axios.post(
                "https://connecthub-backend-4t3q.onrender.com/api/friends/send",
                {
                    senderId: senderCode,
                    receiverId: user.userCode,
                }
            );



            setUser(null);
            setUserCode("");

        } catch (error) {

            console.error(error);


        }
    };

    return (
        <div className="container mt-4">

            <h2 className="mb-4">
                Search Users
            </h2>

            <div className="input-group mb-4">

                <input
                    type="text"
                    className="form-control"
                    placeholder="Enter User Code (CH1002)"
                    value={userCode}
                    onChange={(e) =>
                        setUserCode(
                            e.target.value.toUpperCase()
                        )
                    }
                />

                <button
                    className="btn btn-primary"
                    onClick={searchUser}
                >
                    {loading
                        ? "Searching..."
                        : "Search"}
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
                            disabled={
                                localStorage.getItem(
                                    "userCode"
                                ) === user.userCode
                            }
                        >
                            {localStorage.getItem(
                                "userCode"
                            ) === user.userCode
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