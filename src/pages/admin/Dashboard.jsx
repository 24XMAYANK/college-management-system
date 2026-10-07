import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import Layout from "../../components/Layout";
import API from "../../services/api";

import {
  FaUserGraduate,
  FaChalkboardTeacher,
  FaBook,
  FaClipboardCheck,
  FaChartBar,
  FaCalendarAlt,
  FaArrowRight,
  FaCheckCircle,
  FaGraduationCap,
  FaUsers,
} from "react-icons/fa";

import "../../styles/dashboard.css";

function StatCard({ icon: Icon, title, value, subtitle, tone }) {
  return (
    <div className={`admin-stat-card admin-stat-card--${tone}`}>
      <div className="admin-stat-icon">
        <Icon />
      </div>

      <div className="admin-stat-content">
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
  const [apiError, setApiError] = useState("");

  useEffect(() => {
    let mounted = true;

    const loadDashboardData = async () => {
      setLoading(true);
      setApiError("");

      const endpoints = [
        {
          name: "students",
          request: API.get("/students"),
          setter: setStudents,
        },
        {
          name: "teachers",
          request: API.get("/teachers"),
          setter: setTeachers,
        },
        {
          name: "courses",
          request: API.get("/courses"),
          setter: setCourses,
        },
        {
          name: "attendance",
          request: API.get("/attendance"),
          setter: setAttendance,
        },
        {
          name: "marks",
          request: API.get("/marks"),
          setter: setMarks,
        },
        {
          name: "exams",
          request: API.get("/exams"),
          setter: setExams,
        },
        {
          name: "notices",
          request: API.get("/notices"),
          setter: setNotices,
        },
        {
          name: "events",
          request: API.get("/events"),
          setter: setEvents,
        },
      ];

      const results = await Promise.allSettled(
        endpoints.map((item) => item.request)
      );

      if (!mounted) return;

      const failed = [];

      results.forEach((result, index) => {
        const endpoint = endpoints[index];

        if (result.status === "fulfilled") {
          const data = result.value?.data;

          endpoint.setter(
            Array.isArray(data) ? data : []
          );

          console.log(
            `[Dashboard] /${endpoint.name}:`,
            Array.isArray(data) ? data.length : 0
          );
        } else {
          endpoint.setter([]);
          failed.push(endpoint.name);

          console.error(
            `[Dashboard] /${endpoint.name} failed:`,
            result.reason
          );
        }
      });

      if (failed.length) {
        setApiError(
          `Unable to load: ${failed.join(", ")}`
        );
      }

      setLoading(false);
    };

    loadDashboardData();

    return () => {
      mounted = false;
    };
  }, []);

  const presentCount = useMemo(() => {
    return attendance.filter(
      (item) =>
        String(item.status || "").toLowerCase() === "present"
    ).length;
  }, [attendance]);

  const absentCount = useMemo(() => {
    return attendance.filter(
      (item) =>
        String(item.status || "").toLowerCase() === "absent"
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

    let obtained = 0;
    let total = 0;

    marks.forEach((item) => {
      obtained += Number(item.marks || 0);
      total += Number(item.total || 100);
    });

    if (!total) return 0;

    return Math.round((obtained / total) * 100);
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
      .slice(0, 4);
  }, [exams]);

  const recentNotices = useMemo(() => {
    return [...notices]
      .sort(
        (a, b) =>
          new Date(b.date || "1900-01-01") -
          new Date(a.date || "1900-01-01")
      )
      .slice(0, 4);
  }, [notices]);

  const upcomingEvents = useMemo(() => {
    return [...events]
      .sort(
        (a, b) =>
          new Date(a.date || "9999-12-31") -
          new Date(b.date || "9999-12-31")
      )
      .slice(0, 4);
  }, [events]);

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <Layout variant="admin">
      <div className="admin-dashboard">

        {/* ================================
            WELCOME
        ================================= */}

        <section className="admin-welcome">
          <div>
            <span className="admin-eyebrow">
              ADMINISTRATION
            </span>

            <h1>Welcome back, Administrator</h1>

            <p>
              Manage students, teachers, courses and
              academic activities from one place.
            </p>
          </div>

          <div className="admin-date">
            <FaCalendarAlt />
            <span>{today}</span>
          </div>
        </section>

        {/* ================================
            API WARNING
        ================================= */}

        {apiError && (
          <div
            style={{
              marginBottom: "18px",
              padding: "12px 16px",
              borderRadius: "10px",
              background: "#fff4f4",
              border: "1px solid #f0caca",
              color: "#b64040",
              fontSize: "13px",
            }}
          >
            {apiError}
          </div>
        )}

        {/* ================================
            STATS
        ================================= */}

        <section className="admin-stats-grid">

          <StatCard
            icon={FaUserGraduate}
            title="Total Students"
            value={loading ? "..." : students.length}
            subtitle="Registered students"
            tone="blue"
          />

          <StatCard
            icon={FaChalkboardTeacher}
            title="Total Teachers"
            value={loading ? "..." : teachers.length}
            subtitle="Teaching faculty"
            tone="purple"
          />

          <StatCard
            icon={FaBook}
            title="Total Courses"
            value={loading ? "..." : courses.length}
            subtitle="Available courses"
            tone="orange"
          />

          <StatCard
            icon={FaClipboardCheck}
            title="Attendance"
            value={
              loading
                ? "..."
                : `${attendancePercentage}%`
            }
            subtitle={`${presentCount} present records`}
            tone="green"
          />

        </section>

        {/* ================================
            QUICK ACTIONS
        ================================= */}

        <section className="admin-quick-grid">

          <Link
            to="/admin/students"
            className="admin-action-card"
          >
            <span className="admin-action-icon blue">
              <FaUserGraduate />
            </span>

            <div>
              <strong>Students</strong>
              <small>Manage student records</small>
            </div>

            <FaArrowRight />
          </Link>

          <Link
            to="/admin/teachers"
            className="admin-action-card"
          >
            <span className="admin-action-icon purple">
              <FaChalkboardTeacher />
            </span>

            <div>
              <strong>Teachers</strong>
              <small>Manage faculty records</small>
            </div>

            <FaArrowRight />
          </Link>

          <Link
            to="/admin/courses"
            className="admin-action-card"
          >
            <span className="admin-action-icon orange">
              <FaBook />
            </span>

            <div>
              <strong>Courses</strong>
              <small>Manage academic courses</small>
            </div>

            <FaArrowRight />
          </Link>

          <Link
            to="/admin/attendance"
            className="admin-action-card"
          >
            <span className="admin-action-icon green">
              <FaClipboardCheck />
            </span>

            <div>
              <strong>Attendance</strong>
              <small>View attendance records</small>
            </div>

            <FaArrowRight />
          </Link>

        </section>

        {/* ================================
            MAIN GRID
        ================================= */}

        <section className="admin-overview-grid">

          <div className="admin-main-column">

            {/* ============================
                ACADEMIC SUMMARY
            ============================= */}

            <section className="admin-panel">

              <div className="admin-panel-header">
                <div>
                  <span className="admin-section-label">
                    COLLEGE OVERVIEW
                  </span>

                  <h2>Academic Summary</h2>
                </div>

                <FaChartBar className="admin-header-icon" />
              </div>

              <div className="admin-summary-grid">

                <div className="admin-summary-card">
                  <div className="admin-summary-icon blue">
                    <FaUsers />
                  </div>

                  <div>
                    <span>Students</span>
                    <strong>
                      {loading ? "..." : students.length}
                    </strong>
                  </div>
                </div>

                <div className="admin-summary-card">
                  <div className="admin-summary-icon purple">
                    <FaChalkboardTeacher />
                  </div>

                  <div>
                    <span>Teachers</span>
                    <strong>
                      {loading ? "..." : teachers.length}
                    </strong>
                  </div>
                </div>

                <div className="admin-summary-card">
                  <div className="admin-summary-icon orange">
                    <FaBook />
                  </div>

                  <div>
                    <span>Courses</span>
                    <strong>
                      {loading ? "..." : courses.length}
                    </strong>
                  </div>
                </div>

                <div className="admin-summary-card">
                  <div className="admin-summary-icon green">
                    <FaGraduationCap />
                  </div>

                  <div>
                    <span>Average Marks</span>
                    <strong>
                      {loading
                        ? "..."
                        : `${averageMarks}%`}
                    </strong>
                  </div>
                </div>

              </div>
            </section>

            {/* ============================
                COURSES
            ============================= */}

            <section className="admin-panel">

              <div className="admin-panel-header">

                <div>
                  <span className="admin-section-label">
                    ACADEMICS
                  </span>

                  <h2>Available Courses</h2>
                </div>

                <Link
                  to="/admin/courses"
                  className="admin-view-all"
                >
                  View All
                  <FaArrowRight />
                </Link>

              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(auto-fit, minmax(180px, 1fr))",
                  gap: "12px",
                  padding: "18px",
                }}
              >

                {courses.map((course) => (
                  <div
                    key={course.id}
                    style={{
                      padding: "18px",
                      borderRadius: "14px",
                      background: "#faf9f6",
                      border: "1px solid #eeeae2",
                    }}
                  >
                    <div
                      style={{
                        width: "38px",
                        height: "38px",
                        borderRadius: "10px",
                        display: "grid",
                        placeItems: "center",
                        background: "#fff1e8",
                        color: "#d98b55",
                        marginBottom: "10px",
                      }}
                    >
                      <FaBook />
                    </div>

                    <strong
                      style={{
                        display: "block",
                        fontSize: "14px",
                        color: "#303646",
                      }}
                    >
                      {course.name || "Course"}
                    </strong>

                    <span
                      style={{
                        display: "block",
                        marginTop: "5px",
                        fontSize: "11px",
                        color: "#9296a0",
                      }}
                    >
                      {course.duration || "3 Years"}
                    </span>

                    <span
                      style={{
                        display: "block",
                        marginTop: "5px",
                        fontSize: "11px",
                        color: "#6d7280",
                      }}
                    >
                      Fees: ₹
                      {Number(
                        course.fees || 0
                      ).toLocaleString("en-IN")}
                    </span>
                  </div>
                ))}

                {!loading && !courses.length && (
                  <div className="admin-empty">
                    No courses found.
                  </div>
                )}

              </div>
            </section>

            {/* ============================
                RECENT STUDENTS
            ============================= */}

            <section className="admin-panel">

              <div className="admin-panel-header">

                <div>
                  <span className="admin-section-label">
                    STUDENT MANAGEMENT
                  </span>

                  <h2>Recent Students</h2>
                </div>

                <Link
                  to="/admin/students"
                  className="admin-view-all"
                >
                  View All
                  <FaArrowRight />
                </Link>

              </div>

              <div className="admin-table-wrapper">

                <table className="admin-table">

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

                    {recentStudents.map((student) => (
                      <tr key={student.id}>

                        <td>
                          <span className="admin-id">
                            ST
                            {String(student.id).padStart(
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
                          {student.course || "—"}
                        </td>

                        <td>
                          {student.year || "—"}
                        </td>

                        <td>
                          <span className="admin-status">
                            <FaCheckCircle />
                            Active
                          </span>
                        </td>

                      </tr>
                    ))}

                    {!loading &&
                      !recentStudents.length && (
                        <tr>
                          <td
                            colSpan="6"
                            className="admin-empty"
                          >
                            No students found.
                          </td>
                        </tr>
                      )}

                  </tbody>
                </table>

              </div>
            </section>

            {/* ============================
                ATTENDANCE
            ============================= */}

            <section className="admin-panel">

              <div className="admin-panel-header">

                <div>
                  <span className="admin-section-label">
                    ATTENDANCE
                  </span>

                  <h2>Attendance Overview</h2>
                </div>

                <FaClipboardCheck className="admin-header-icon" />

              </div>

              <div className="admin-attendance-overview">

                <div className="admin-attendance-circle">

                  <div>
                    <strong>
                      {loading
                        ? "..."
                        : `${attendancePercentage}%`}
                    </strong>

                    <span>Attendance</span>
                  </div>

                </div>

                <div className="admin-attendance-details">

                  <div className="admin-overview-row">
                    <span>
                      <i className="admin-dot green" />
                      Present Records
                    </span>

                    <strong>
                      {presentCount}
                    </strong>
                  </div>

                  <div className="admin-overview-row">
                    <span>
                      <i className="admin-dot red" />
                      Absent Records
                    </span>

                    <strong>
                      {absentCount}
                    </strong>
                  </div>

                  <div className="admin-overview-row">
                    <span>
                      <i className="admin-dot blue" />
                      Total Records
                    </span>

                    <strong>
                      {attendance.length}
                    </strong>
                  </div>

                </div>
              </div>

            </section>

            {/* ============================
                MARKS
            ============================= */}

            <section className="admin-panel">

              <div className="admin-panel-header">

                <div>
                  <span className="admin-section-label">
                    ACADEMIC PERFORMANCE
                  </span>

                  <h2>Marks Overview</h2>
                </div>

                <FaGraduationCap className="admin-header-icon" />

              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(3, minmax(0, 1fr))",
                  gap: "12px",
                  padding: "18px",
                }}
              >

                <div
                  style={{
                    padding: "18px",
                    borderRadius: "14px",
                    background: "#faf9f6",
                  }}
                >
                  <span
                    style={{
                      display: "block",
                      fontSize: "11px",
                      color: "#9296a0",
                    }}
                  >
                    Total Mark Records
                  </span>

                  <strong
                    style={{
                      display: "block",
                      marginTop: "6px",
                      fontSize: "24px",
                    }}
                  >
                    {marks.length}
                  </strong>
                </div>

                <div
                  style={{
                    padding: "18px",
                    borderRadius: "14px",
                    background: "#faf9f6",
                  }}
                >
                  <span
                    style={{
                      display: "block",
                      fontSize: "11px",
                      color: "#9296a0",
                    }}
                  >
                    Average Marks
                  </span>

                  <strong
                    style={{
                      display: "block",
                      marginTop: "6px",
                      fontSize: "24px",
                    }}
                  >
                    {averageMarks}%
                  </strong>
                </div>

                <div
                  style={{
                    padding: "18px",
                    borderRadius: "14px",
                    background: "#faf9f6",
                  }}
                >
                  <span
                    style={{
                      display: "block",
                      fontSize: "11px",
                      color: "#9296a0",
                    }}
                  >
                    Maximum Marks
                  </span>

                  <strong
                    style={{
                      display: "block",
                      marginTop: "6px",
                      fontSize: "24px",
                    }}
                  >
                    100
                  </strong>
                </div>

              </div>

              <div className="admin-table-wrapper">

                <table className="admin-table">

                  <thead>
                    <tr>
                      <th>Student ID</th>
                      <th>Subject</th>
                      <th>Exam</th>
                      <th>Marks</th>
                      <th>Percentage</th>
                    </tr>
                  </thead>

                  <tbody>

                    {marks.slice(0, 6).map((mark) => {

                      const percentage =
                        Number(mark.total || 100)
                          ? Math.round(
                              (Number(mark.marks || 0) /
                                Number(
                                  mark.total || 100
                                )) *
                                100
                            )
                          : 0;

                      return (
                        <tr key={mark.id}>

                          <td>
                            ST
                            {String(
                              mark.studentId
                            ).padStart(3, "0")}
                          </td>

                          <td>
                            <strong>
                              {mark.subject}
                            </strong>
                          </td>

                          <td>
                            {mark.exam || "Exam"}
                          </td>

                          <td>
                            {mark.marks}/
                            {mark.total || 100}
                          </td>

                          <td>
                            {percentage}%
                          </td>

                        </tr>
                      );
                    })}

                    {!loading && !marks.length && (
                      <tr>
                        <td
                          colSpan="5"
                          className="admin-empty"
                        >
                          No marks found.
                        </td>
                      </tr>
                    )}

                  </tbody>

                </table>

              </div>

            </section>

          </div>

          {/* ================================
              RIGHT SIDE
          ================================= */}

          <div className="admin-side-column">

            {/* EXAMS */}

            <section className="admin-panel">

              <div className="admin-panel-header">

                <div>
                  <span className="admin-section-label">
                    ACADEMIC CALENDAR
                  </span>

                  <h2>Upcoming Exams</h2>
                </div>

                <FaGraduationCap className="admin-header-icon" />

              </div>

              <div className="admin-list">

                {upcomingExams.map((exam) => (
                  <div
                    className="admin-list-item"
                    key={exam.id}
                  >

                    <div className="admin-list-icon purple">
                      <FaGraduationCap />
                    </div>

                    <div>
                      <strong>
                        {exam.name}
                      </strong>

                      <span>
                        {exam.course ||
                          "All Courses"}
                      </span>

                      <small>
                        {exam.date ||
                          "Date not available"}
                      </small>
                    </div>

                  </div>
                ))}

                {!loading &&
                  !upcomingExams.length && (
                    <div className="admin-empty">
                      No upcoming exams.
                    </div>
                  )}

              </div>

              <Link
                to="/admin/exams"
                className="admin-full-action"
              >
                View All Exams
                <FaArrowRight />
              </Link>

            </section>

            {/* NOTICES */}

            <section className="admin-panel">

              <div className="admin-panel-header">

                <div>
                  <span className="admin-section-label">
                    COMMUNICATION
                  </span>

                  <h2>Latest Notices</h2>
                </div>

              </div>

              <div className="admin-list">

                {recentNotices.map((notice) => (
                  <div
                    className="admin-list-item"
                    key={notice.id}
                  >

                    <div className="admin-list-icon orange">
                      <FaBook />
                    </div>

                    <div>
                      <strong>
                        {notice.title}
                      </strong>

                      <span>
                        {notice.message}
                      </span>

                      <small>
                        {notice.date}
                      </small>
                    </div>

                  </div>
                ))}

                {!loading &&
                  !recentNotices.length && (
                    <div className="admin-empty">
                      No notices found.
                    </div>
                  )}

              </div>

              <Link
                to="/admin/notices"
                className="admin-full-action"
              >
                View All Notices
                <FaArrowRight />
              </Link>

            </section>

            {/* EVENTS */}

            <section className="admin-panel">

              <div className="admin-panel-header">

                <div>
                  <span className="admin-section-label">
                    EVENTS
                  </span>

                  <h2>Upcoming Events</h2>
                </div>

                <FaCalendarAlt className="admin-header-icon" />

              </div>

              <div className="admin-list">

                {upcomingEvents.map((event) => (
                  <div
                    className="admin-list-item"
                    key={event.id}
                  >

                    <div className="admin-list-icon blue">
                      <FaCalendarAlt />
                    </div>

                    <div>
                      <strong>
                        {event.name}
                      </strong>

                      <span>
                        {event.location ||
                          "College"}
                      </span>

                      <small>
                        {event.date}
                      </small>
                    </div>

                  </div>
                ))}

                {!loading &&
                  !upcomingEvents.length && (
                    <div className="admin-empty">
                      No events found.
                    </div>
                  )}

              </div>

              <Link
                to="/admin/events"
                className="admin-full-action"
              >
                View All Events
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