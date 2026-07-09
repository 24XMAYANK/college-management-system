import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUserGraduate,
  FaChalkboardTeacher,
  FaBook,
  FaClipboardCheck,
  FaChartBar,
  FaUserCircle,
} from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

function Sidebar() {
  const { user } = useAuth();

  const linkClass = ({ isActive }) =>
    `nav-link text-white mb-2 rounded ${
      isActive ? "bg-primary" : ""
    }`;

  return (
    <div
      className="bg-dark text-white p-3"
      style={{
        width: "250px",
        minHeight: "100vh",
      }}
    >
      <h4 className="text-center mb-4">
        CMS Panel
      </h4>

      {/* ================= ADMIN ================= */}

      {user?.role === "admin" && (
        <>

          <NavLink
            to="/admin/dashboard"
            className={linkClass}
          >
            <FaTachometerAlt className="me-2" />
            Dashboard
          </NavLink>

          <NavLink
            to="/admin/students"
            className={linkClass}
          >
            <FaUserGraduate className="me-2" />
            Students
          </NavLink>

          <NavLink
            to="/admin/teachers"
            className={linkClass}
          >
            <FaChalkboardTeacher className="me-2" />
            Teachers
          </NavLink>

          <NavLink
            to="/admin/courses"
            className={linkClass}
          >
            <FaBook className="me-2" />
            Courses
          </NavLink>

          <NavLink
            to="/profile"
            className={linkClass}
          >
            <FaUserCircle className="me-2" />
            Profile
          </NavLink>

        </>
      )}

      {/* ================= TEACHER ================= */}

      {user?.role === "teacher" && (
        <>

          <NavLink
            to="/teacher/dashboard"
            className={linkClass}
          >
            <FaTachometerAlt className="me-2" />
            Dashboard
          </NavLink>

          <NavLink
            to="/teacher/students"
            className={linkClass}
          >
            <FaUserGraduate className="me-2" />
            Students
          </NavLink>

          <NavLink
            to="/teacher/attendance"
            className={linkClass}
          >
            <FaClipboardCheck className="me-2" />
            Attendance
          </NavLink>

          <NavLink
            to="/teacher/marks"
            className={linkClass}
          >
            <FaChartBar className="me-2" />
            Marks
          </NavLink>

          <NavLink
            to="/teacher/profile"
            className={linkClass}
          >
            <FaUserCircle className="me-2" />
            Profile
          </NavLink>

        </>
      )}

      {/* ================= STUDENT ================= */}

      {user?.role === "student" && (
        <>

          <NavLink
            to="/student/dashboard"
            className={linkClass}
          >
            <FaTachometerAlt className="me-2" />
            Dashboard
          </NavLink>

          <NavLink
            to="/student/courses"
            className={linkClass}
          >
            <FaBook className="me-2" />
            Courses
          </NavLink>

          <NavLink
            to="/student/attendance"
            className={linkClass}
          >
            <FaClipboardCheck className="me-2" />
            Attendance
          </NavLink>

          <NavLink
            to="/student/marks"
            className={linkClass}
          >
            <FaChartBar className="me-2" />
            Marks
          </NavLink>

          <NavLink
            to="/student/profile"
            className={linkClass}
          >
            <FaUserCircle className="me-2" />
            Profile
          </NavLink>

        </>
      )}
    </div>
  );
}

export default Sidebar;