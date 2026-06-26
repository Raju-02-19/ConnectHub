import ChatHeader from "./ChatHeader";
import Message from "./Message";
import MessageInput from "./MessageInput";
import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import api from "../services/api";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

const ChatBox = ({
  selectedChat,
  setSelectedChat,
  darkMode,
}) => {

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const selectedChatRef = useRef(null);
  const messagesEndRef = useRef(null);
  const stompClientRef = useRef(null);
  const abortControllerRef = useRef(null);

  const currentUserCode = useMemo(
    () => localStorage.getItem("userCode"),
    []
  );

  useEffect(() => {
    selectedChatRef.current = selectedChat;
  }, [selectedChat]);

  // Load Messages
  const fetchMessages = useCallback(async () => {
    if (!selectedChat || !currentUserCode) return;

    abortControllerRef.current?.abort();
    abortControllerRef.current = new AbortController();
    const signal = abortControllerRef.current.signal;

    setLoading(true);

    try {
      const [, response] = await Promise.all([
        api.put(
          `/messages/read/${selectedChat.userCode}/${currentUserCode}`,
          { signal }
        ),
        api.get(
          `/messages/chat/${currentUserCode}/${selectedChat.userCode}`,
          { signal }
        ),
      ]);

      setMessages(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      if (
        error.name === "CanceledError" ||
        error.message === "canceled"
      ) {
        console.warn("ChatBox fetch canceled");
      } else {
        console.error("Error loading messages:", error);
      }
    } finally {
      setLoading(false);
    }
  }, [selectedChat, currentUserCode]);

  // WebSocket
  useEffect(() => {
    const client = new Client({
      webSocketFactory: () =>
        new SockJS(
          "https://connecthub-backend-4t3q.onrender.com/chat"
        ),
      reconnectDelay: 5000,
      onConnect: () => {
        client.subscribe("/topic/messages", (message) => {
          const received = JSON.parse(message.body);
          received.timestamp = received.timestamp || Date.now();

          const currentChat = selectedChatRef.current;
          if (!currentChat) return;

          if (
            received.senderId === currentChat.userCode ||
            received.receiverId === currentChat.userCode
          ) {
            setMessages((prev) => {
              const exists = prev.some(
                (msg) =>
                  msg.senderId === received.senderId &&
                  msg.receiverId === received.receiverId &&
                  msg.message === received.message &&
                  Math.abs(
                    new Date(msg.timestamp).getTime() -
                    new Date(received.timestamp).getTime()
                  ) < 2000
              );

              if (exists) return prev;
              return [...prev, received];
            });
          }
        });
      },
      onStompError: (frame) => {
        console.error(frame);
      },
    });

    stompClientRef.current = client;
    client.activate();

    return () => {
      client.deactivate();
      stompClientRef.current = null;
    };
  }, []);

  useEffect(() => {
    fetchMessages();

    return () => {
      abortControllerRef.current?.abort();
    };
  }, [fetchMessages]);

  useEffect(() => {
    requestAnimationFrame(() => {
      messagesEndRef.current?.scrollIntoView({
        behavior: "smooth",
      });
    });
  }, [messages.length]);

  // Send Message
  const sendMessage = async (text) => {
    if (!text.trim() || !selectedChat) return;

    const newMessage = {
      senderId: currentUserCode,
      receiverId: selectedChat.userCode,
      message: text,
      timestamp: Date.now(),
    };

    // Show immediately
    setMessages((prev) => [...prev, newMessage]);

    try {

      const response = await api.post(
        "/messages/send",
        {
          senderId: currentUserCode,
          receiverId: selectedChat.userCode,
          message: text,
        }
      );

      if (
        response.data &&
        typeof response.data === "object"
      ) {

        setMessages((prev) => [
          ...prev.slice(0, -1),
          response.data,
        ]);

      }

    } catch (error) {

      setMessages((prev) =>
        prev.filter(
          (msg) => msg !== newMessage
        )
      );

      console.error("Send message error:", error);

    }

  };

  const sendImage = (imageUrl) => { };

  if (!selectedChat) {
    return (
      <div className="d-flex justify-content-center align-items-center h-100">
        <h4 className="text-muted">Select a Chat</h4>
      </div>
    );
  }

  return (

    <div
      className="d-flex flex-column"
      style={{
        height: "100vh",
      }}
    >

      <ChatHeader
        selectedChat={selectedChat}
        setSelectedChat={setSelectedChat}
        darkMode={darkMode}
      />

      <div
        className="flex-grow-1 p-3"
        style={{
          overflowY: "auto",
          background: "#f5f7fb",
        }}
      >

        {messages.map((msg, index) => (

          <Message
            key={msg.id || index}
            text={msg.message}
            status={msg.status}
            sender={
              msg.senderId === currentUserCode
                ? "me"
                : "other"
            }
            time={
              msg.timestamp
                ? new Date(msg.timestamp).toLocaleTimeString(
                  [],
                  {
                    hour: "2-digit",
                    minute: "2-digit",
                  }
                )
                : ""
            }
          />

        ))}

        <div ref={messagesEndRef} />

      </div>

      <MessageInput
        sendMessage={sendMessage}
        sendImage={sendImage}
      />

    </div>

  );

};

export default ChatBox;