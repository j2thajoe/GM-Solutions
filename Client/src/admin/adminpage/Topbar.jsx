import React, { useState } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import { useSidebar } from "../../../contexts/SidebarContexts";
import { Menu, Bell } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Topbar = () => {
  const { toggleLeftSidebar, toggleRightSidebar, notifications } = useSidebar();
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // navigate to shop page with query param (customize as needed)
    navigate(`/shop?search=${encodeURIComponent(query)}`);
  };

  return (
    <div className="topbar-inner">
      <div className="topbar-left">
        <button className="hamburger" onClick={toggleLeftSidebar}>
          ☰
        </button>

        <form className="topbar-search" onSubmit={handleSearchSubmit}>
          <input
            type="search"
            placeholder="Search products, orders..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="search-input"
          />
        </form>
      </div>

      <div className="topbar-right">
        <button
          className="icon-btn bell-btn"
          onClick={toggleRightSidebar}
          aria-label="Notifications"
        >
          <Bell size={24} />
          {unreadCount > 0 && <span className="badge">{unreadCount}</span>}
        </button>

        <div className="profile-area">
          <img
            src="/default-profile.png"
            alt="profile"
            className="profile-img"
          />
        </div>
      </div>
    </div>
  );
};
export default Topbar;
