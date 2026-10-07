import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  FaBell,
  FaChevronDown,
  FaBars,
  FaUserCircle,
} from "react-icons/fa";

import { useAuth } from "../context/AuthContext";

function Navbar({
  variant = "default",
  onMenuClick,
}) {
  const {
    user,
    logout,
  } = useAuth();

  const navigate = useNavigate();

  const isAdmin =
    variant === "admin";

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (isAdmin) {
    return (
      <header className="admin-topbar">

        <div className="admin-topbar__left">

          <button
            type="button"
            className="admin-menu-button"
            onClick={onMenuClick}
            aria-label="Toggle navigation"
          >
            <FaBars />
          </button>

          <Link
            to="/admin/dashboard"
            className="admin-brand"
          >
            <span className="admin-brand__mark">
              C
            </span>

            <span>
              <strong>
                College
              </strong>

              <small>
                Management System
              </small>
            </span>
          </Link>

        </div>

        <div className="admin-topbar__actions">

          <button
            type="button"
            className="admin-icon-button"
            aria-label="Notifications"
          >
            <FaBell />

            <span className="admin-notification-dot" />
          </button>

          <div className="admin-profile-menu">

            <FaUserCircle
              className="admin-avatar"
            />

            <span className="admin-profile-copy">

              <strong>
                {user?.name || "Admin"}
              </strong>

              <small>
                Administrator
              </small>

            </span>

            <FaChevronDown
              className="admin-chevron"
            />

          </div>

          <button
            type="button"
            className="admin-logout"
            onClick={handleLogout}
          >
            Logout
          </button>

        </div>

      </header>
    );
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow">

      <div className="container-fluid">

        <Link
          className="navbar-brand fw-bold"
          to="/"
        >
          College Management System
        </Link>

        <div className="d-flex align-items-center">

          <span className="text-white me-3">

            <FaUserCircle className="me-2" />

            {user?.name || "Guest"}

            {user && (
              <span className="badge bg-primary ms-2">
                {user.role}
              </span>
            )}

          </span>

          {user && (
            <button
              className="btn btn-danger btn-sm"
              onClick={handleLogout}
            >
              Logout
            </button>
          )}

        </div>

      </div>

    </nav>
  );
}

export default Navbar;