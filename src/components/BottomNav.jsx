import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

const navItems = [
  {
    key: "chats",
    icon: "bi-chat-dots-fill",
    path: "/dashboard",
  },
  {
    key: "contacts",
    icon: "bi-people-fill",
    path: "/contacts",
  },
  {
    key: "calls",
    icon: "bi-telephone-fill",
    path: "/calls",
  },
  {
    key: "notifications",
    icon: "bi-bell-fill",
    path: "/notifications",
  },
  {
    key: "profile",
    icon: "bi-person-circle",
    path: "/profile",
  },
  {
    key: "settings",
    icon: "bi-gear-fill",
    path: "/settings",
  },
];

const BottomNav = ({ activeTab, setActiveTab }) => {
  const navigate = useNavigate();

  const handleNavigation = useCallback(
    (item) => {
      setActiveTab(item.key);
      navigate(item.path);
    },
    [navigate, setActiveTab]
  );

  return (
    <>
      {/* Desktop Left Navigation */}
      <div
        className="d-none d-md-flex flex-column align-items-center bg-dark text-white h-100 py-3"
        style={{
          width: "70px",
          height: "100vh",
        }}
      >
        <h4 className="mb-4">💬</h4>

        {navItems.map((item) => (
          <button
            key={item.key}
            className="btn text-white mb-3"
            onClick={() => handleNavigation(item)}
          >
            <i
              className={`bi ${item.icon} fs-4 ${activeTab === item.key
                  ? "text-primary"
                  : "text-white"
                }`}
            ></i>
          </button>
        ))}
      </div>

      {/* Mobile Bottom Navigation */}
      <div
        className="d-md-none position-fixed bottom-0 start-0 w-100 bg-white border-top shadow-sm"
        style={{ zIndex: 1000 }}
      >
        <div className="d-flex justify-content-around py-2">
          {navItems.map((item) => (
            <button
              key={item.key}
              className="btn"
              onClick={() => handleNavigation(item)}
            >
              <i
                className={`bi ${item.icon} fs-4 ${activeTab === item.key
                    ? "text-primary"
                    : "text-secondary"
                  }`}
              ></i>
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default BottomNav;