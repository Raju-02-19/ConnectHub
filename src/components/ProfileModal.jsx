const ProfileModal = ({ user, onClose }) => {
    if (!user) return null;

    return (
        <div
            className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
            style={{
                background: "rgba(0,0,0,0.5)",
                zIndex: 9999,
            }}
        >
            <div
                className="bg-white p-4 rounded shadow"
                style={{
                    width: "320px",
                }}
            >
                <div className="text-center">

                    <img
                        src={user.image}
                        alt={user.name}
                        className="rounded-circle mb-3"
                        width="100"
                        height="100"
                    />

                    <h4>{user.name}</h4>

                    <p>
                        {user.online
                            ? "🟢 Online"
                            : "⚪ Offline"}
                    </p>

                    <button
                        className="btn btn-danger"
                        onClick={onClose}
                    >
                        Close
                    </button>

                </div>
            </div>
        </div>
    );
};

export default ProfileModal;