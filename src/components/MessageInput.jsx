import { useState, useRef } from "react";
import EmojiPicker from "emoji-picker-react";

const MessageInput = ({ sendMessage }) => {

    const [showEmoji, setShowEmoji] =
        useState(false);

    const [message, setMessage] =
        useState("");

    const fileRef = useRef(null);

    const onEmojiClick = (emojiData) => {

        setMessage(
            (prev) => prev + emojiData.emoji
        );

    };

    const handleSend = () => {

        if (!message.trim()) return;

        sendMessage(message);

        setMessage("");

    };

    return (
        <div className="bg-white border-top p-2">

            <div className="input-group">

                <button
                    className="btn btn-light"
                    onClick={() =>
                        setShowEmoji(!showEmoji)
                    }
                >
                    😊
                </button>

                <button
                    className="btn btn-light"
                    onClick={() =>
                        fileRef.current.click()
                    }
                >
                    📎
                </button>

                {showEmoji && (
                    <div
                        style={{
                            position: "absolute",
                            bottom: "70px",
                            left: "10px",
                            zIndex: 1000,
                        }}
                    >
                        <EmojiPicker
                            onEmojiClick={onEmojiClick}
                        />
                    </div>
                )}

                <input
                    type="file"
                    hidden
                    ref={fileRef}
                />

                <input
                    type="text"
                    className="form-control"
                    placeholder="Type a message..."
                    value={message}
                    onChange={(e) =>
                        setMessage(
                            e.target.value
                        )
                    }
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            handleSend();
                        }
                    }}
                />

                <button
                    className="btn btn-primary"
                    onClick={handleSend}
                >
                    Send
                </button>

            </div>

        </div>
    );
};

export default MessageInput;