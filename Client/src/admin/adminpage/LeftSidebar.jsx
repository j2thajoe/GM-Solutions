import React, { useState } from "react";
import "../../assets/css/adminlayout.css";
import { NavLink } from "react-router-dom";
import { useSidebar } from "../../../contexts/SidebarContexts";
import {
  LayoutDashboard,
  ShoppingBag,
  BookOpen,
  Palette,
  Settings,
  Layers,
  Menu,
  X,
} from "lucide-react";

const links = [
  { to: "/admin", label: "Dashboard", icon: <LayoutDashboard size={20} /> },
  {
    to: "/admin/ShopAdministrator",
    label: "Shop",
    icon: <ShoppingBag size={20} />,
  },
  {
    to: "/admin/StudyAdministrator",
    label: "Study",
    icon: <BookOpen size={20} />,
  },
  {
    to: "/admin/ARTsAdministrator",
    label: "ARTs",
    icon: <Palette size={20} />,
  },
  {
    to: "/admin/ServicesAdministrator",
    label: "Services",
    icon: <Layers size={20} />,
  },
  {
    to: "/admin/CompleteSiteAdministrator",
    label: "Complete Admin",
    icon: <Settings size={20} />,
  },
];

const LeftSidebar = () => {
  const { isLeftSidebarCollapsed, toggleLeftSidebar } = useSidebar();

  return (
    <aside
      className={`left-sidebar-inner ${isLeftSidebarCollapsed ? "collapsed" : ""}`}
    >
      <div className="admin-sidebar-brand">
        <button
          className="collapse-btn"
          onClick={toggleLeftSidebar}
          title={isLeftSidebarCollapsed ? "Expand" : "Collapse"}
        >
          {isLeftSidebarCollapsed ? "›" : "‹"}
        </button>

        <span className="brand-icon">⚙️</span>
        {!isLeftSidebarCollapsed && (
          <span className="brand-title">Admin Panel</span>
        )}
      </div>

      <nav className="nav-links">
        {links.map(({ to, label, icon }) => (
          <NavLink key={to} to={to} className="nav-link">
            <span className="icon">{icon}</span>
            {!isLeftSidebarCollapsed && <span className="label">{label}</span>}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};
export default LeftSidebar;
