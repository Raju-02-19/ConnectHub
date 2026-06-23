import React, { useEffect, useState } from "react";
import axios from "axios";

const Notifications = () => {

  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {

    try {

      const userCode =
        localStorage.getItem("userCode");

      const response = await axios.get(
        `https://connecthub-backend-4t3q.onrender.com/api/friends/requests/${userCode}`
      );

      setRequests(response.data);

    } catch (error) {

      console.error(error);

    }
  };

  const acceptRequest = async (requestId) => {

    try {

      await axios.put(
        `https://connecthub-backend-4t3q.onrender.com/api/friends/accept/${requestId}`
      );



      fetchRequests();

    } catch (error) {

      console.error(error);

    }
  };

  const rejectRequest = async (requestId) => {

    try {

      await axios.put(
        `https://connecthub-backend-4t3q.onrender.com/api/friends/reject/${requestId}`
      );


      fetchRequests();

    } catch (error) {

      console.error(error);

    }
  };

  return (
    <div className="container mt-4">

      <h2 className="mb-4">
        Notifications
      </h2>

      {requests.length === 0 ? (
        <div className="alert alert-info">
          No Friend Requests
        </div>
      ) : (
        requests.map((request) => (

          <div
            key={request.id}
            className="card shadow-sm mb-3"
          >
            <div className="card-body">

              <h5>
                Friend Request
              </h5>

              <p>
                From:
                <strong>
                  {" "}
                  {request.senderId}
                </strong>
              </p>

              <p>
                Status:
                <strong>
                  {" "}
                  {request.status}
                </strong>
              </p>

              {request.status ===
                "PENDING" && (
                  <>
                    <button
                      className="btn btn-success me-2"
                      onClick={() =>
                        acceptRequest(
                          request.id
                        )
                      }
                    >
                      Accept
                    </button>

                    <button
                      className="btn btn-danger"
                      onClick={() =>
                        rejectRequest(
                          request.id
                        )
                      }
                    >
                      Reject
                    </button>
                  </>
                )}

            </div>
          </div>

        ))
      )}

    </div>
  );
};

export default Notifications;