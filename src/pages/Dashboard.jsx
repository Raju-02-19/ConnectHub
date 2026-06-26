import { useState, useEffect, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import ChatBox from "../components/ChatBox";
import BottomNav from "../components/BottomNav";


const Dashboard = () => {

    const navigate = useNavigate();
    const location = useLocation();

    const [darkMode, setDarkMode] = useState(false);
    const [selectedChat, setSelectedChat] = useState(null);
    const [activeTab, setActiveTab] = useState("chats");

    const userCode = useMemo(
        () => localStorage.getItem("userCode"),
        []
    );

    useEffect(() => {
        if (!userCode) {
            navigate("/login");
        }
    }, [navigate, userCode]);
    useEffect(() => {

        if (location.state?.selectedUser) {

            setSelectedChat(
                location.state.selectedUser
            );

        }

    }, [location]);
    return (
        <>
            <div
                className="d-none d-md-flex vh-100"
                style={{
                    background: "#f4f7fb",
                }}
            >
                {/* Left Navigation */}
                <div
                    style={{
                        width: "80px",
                        background:
                            "linear-gradient(180deg,#6366F1,#8B5CF6)",
                        boxShadow:
                            "0 0 15px rgba(0,0,0,0.15)",
                    }}
                >
                    <BottomNav
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                    />
                </div>

                {/* Sidebar */}
                <div
                    style={{
                        width: "350px",
                        background: "#fff",
                        borderRight:
                            "1px solid #e5e7eb",
                        boxShadow:
                            "0 2px 10px rgba(0,0,0,0.05)",
                    }}
                >
                    <Sidebar
                        setSelectedChat={setSelectedChat}
                        darkMode={darkMode}
                        setDarkMode={setDarkMode}
                    />
                </div>

                {/* Chat Area */}
                <div
                    className="flex-grow-1"
                    style={{
                        background:
                            "linear-gradient(to bottom,#f8fafc,#eef2ff)",
                    }}
                >
                    <ChatBox
                        selectedChat={selectedChat}
                        setSelectedChat={setSelectedChat}
                        darkMode={darkMode}
                    />
                </div>
            </div>

            {/* Mobile Layout */}
            <div className="d-md-none">

                {!selectedChat ? (
                    <Sidebar
                        setSelectedChat={setSelectedChat}
                        darkMode={darkMode}
                        setDarkMode={setDarkMode}
                    />
                ) : (
                    <ChatBox
                        selectedChat={selectedChat}
                        setSelectedChat={setSelectedChat}
                        darkMode={darkMode}
                    />
                )}

                {!selectedChat && (
                    <BottomNav
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                    />
                )}

            </div>
        </>
    );

};

export default Dashboard;
