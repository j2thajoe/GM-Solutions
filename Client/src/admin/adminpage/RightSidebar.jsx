import React, { useEffect, useState } from "react";
import "../../assets/css/adminlayout.css";
import { useSidebar } from "../../../contexts/SidebarContexts";

const RightSidebar = () => {
  const { notifications, markNotificationRead, markAllRead } = useSidebar();
    const { isRightSidebarCollapsed, toggleRightSidebar } = useSidebar();

  return (
    <aside className="right-sidebar-inner">

       <button
          className="collapse-btn"
          onClick={toggleRightSidebar}
          title={isRightSidebarCollapsed ? "Expand" : "Collapse"}
        >
          {isRightSidebarCollapsed ? "‹" : "›"}
      </button>
      
      <div className="header">
        <h3>Notifications</h3>
        <button className="mark-all" onClick={markAllRead}>
          Mark all read
        </button>
      </div>

      <div className="list">
        {notifications.length === 0 && (
          <div className="note">No notifications</div>
        )}
        {notifications.map((n) => (
          <div key={n.id} className={`note ${n.read ? "read" : "unread"}`}>
            <div className="note-head">
              <strong>{n.title}</strong>
              {!n.read && (
                <button
                  className="mark-btn"
                  onClick={() => markNotificationRead(n.id)}
                >
                  Mark
                </button>
              )}
            </div>
            <p className="note-body">{n.body}</p>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default RightSidebar;
