import React, { useState, useEffect, useRef, useCallback } from "react";
import api from "../services/api";

const EditProfile = () => {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [status, setStatus] = useState("ONLINE");
  const [profilePic, setProfilePic] = useState("");
  const [loading, setLoading] = useState(false);
  const abortControllerRef = useRef(null);
  const userIdRef = useRef(null);

  const loadProfile = useCallback(async () => {
    abortControllerRef.current?.abort();
    abortControllerRef.current = new AbortController();

    try {
      const userCode = localStorage.getItem("userCode");
      if (!userCode) return;

      const response = await api.get(
        `/users/code/${userCode}`,
        { signal: abortControllerRef.current.signal }
      );

      const data = response.data || {};
      userIdRef.current = data.id;
      setName(data.name || "");
      setBio(data.bio || "");
      setStatus(data.status || "ONLINE");
      setProfilePic(data.profilePic || "");
    } catch (error) {
      if (
        error.name === "CanceledError" ||
        error.message === "canceled"
      ) {
        console.warn("EditProfile load canceled");
      } else {
        console.error("Error loading profile:", error);
      }
    }
  }, []);

  useEffect(() => {
    loadProfile();

    return () => {
      abortControllerRef.current?.abort();
    };
  }, [loadProfile]);

  const saveProfile = async () => {
    if (!userIdRef.current) {
      console.warn("No user id available for profile update");
      return;
    }

    try {
      setLoading(true);
      await api.put(
        `/users/update/${userIdRef.current}`,
        {
          name,
          bio,
          status,
          profilePic,
        }
      );

      localStorage.setItem("userName", name);
    } catch (error) {
      console.error("Error saving profile:", error);
    } finally {
      setLoading(false);
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

