import React, { useState } from "react";
import ProfileModal from "./ProfileModal";

const ChatHeader = ({
  selectedChat,
  setSelectedChat,
  darkMode,
}) => {

  const [showProfile, setShowProfile] =
    useState(false);

  if (!selectedChat) return null;

  return (
    <>
      <div
        className="d-flex align-items-center justify-content-between px-4 py-3 border-bottom"
        style={{
          background: darkMode
            ? "#111827"
            : "#ffffff",
          boxShadow:
            "0 2px 10px rgba(0,0,0,0.08)",
        }}
      >
        {/* Left Side */} <div className="d-flex align-items-center">


          <button
            className="btn btn-light d-md-none me-2"
            onClick={() =>
              setSelectedChat(null)
            }
          >
            ←
          </button>

          <img
            src={
              selectedChat.profilePic ||
              `https://ui-avatars.com/api/?name=${selectedChat.name}`
            }
            alt={selectedChat.name}
            width="50"
            height="50"
            className="rounded-circle shadow-sm"
            style={{
              cursor: "pointer",
              objectFit: "cover",
            }}
            onClick={() =>
              setShowProfile(true)
            }
          />

          <div className="ms-3">

            <h6
              className={`mb-0 fw-bold ${darkMode
                  ? "text-white"
                  : "text-dark"
                }`}
            >
              {selectedChat.name}
            </h6>

            <small
              className={
                selectedChat.status ===
                  "ONLINE"
                  ? "text-success"
                  : "text-secondary"
              }
            >
              {selectedChat.status ===
                "ONLINE"
                ? "🟢 Online"
                : "⚫ Offline"}
            </small>

          </div>
        </div>

        {/* Right Side */}
        <div>

          <button className="btn btn-light rounded-circle me-2">
            📞
          </button>

          <button className="btn btn-light rounded-circle me-2">
            🎥
          </button>

          <button className="btn btn-light rounded-circle">
            ⋮
          </button>

        </div>
      </div>

      {showProfile && (
        <ProfileModal
          user={selectedChat}
          onClose={() =>
            setShowProfile(false)
          }
        />
      )}
    </>


  );
};

export default ChatHeader;
