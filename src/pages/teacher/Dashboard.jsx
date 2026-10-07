import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import Layout from "../../components/Layout";
import API from "../../services/api";

import {
  FaUserGraduate,
  FaClipboardCheck,
  FaChartBar,
  FaBook,
  FaCalendarAlt,
  FaArrowRight,
  FaCheckCircle,
  FaClock,
  FaUsers,
  FaPlus,
  FaBullhorn,
  FaGraduationCap,
  FaChalkboardTeacher,
} from "react-icons/fa";

import "../../styles/teacher-dashboard.css";

function StatCard({
  icon: Icon,
  title,
  value,
  subtitle,
  tone,
}) {
  return (
    <div
      className={`teacher-stat-card teacher-stat-card--${tone}`}
    >
      <div className="teacher-stat-icon">
        <Icon />
      </div>

      <div className="teacher-stat-content">
        <span>{title}</span>
        <strong>{value}</strong>
        <small>{subtitle}</small>
      </div>
    </div>
  );
}

function Dashboard() {
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [marks, setMarks] = useState([]);
  const [exams, setExams] = useState([]);
  const [notices, setNotices] = useState([]);
  const [events, setEvents] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const loadDashboardData = async () => {
      try {
        const [
          studentsResponse,
          teachersResponse,
          coursesResponse,
          attendanceResponse,
          marksResponse,
          examsResponse,
          noticesResponse,
          eventsResponse,
        ] = await Promise.all([
          API.get("/students"),
          API.get("/teachers"),
          API.get("/courses"),
          API.get("/attendance"),
          API.get("/marks"),
          API.get("/exams"),
          API.get("/notices"),
          API.get("/events"),
        ]);

        if (!mounted) return;

        setStudents(
          Array.isArray(studentsResponse.data)
            ? studentsResponse.data
            : []
        );

        setTeachers(
          Array.isArray(teachersResponse.data)
            ? teachersResponse.data
            : []
        );

        setCourses(
          Array.isArray(coursesResponse.data)
            ? coursesResponse.data
            : []
        );

        setAttendance(
          Array.isArray(attendanceResponse.data)
            ? attendanceResponse.data
            : []
        );

        setMarks(
          Array.isArray(marksResponse.data)
            ? marksResponse.data
            : []
        );

        setExams(
          Array.isArray(examsResponse.data)
            ? examsResponse.data
            : []
        );

        setNotices(
          Array.isArray(noticesResponse.data)
            ? noticesResponse.data
            : []
        );

        setEvents(
          Array.isArray(eventsResponse.data)
            ? eventsResponse.data
            : []
        );
      } catch (error) {
        console.error(
          "Teacher dashboard API error:",
          error
        );
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadDashboardData();

    return () => {
      mounted = false;
    };
  }, []);

  const presentCount = useMemo(() => {
    return attendance.filter(
      (item) =>
        item.status?.toLowerCase() === "present"
    ).length;
  }, [attendance]);

  const absentCount = useMemo(() => {
    return attendance.filter(
      (item) =>
        item.status?.toLowerCase() === "absent"
    ).length;
  }, [attendance]);

  const attendancePercentage = useMemo(() => {
    if (!attendance.length) return 0;

    return Math.round(
      (presentCount / attendance.length) * 100
    );
  }, [attendance, presentCount]);

  const averageMarks = useMemo(() => {
    if (!marks.length) return 0;

    const obtained = marks.reduce(
      (sum, item) =>
        sum + Number(item.marks || 0),
      0
    );

    const total = marks.reduce(
      (sum, item) =>
        sum + Number(item.total || 100),
      0
    );

    if (!total) return 0;

    return Math.round(
      (obtained / total) * 100
    );
  }, [marks]);

  const recentStudents = useMemo(() => {
    return students.slice(0, 5);
  }, [students]);

  const upcomingExams = useMemo(() => {
    return [...exams]
      .sort(
        (a, b) =>
          new Date(a.date || "9999-12-31") -
          new Date(b.date || "9999-12-31")
      )
      .slice(0, 3);
  }, [exams]);

  const recentNotices = useMemo(() => {
    return [...notices]
      .sort(
        (a, b) =>
          new Date(b.date || "1900-01-01") -
          new Date(a.date || "1900-01-01")
      )
      .slice(0, 3);
  }, [notices]);

  const upcomingEvents = useMemo(() => {
    return [...events]
      .sort(
        (a, b) =>
          new Date(a.date || "9999-12-31") -
          new Date(b.date || "9999-12-31")
      )
      .slice(0, 3);
  }, [events]);

  const today = new Date().toLocaleDateString(
    "en-IN",
    {
      weekday: "long",
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  );

  return (
    <Layout variant="teacher">
      <div className="teacher-dashboard">
        <section className="teacher-welcome">
          <div>
            <span className="teacher-eyebrow">
              TEACHER PORTAL
            </span>

            <h1>
              Welcome back, Teacher
              <span className="teacher-wave">
                {" "}
                👋
              </span>
            </h1>

            <p>
              Manage students, attendance, marks and
              academic activities from one place.
            </p>
          </div>

          <div className="teacher-date">
            <FaCalendarAlt />
            <span>{today}</span>
          </div>
        </section>

        <section className="teacher-stats-grid">
          <StatCard
            icon={FaUserGraduate}
            title="Total Students"
            value={loading ? "—" : students.length}
            subtitle="Students available"
            tone="blue"
          />

          <StatCard
            icon={FaBook}
            title="Available Courses"
            value={loading ? "—" : courses.length}
            subtitle="Academic courses"
            tone="purple"
          />

          <StatCard
            icon={FaClipboardCheck}
            title="Attendance"
            value={
              loading
                ? "—"
                : `${attendancePercentage}%`
            }
            subtitle={`${presentCount} present records`}
            tone="green"
          />

          <StatCard
            icon={FaChartBar}
            title="Average Marks"
            value={
              loading
                ? "—"
                : `${averageMarks}%`
            }
            subtitle={`${marks.length} mark records`}
            tone="orange"
          />
        </section>

        <section className="teacher-quick-grid">
          <Link
            to="/teacher/students"
            className="teacher-action-card"
          >
            <span className="teacher-action-icon blue">
              <FaUsers />
            </span>

            <div>
              <strong>View Students</strong>
              <small>
                Manage student records
              </small>
            </div>

            <FaArrowRight />
          </Link>

          <Link
            to="/teacher/attendance"
            className="teacher-action-card"
          >
            <span className="teacher-action-icon green">
              <FaClipboardCheck />
            </span>

            <div>
              <strong>Attendance</strong>
              <small>
                Manage attendance
              </small>
            </div>

            <FaArrowRight />
          </Link>

          <Link
            to="/teacher/marks"
            className="teacher-action-card"
          >
            <span className="teacher-action-icon purple">
              <FaChartBar />
            </span>

            <div>
              <strong>Manage Marks</strong>
              <small>
                View and update marks
              </small>
            </div>

            <FaArrowRight />
          </Link>

          <Link
            to="/teacher/profile"
            className="teacher-action-card"
          >
            <span className="teacher-action-icon orange">
              <FaPlus />
            </span>

            <div>
              <strong>My Profile</strong>
              <small>
                View profile details
              </small>
            </div>

            <FaArrowRight />
          </Link>
        </section>

        <section className="teacher-main-grid">
          <div className="teacher-main-column">
            <section className="teacher-panel">
              <div className="teacher-panel-header">
                <div>
                  <span className="teacher-section-label">
                    STUDENT MANAGEMENT
                  </span>

                  <h2>Student Overview</h2>
                </div>

                <FaUsers className="teacher-header-icon" />
              </div>

              <div className="teacher-overview-box">
                <div className="teacher-student-circle">
                  <div>
                    <strong>
                      {loading
                        ? "—"
                        : students.length}
                    </strong>

                    <span>Students</span>
                  </div>
                </div>

                <div className="teacher-overview-details">
                  <div className="teacher-overview-row">
                    <span>
                      <i className="teacher-dot blue" />
                      Total Students
                    </span>

                    <strong>
                      {students.length}
                    </strong>
                  </div>

                  <div className="teacher-overview-row">
                    <span>
                      <i className="teacher-dot green" />
                      Present Records
                    </span>

                    <strong>
                      {presentCount}
                    </strong>
                  </div>

                  <div className="teacher-overview-row">
                    <span>
                      <i className="teacher-dot red" />
                      Absent Records
                    </span>

                    <strong>
                      {absentCount}
                    </strong>
                  </div>

                  <small>
                    Overall attendance:
                    {" "}
                    {attendancePercentage}%
                  </small>
                </div>
              </div>
            </section>

            <section className="teacher-panel">
              <div className="teacher-panel-header">
                <div>
                  <span className="teacher-section-label">
                    STUDENTS
                  </span>

                  <h2>Recent Students</h2>
                </div>

                <Link
                  to="/teacher/students"
                  className="teacher-view-all"
                >
                  View All
                  <FaArrowRight />
                </Link>
              </div>

              <div className="teacher-table-wrapper">
                <table className="teacher-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Student</th>
                      <th>Email</th>
                      <th>Course</th>
                      <th>Year</th>
                      <th>Status</th>
                    </tr>
                  </thead>

                  <tbody>
                    {recentStudents.map(
                      (student) => (
                        <tr key={student.id}>
                          <td>
                            <span className="teacher-id">
                              ST
                              {String(
                                student.id
                              ).padStart(
                                3,
                                "0"
                              )}
                            </span>
                          </td>

                          <td>
                            <strong>
                              {student.name}
                            </strong>
                          </td>

                          <td>
                            {student.email}
                          </td>

                          <td>
                            {student.course ||
                              "—"}
                          </td>

                          <td>
                            {student.year ||
                              "—"}
                          </td>

                          <td>
                            <span className="teacher-status">
                              <FaCheckCircle />
                              Active
                            </span>
                          </td>
                        </tr>
                      )
                    )}

                    {!recentStudents.length && (
                      <tr>
                        <td
                          colSpan="6"
                          className="teacher-empty"
                        >
                          No students found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </section>

            <section className="teacher-panel">
              <div className="teacher-panel-header">
                <div>
                  <span className="teacher-section-label">
                    PERFORMANCE
                  </span>

                  <h2>Academic Performance</h2>
                </div>

                <FaChartBar className="teacher-header-icon" />
              </div>

              <div className="teacher-overview-box">
                <div className="teacher-student-circle">
                  <div>
                    <strong>
                      {averageMarks}%
                    </strong>

                    <span>Marks</span>
                  </div>
                </div>

                <div className="teacher-overview-details">
                  <div className="teacher-overview-row">
                    <span>
                      <i className="teacher-dot blue" />
                      Average Marks
                    </span>

                    <strong>
                      {averageMarks}%
                    </strong>
                  </div>

                  <div className="teacher-overview-row">
                    <span>
                      <i className="teacher-dot green" />
                      Attendance
                    </span>

                    <strong>
                      {attendancePercentage}%
                    </strong>
                  </div>

                  <div className="teacher-overview-row">
                    <span>
                      <i className="teacher-dot purple" />
                      Mark Records
                    </span>

                    <strong>
                      {marks.length}
                    </strong>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <div className="teacher-side-column">
            <section className="teacher-panel">
              <div className="teacher-panel-header">
                <div>
                  <span className="teacher-section-label">
                    ACADEMIC CALENDAR
                  </span>

                  <h2>Upcoming Exams</h2>
                </div>

                <FaGraduationCap className="teacher-header-icon" />
              </div>

              <div className="teacher-schedule">
                {upcomingExams.map((exam) => (
                  <div
                    className="teacher-schedule-item"
                    key={exam.id}
                  >
                    <div className="teacher-time">
                      <FaGraduationCap />

                      <strong>
                        {exam.date}
                      </strong>
                    </div>

                    <div>
                      <strong>
                        {exam.name}
                      </strong>

                      <span>
                        {exam.course ||
                          "All Courses"}
                      </span>
                    </div>
                  </div>
                ))}

                {!upcomingExams.length && (
                  <div className="teacher-empty">
                    No upcoming exams.
                  </div>
                )}
              </div>

              <Link
                to="/teacher/marks"
                className="teacher-full-action"
              >
                Go to Marks
                <FaArrowRight />
              </Link>
            </section>

            <section className="teacher-panel">
              <div className="teacher-panel-header">
                <div>
                  <span className="teacher-section-label">
                    NOTIFICATIONS
                  </span>

                  <h2>Recent Notices</h2>
                </div>

                <FaBullhorn className="teacher-header-icon" />
              </div>

              <div className="teacher-schedule">
                {recentNotices.map((notice) => (
                  <div
                    className="teacher-schedule-item"
                    key={notice.id}
                  >
                    <div className="teacher-time">
                      <FaBullhorn />

                      <strong>
                        {notice.date}
                      </strong>
                    </div>

                    <div>
                      <strong>
                        {notice.title}
                      </strong>

                      <span>
                        {notice.message}
                      </span>
                    </div>
                  </div>
                ))}

                {!recentNotices.length && (
                  <div className="teacher-empty">
                    No notices available.
                  </div>
                )}
              </div>
            </section>

            <section className="teacher-panel">
              <div className="teacher-panel-header">
                <div>
                  <span className="teacher-section-label">
                    COLLEGE EVENTS
                  </span>

                  <h2>Upcoming Events</h2>
                </div>

                <FaCalendarAlt className="teacher-header-icon" />
              </div>

              <div className="teacher-schedule">
                {upcomingEvents.map((event) => (
                  <div
                    className="teacher-schedule-item"
                    key={event.id}
                  >
                    <div className="teacher-time">
                      <FaCalendarAlt />

                      <strong>
                        {event.date}
                      </strong>
                    </div>

                    <div>
                      <strong>
                        {event.name}
                      </strong>

                      <span>
                        {event.location ||
                          "College"}
                      </span>
                    </div>
                  </div>
                ))}

                {!upcomingEvents.length && (
                  <div className="teacher-empty">
                    No upcoming events.
                  </div>
                )}
              </div>
            </section>

            <section className="teacher-panel">
              <div className="teacher-panel-header">
                <div>
                  <span className="teacher-section-label">
                    ACADEMICS
                  </span>

                  <h2>Course Overview</h2>
                </div>

                <FaBook className="teacher-header-icon" />
              </div>

              <div className="teacher-course-summary">
                <div className="teacher-course-number">
                  {courses.length}
                </div>

                <div>
                  <strong>
                    Available Courses
                  </strong>

                  <span>
                    Courses currently available
                    in the system.
                  </span>
                </div>
              </div>

              <Link
                to="/teacher/marks"
                className="teacher-full-action"
              >
                Go to Marks
                <FaArrowRight />
              </Link>
            </section>
          </div>
        </section>
      </div>
    </Layout>
  );
}

export default Dashboard;