// src/contexts/SidebarContext.jsx
import React, { createContext, useState, useContext } from "react";

const SidebarContext = createContext();

export const SidebarProvider = ({ children }) => {
  const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(true);
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false);
  const [isLeftSidebarCollapsed, setIsLeftSidebarCollapsed] = useState(false);
  const [isTopbarOpen, setIsTopbarOpen] = useState(true);

   // simple notifications store
    const [notifications, setNotifications] = useState([
    { id: 1, title: "Pending Order", body: "17 items need approval.", read: false },
    { id: 2, title: "Low Stock", body: "6 products need restocking.", read: false },
    { id: 3, title: "New Message", body: "You have 4 new messages.", read: false },
    ]);
  
    // page transition flag (set true briefly on route change)
  const [isPageTransitioning, setIsPageTransitioning] = useState(false);

  const toggleLeftSidebar = () => setIsLeftSidebarOpen((prev) => !prev);
  const toggleRightSidebar = () => setIsRightSidebarOpen((prev) => !prev);
  const toggleTopbar = () => setIsTopbarOpen((prev) => !prev);
  const toggleCollapse = () => setIsLeftSidebarCollapsed((p) => !p);

    // notifications helpers
  const markNotificationRead = (id) =>
    setNotifications((prev) => prev.map(n => n.id === id ? { ...n, read: true } : n));
  const markAllRead = () => setNotifications((prev) => prev.map(n => ({...n, read: true})));
  const addNotification = (notif) =>
    setNotifications((p) => [{ id: Date.now(), read: false, ...notif }, ...p]);


    // page transition helper (AdminLayout will call this on location change)
  const triggerPageTransition = (duration = 420) => {
    setIsPageTransitioning(true);
    window.setTimeout(() => setIsPageTransitioning(false), duration);
  };

  return (
    <SidebarContext.Provider
      value={{
        isLeftSidebarOpen,
        toggleLeftSidebar,
        isRightSidebarOpen,
        toggleRightSidebar,
        isTopbarOpen,
        toggleTopbar,
        isLeftSidebarCollapsed,
        toggleCollapse,
        notifications,
        markNotificationRead,
        markAllRead,
        addNotification,
        isPageTransitioning,
        triggerPageTransition,

      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => useContext(SidebarContext);
