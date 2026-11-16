import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import "../../assets/css/adminlayout.css";
import NavItems from "../../components/NavItems";
import LeftSidebar from "./LeftSidebar";
import Topbar from "./Topbar";
import RightSidebar from "./RightSidebar";
import { useSidebar } from "../../../contexts/SidebarContexts.jsx";

const AdminLayout = ({}) => {
  const {
    isLeftSidebarOpen,
    isRightSidebarOpen,
    isPageTransitioning,
    triggerPageTransition,
  } = useSidebar();
  const location = useLocation();

  // Trigger page transition on location change
  useEffect(() => {
    triggerPageTransition();
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div
      className={`admin-root ${isLeftSidebarOpen ? "open" : "sidebar-closed"}`}
    >
      <div className="top-navbar">
        <NavItems />
      </div>

      <div className="admin-body">
        <div
          className={`left-sidebar ${isLeftSidebarOpen ? "open" : ""} ${isPageTransitioning ? "pt" : ""}`}
        >
          <LeftSidebar />
        </div>

        <div
          className={`main-area ${isPageTransitioning ? "page-transition" : ""}`}
        >
          <div className="admin-topbar">
            <Topbar />
          </div>

          <main className="content-area">
            <Outlet />
          </main>
        </div>

        <div className={`right-sidebar ${isRightSidebarOpen ? "open" : ""}`}>
          <RightSidebar />
        </div>

        {/* Mobile/backdrop */}
        {(isLeftSidebarOpen || isRightSidebarOpen) && (
          <div
            className="backdrop"
            onClick={() => {
              /* close both */
            }}
          />
        )}
      </div>
    </div>
  );
};

export default AdminLayout;
