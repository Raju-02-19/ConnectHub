const Message = ({
  text,
  image,
  sender,
  time,
  status,
}) => {
  return (
    <div
      className={`d-flex mb-3 ${
        sender === "me"
          ? "justify-content-end"
          : "justify-content-start"
      }`}
    >
      <div
        className={`p-2 rounded shadow-sm ${
          sender === "me"
            ? "bg-primary text-white"
            : "bg-white"
        }`}
        style={{
          maxWidth: "75%",
        }}
      >
        {/* Image */}
        {image && (
          <img
            src={image}
            alt="chat"
            className="img-fluid rounded mb-2"
            style={{
              maxWidth: "250px",
            }}
          />
        )}

        {/* Message Text */}
        {text && (
          <div
            style={{
              wordBreak: "break-word",
            }}
          >
            {text}
          </div>
        )}

        {/* Time + Status */}
        <div
          className="d-flex justify-content-end align-items-center mt-1"
          style={{
            fontSize: "11px",
            opacity: 0.8,
          }}
        >
          <span>
            {time}
          </span>

          {sender === "me" && (
            <span className="ms-2">

              {status === "SENT" && (
                <span>✓</span>
              )}

              {status === "DELIVERED" && (
                <span>✓✓</span>
              )}

              {status === "READ" && (
                <span
                  className="fw-bold text-info"
                >
                  ✓✓
                </span>
              )}

            </span>
          )}
        </div>

      </div>
    </div>
  );
};

export default Message;