import { NavLink } from "react-router-dom";

import {
  FaTachometerAlt,
  FaUserGraduate,
  FaChalkboardTeacher,
  FaBook,
  FaBuilding,
  FaMoneyBillWave,
  FaClipboardCheck,
  FaGraduationCap,
  FaBullhorn,
  FaCalendarAlt,
  FaFileAlt,
  FaCog,
  FaTimes,
  FaUserCircle,
} from "react-icons/fa";

function Sidebar({
  variant = "default",
  isOpen = false,
  onClose,
}) {
  // Admin sidebar sirf admin layout mein show hoga
  const isAdmin = variant === "admin";

  if (!isAdmin) {
    return null;
  }

  const items = [
    {
      label: "Dashboard",
      to: "/admin/dashboard",
      icon: FaTachometerAlt,
    },
    {
      label: "Students",
      to: "/admin/students",
      icon: FaUserGraduate,
    },
    {
      label: "Teachers",
      to: "/admin/teachers",
      icon: FaChalkboardTeacher,
    },
    {
      label: "Courses",
      to: "/admin/courses",
      icon: FaBook,
    },
    {
      label: "Departments",
      to: "/admin/departments",
      icon: FaBuilding,
    },
    {
      label: "Fees",
      to: "/admin/fees",
      icon: FaMoneyBillWave,
    },
    {
      label: "Attendance",
      to: "/admin/attendance",
      icon: FaClipboardCheck,
    },
    {
      label: "Exams",
      to: "/admin/exams",
      icon: FaGraduationCap,
    },
    {
      label: "Notices",
      to: "/admin/notices",
      icon: FaBullhorn,
    },
    {
      label: "Events",
      to: "/admin/events",
      icon: FaCalendarAlt,
    },
    {
      label: "Reports",
      to: "/admin/reports",
      icon: FaFileAlt,
    },
    {
      label: "Settings",
      to: "/admin/settings",
      icon: FaCog,
    },
  ];

  return (
    <aside
      className={`admin-sidebar ${
        isOpen ? "is-open" : ""
      }`}
    >
      {/* Mobile Sidebar Header */}
      <div className="admin-sidebar__mobile-header">
        <div className="admin-sidebar__mobile-title">
          <span className="admin-sidebar__brand-mark">
            C
          </span>

          <div className="admin-sidebar__brand-text">
            <strong>College</strong>
            <small>Management System</small>
          </div>
        </div>

        <button
          type="button"
          className="admin-sidebar__close"
          onClick={onClose}
          aria-label="Close navigation"
        >
          <FaTimes />
        </button>
      </div>

      {/* Admin Profile */}
      <div className="admin-sidebar__profile">
        <FaUserCircle className="admin-sidebar__profile-icon" />

        <div>
          <strong>Administrator</strong>
          <small>Admin Panel</small>
        </div>
      </div>

      {/* Admin Navigation */}
      <nav
        className="admin-sidebar__nav"
        aria-label="Admin navigation"
      >
        {items.map(
          ({ label, to, icon: Icon }) => (
            <NavLink
              key={label}
              to={to}
              onClick={onClose}
              className={({ isActive }) =>
                `admin-sidebar__link ${
                  isActive ? "is-active" : ""
                }`
              }
            >
              <Icon />
              <span>{label}</span>
            </NavLink>
          )
        )}
      </nav>
    </aside>
  );
}

export default Sidebar;