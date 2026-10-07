import { useState } from "react";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

import "../styles/dashboard.css";


function Layout({
  children,
  variant = "default",
}) {
  const isAdmin = variant === "admin";

  const [sidebarOpen, setSidebarOpen] =
    useState(false);


  const toggleSidebar = () => {
    setSidebarOpen(
      (open) => !open
    );
  };


  const closeSidebar = () => {
    setSidebarOpen(false);
  };


  return (
    <div
      className={
        isAdmin
          ? "cms-app cms-admin-app"
          : "cms-app"
      }
    >

      <Navbar
        variant={variant}
        onMenuClick={toggleSidebar}
      />


      <div className="cms-main">

        <Sidebar
          variant={variant}
          isOpen={sidebarOpen}
          onClose={closeSidebar}
        />


        {isAdmin && sidebarOpen && (
          <button
            type="button"
            className="cms-sidebar-backdrop"
            aria-label="Close navigation"
            onClick={closeSidebar}
          />
        )}


        <main
          className={
            isAdmin
              ? "cms-content cms-admin-content"
              : "cms-content"
          }
        >
          {children}
        </main>

      </div>

    </div>
  );
}


export default Layout;