import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

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