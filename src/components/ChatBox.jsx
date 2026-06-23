
import ChatHeader from "./ChatHeader";
import Message from "./Message";
import MessageInput from "./MessageInput";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

const ChatBox = ({
  selectedChat,
  setSelectedChat,
  darkMode,
}) => {

  const [messages, setMessages] =
    useState([]);

  const [stompClient, setStompClient] =
    useState(null);

  const messagesEndRef =
    useRef(null);

  const currentUser = {
    userCode:
      localStorage.getItem("userCode"),
  };

  // WebSocket Connection
  useEffect(() => {

    const client = new Client({

      webSocketFactory: () =>
        new SockJS(
          "https://connecthub-backend-4t3q.onrender.com/chat"
        ),

      reconnectDelay: 5000,

      onConnect: () => {


        client.subscribe(
          "/topic/messages",
          (message) => {

            const received =
              JSON.parse(
                message.body
              );

            received.timestamp =
              received.timestamp ||
              Date.now();

            if (
              selectedChat &&
              (
                received.senderId ===
                  selectedChat.userCode ||

                received.receiverId ===
                  selectedChat.userCode
              )
            ) {

              setMessages(
                (prev) => [
                  ...prev,
                  received
                ]
              );

            }

          }
        );

        setStompClient(
          client
        );

      },

      onStompError:
        (frame) => {

          console.error(
            "STOMP Error:",
            frame
          );

        }

    });

    client.activate();

    return () => {

      client.deactivate();

    };

  }, [selectedChat]);

  // Load Chat
  useEffect(() => {

    if (selectedChat) {

      fetchMessages();

    }

  }, [selectedChat]);

  // Auto Scroll
  useEffect(() => {

    messagesEndRef.current
      ?.scrollIntoView({
        behavior: "smooth",
      });

  }, [messages]);

  const fetchMessages =
    async () => {

      try {

        await axios.put(
          `https://connecthub-backend-4t3q.onrender.com/api/messages/read/${selectedChat.userCode}/${currentUser.userCode}`
        );

        const response =
          await axios.get(
            `https://connecthub-backend-4t3q.onrender.com/api/messages/chat/${currentUser.userCode}/${selectedChat.userCode}`
          );

        setMessages(
          response.data
        );

      } catch (error) {

        console.error(
          error
        );

      }

    };

  const sendMessage =
    async (text) => {

      if (!text.trim())
        return;

      try {

        await axios.post(
          "https://connecthub-backend-4t3q.onrender.com/api/messages/send",
          {
            senderId:
              currentUser.userCode,

            receiverId:
              selectedChat.userCode,

            message:
              text,
          }
        );

        if (
          stompClient
        ) {

          stompClient.publish({

            destination:
              "/app/chat.send",

            body:
              JSON.stringify({

                senderId:
                  currentUser.userCode,

                receiverId:
                  selectedChat.userCode,

                message:
                  text,

                timestamp:
                  Date.now()

              }),

          });

        }

        fetchMessages();

      } catch (error) {

        console.error(
          error
        );

      }

    };

  const sendImage =
    (imageUrl) => {



    };

  if (!selectedChat) {

    return (

      <div className="d-flex justify-content-center align-items-center h-100">

        <h4>
          Select a Chat
        </h4>

      </div>

    );

  }

  return (

    <div
      className="d-flex flex-column"
      style={{
        height: "100vh"
      }}
    >

      <ChatHeader
        selectedChat={
          selectedChat
        }
        setSelectedChat={
          setSelectedChat
        }
        darkMode={
          darkMode
        }
      />

      <div
        className="flex-grow-1 p-3"
        style={{
          overflowY:
            "auto",
          background:
            "#f5f7fb",
        }}
      >

        {messages.map(
          (msg, index) => (

            <Message
              key={
                msg.id ||
                index
              }
              text={
                msg.message
              }
              status={
                msg.status
              }
              sender={
                msg.senderId ===
                  currentUser.userCode
                  ? "me"
                  : "other"
              }
              time={
                msg.timestamp
                  ? new Date(
                      msg.timestamp
                    ).toLocaleTimeString(
                      [],
                      {
                        hour:
                          "2-digit",
                        minute:
                          "2-digit",
                      }
                    )
                  : ""
              }
            />

          )
        )}

        <div
          ref={
            messagesEndRef
          }
        />

      </div>

      <MessageInput
        sendMessage={
          sendMessage
        }
        sendImage={
          sendImage
        }
      />

    </div>

  );
};

export default ChatBox;

