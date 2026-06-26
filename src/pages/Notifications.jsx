import React, { useEffect, useState, useCallback, useRef } from "react";
import api from "../services/api";

const Notifications = () => {
  const [requests, setRequests] = useState([]);
  const abortControllerRef = useRef(null);

  const fetchRequests = useCallback(async () => {
    abortControllerRef.current?.abort();
    abortControllerRef.current = new AbortController();

    try {
      const userCode = localStorage.getItem("userCode");
      if (!userCode) {
        setRequests([]);
        return;
      }

      const response = await api.get(
        `/friends/requests/${userCode}`,
        { signal: abortControllerRef.current.signal }
      );

      setRequests(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      if (
        error.name === "CanceledError" ||
        error.message === "canceled"
      ) {
        console.warn("Notifications fetch canceled");
      } else {
        console.error("Error fetching notifications:", error);
      }
    }
  }, []);

  useEffect(() => {
    fetchRequests();

    return () => {
      abortControllerRef.current?.abort();
    };
  }, [fetchRequests]);

  const acceptRequest = async (requestId) => {
    try {
      await api.put(`/friends/accept/${requestId}`);
      fetchRequests();
    } catch (error) {
      console.error("Error accepting request:", error);
    }
  };

  const rejectRequest = async (requestId) => {
    try {
      await api.put(`/friends/reject/${requestId}`);
      fetchRequests();
    } catch (error) {
      console.error("Error rejecting request:", error);
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