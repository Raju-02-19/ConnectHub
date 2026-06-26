import { useState, useRef, useCallback, memo } from "react";
import EmojiPicker from "emoji-picker-react";

const emojiPickerStyle = {
    position: "absolute",
    bottom: "70px",
    left: "10px",
    zIndex: 1000,
};

const MessageInput = ({ sendMessage }) => {

    const [showEmoji, setShowEmoji] = useState(false);
    const [message, setMessage] = useState("");
    const fileRef = useRef(null);

    const onEmojiClick = useCallback((emojiData) => {
        setMessage((prev) => prev + emojiData.emoji);
    }, []);

    const handleSend = useCallback(() => {
        if (!message.trim()) return;
        sendMessage(message);
        setMessage("");
    }, [message, sendMessage]);

    const handleKeyDown = useCallback((e) => {
        if (e.key === "Enter") {
            handleSend();
        }
    }, [handleSend]);

    const toggleEmoji = useCallback(() => {
        setShowEmoji((prev) => !prev);
    }, []);

    const toggleFileInput = useCallback(() => {
        fileRef.current?.click();
    }, []);

    return (
        <div className="bg-white border-top p-2">

            <div className="input-group">

                <button
                    className="btn btn-light"
                    onClick={toggleEmoji}
                    title="Emoji"
                >
                    😊
                </button>

                <button
                    className="btn btn-light"
                    onClick={toggleFileInput}
                    title="Attach file"
                >
                    📎
                </button>

                {showEmoji && (
                    <div style={emojiPickerStyle}>
                        <EmojiPicker onEmojiClick={onEmojiClick} />
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
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
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

export default memo(MessageInput);
