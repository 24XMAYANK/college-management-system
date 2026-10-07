import {
  useEffect,
  useMemo,
  useState,
} from "react";

import { Link } from "react-router-dom";

import Layout from "../../components/Layout";
import API from "../../services/api";

import { useAuth } from "../../context/AuthContext";

import {
  FaBook,
  FaClipboardCheck,
  FaChartBar,
  FaCalendarAlt,
  FaArrowRight,
  FaCheckCircle,
  FaClock,
  FaGraduationCap,
  FaUserCircle,
  FaBell,
} from "react-icons/fa";

import "../../styles/student-dashboard.css";

function StatCard({
  icon: Icon,
  title,
  value,
  subtitle,
  tone,
}) {
  return (
    <div
      className={`student-stat-card student-stat-card--${tone}`}
    >
      <div className="student-stat-icon">
        <Icon />
      </div>

      <div className="student-stat-content">
        <span>{title}</span>
        <strong>{value}</strong>
        <small>{subtitle}</small>
      </div>
    </div>
  );
}

function Dashboard() {
  const { user } = useAuth();

  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);
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
          courseResponse,
          studentResponse,
          attendanceResponse,
          marksResponse,
          examResponse,
          noticeResponse,
          eventResponse,
        ] = await Promise.all([
          API.get("/courses"),
          API.get("/students"),
          API.get("/attendance"),
          API.get("/marks"),
          API.get("/exams"),
          API.get("/notices"),
          API.get("/events"),
        ]);

        if (!mounted) return;

        setCourses(
          Array.isArray(courseResponse.data)
            ? courseResponse.data
            : []
        );

        setStudents(
          Array.isArray(studentResponse.data)
            ? studentResponse.data
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
          Array.isArray(examResponse.data)
            ? examResponse.data
            : []
        );

        setNotices(
          Array.isArray(noticeResponse.data)
            ? noticeResponse.data
            : []
        );

        setEvents(
          Array.isArray(eventResponse.data)
            ? eventResponse.data
            : []
        );
      } catch (error) {
        console.error(
          "Student dashboard API error:",
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

  const currentStudent = useMemo(() => {
    if (!students.length) return null;

    const studentId =
      user?.studentId || user?.id;

    return students.find(
      (student) =>
        String(student.id) ===
        String(studentId)
    );
  }, [students, user]);

  const myAttendance = useMemo(() => {
    if (!currentStudent) return [];

    return attendance.filter(
      (item) =>
        String(item.studentId) ===
        String(currentStudent.id)
    );
  }, [attendance, currentStudent]);

  const myMarks = useMemo(() => {
    if (!currentStudent) return [];

    return marks.filter(
      (item) =>
        String(item.studentId) ===
        String(currentStudent.id)
    );
  }, [marks, currentStudent]);

  const myCourses = useMemo(() => {
    if (!currentStudent) return [];

    return courses.filter(
      (course) =>
        course.name?.toLowerCase() ===
        currentStudent.course?.toLowerCase()
    );
  }, [courses, currentStudent]);

  const myAttendancePercentage = useMemo(() => {
    if (!myAttendance.length) return 0;

    const present = myAttendance.filter(
      (item) =>
        item.status?.toLowerCase() ===
        "present"
    ).length;

    return Math.round(
      (present / myAttendance.length) * 100
    );
  }, [myAttendance]);

  const myMarksPercentage = useMemo(() => {
    if (!myMarks.length) return 0;

    const obtained = myMarks.reduce(
      (sum, item) =>
        sum + Number(item.marks || 0),
      0
    );

    const total = myMarks.reduce(
      (sum, item) =>
        sum + Number(item.total || 100),
      0
    );

    if (!total) return 0;

    return Math.round(
      (obtained / total) * 100
    );
  }, [myMarks]);

  const upcomingExams = useMemo(() => {
    if (!currentStudent) return [];

    return [...exams]
      .filter(
        (exam) =>
          exam.course ===
            currentStudent.course ||
          exam.course === "All Courses"
      )
      .sort(
        (a, b) =>
          new Date(a.date || "9999-12-31") -
          new Date(b.date || "9999-12-31")
      )
      .slice(0, 4);
  }, [exams, currentStudent]);

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

  const studentName =
    currentStudent?.name ||
    user?.name ||
    "Student";

  return (
    <Layout variant="student">
      <div className="student-dashboard">
        <section className="student-welcome">
          <div>
            <span className="student-eyebrow">
              STUDENT PORTAL
            </span>

            <h1>
              Welcome back, {studentName}
              <span className="student-wave">
                {" "}
                👋
              </span>
            </h1>

            <p>
              Keep track of your course,
              attendance, marks and academic
              activities.
            </p>
          </div>

          <div className="student-date">
            <FaCalendarAlt />
            <span>{today}</span>
          </div>
        </section>

        <section className="student-stats-grid">
          <StatCard
            icon={FaBook}
            title="My Course"
            value={
              loading
                ? "—"
                : currentStudent?.course ||
                  "—"
            }
            subtitle={
              currentStudent?.year
                ? `${currentStudent.year} year`
                : "Academic course"
            }
            tone="blue"
          />

          <StatCard
            icon={FaClipboardCheck}
            title="Attendance"
            value={
              loading
                ? "—"
                : `${myAttendancePercentage}%`
            }
            subtitle={`${myAttendance.length} attendance records`}
            tone="green"
          />

          <StatCard
            icon={FaChartBar}
            title="Overall Marks"
            value={
              loading
                ? "—"
                : `${myMarksPercentage}%`
            }
            subtitle={`${myMarks.length} subjects`}
            tone="purple"
          />

          <StatCard
            icon={FaGraduationCap}
            title="Academic Status"
            value="Active"
            subtitle="Student account"
            tone="orange"
          />
        </section>

        <section className="student-panel student-quick-panel">
          <div className="student-panel-header">
            <div>
              <span className="student-section-label">
                QUICK ACCESS
              </span>

              <h2>My Academic Links</h2>
            </div>
          </div>

          <div className="student-quick-grid">
            <Link
              to="/student/courses"
              className="student-action-card"
            >
              <span className="student-action-icon blue">
                <FaBook />
              </span>

              <div>
                <strong>My Courses</strong>
                <small>
                  View enrolled course
                </small>
              </div>

              <FaArrowRight />
            </Link>

            <Link
              to="/student/attendance"
              className="student-action-card"
            >
              <span className="student-action-icon green">
                <FaClipboardCheck />
              </span>

              <div>
                <strong>Attendance</strong>
                <small>
                  Check your attendance
                </small>
              </div>

              <FaArrowRight />
            </Link>

            <Link
              to="/student/marks"
              className="student-action-card"
            >
              <span className="student-action-icon purple">
                <FaChartBar />
              </span>

              <div>
                <strong>My Marks</strong>
                <small>
                  Check academic performance
                </small>
              </div>

              <FaArrowRight />
            </Link>

            <Link
              to="/student/profile"
              className="student-action-card"
            >
              <span className="student-action-icon orange">
                <FaUserCircle />
              </span>

              <div>
                <strong>My Profile</strong>
                <small>
                  View profile information
                </small>
              </div>

              <FaArrowRight />
            </Link>
          </div>
        </section>

        <section className="student-main-grid">
          <div className="student-main-column">
            <section className="student-panel">
              <div className="student-panel-header">
                <div>
                  <span className="student-section-label">
                    ACADEMICS
                  </span>

                  <h2>My Course</h2>
                </div>

                <Link
                  to="/student/courses"
                  className="student-view-all"
                >
                  View All
                  <FaArrowRight />
                </Link>
              </div>

              <div className="student-course-list">
                {myCourses.map((course) => (
                  <div
                    className="student-course-item"
                    key={course.id}
                  >
                    <div className="student-course-icon">
                      <FaBook />
                    </div>

                    <div className="student-course-info">
                      <strong>
                        {course.name}
                      </strong>

                      <span>
                        Duration:{" "}
                        {course.duration ||
                          "3 Years"}
                      </span>

                      <span>
                        Fees: ₹
                        {Number(
                          course.fees || 0
                        ).toLocaleString(
                          "en-IN"
                        )}
                      </span>
                    </div>

                    <div className="student-course-status">
                      <FaCheckCircle />
                      Active
                    </div>
                  </div>
                ))}

                {!myCourses.length && (
                  <div className="student-empty">
                    No enrolled course found.
                  </div>
                )}
              </div>
            </section>

            <section className="student-panel">
              <div className="student-panel-header">
                <div>
                  <span className="student-section-label">
                    PERFORMANCE
                  </span>

                  <h2>Academic Overview</h2>
                </div>

                <FaChartBar className="student-header-icon" />
              </div>

              <div className="student-performance">
                <div className="student-performance-circle">
                  <div>
                    <strong>
                      {myMarksPercentage}%
                    </strong>

                    <span>Marks</span>
                  </div>
                </div>

                <div className="student-performance-details">
                  <div className="student-performance-row">
                    <span>
                      <i className="student-dot blue" />
                      Overall Marks
                    </span>

                    <strong>
                      {myMarksPercentage}%
                    </strong>
                  </div>

                  <div className="student-performance-row">
                    <span>
                      <i className="student-dot green" />
                      Attendance
                    </span>

                    <strong>
                      {myAttendancePercentage}%
                    </strong>
                  </div>

                  <div className="student-performance-row">
                    <span>
                      <i className="student-dot purple" />
                      Subjects
                    </span>

                    <strong>
                      {myMarks.length}
                    </strong>
                  </div>

                  <small>
                    Your academic performance is
                    calculated from the current
                    college records.
                  </small>
                </div>
              </div>
            </section>

            <section className="student-panel">
              <div className="student-panel-header">
                <div>
                  <span className="student-section-label">
                    EXAMINATION
                  </span>

                  <h2>Upcoming Exams</h2>
                </div>

                <FaGraduationCap className="student-header-icon" />
              </div>

              <div className="student-upcoming-list">
                {upcomingExams.map((exam) => (
                  <div
                    className="student-upcoming-item"
                    key={exam.id}
                  >
                    <div className="student-upcoming-date">
                      <FaCalendarAlt />

                      <strong>
                        {exam.date}
                      </strong>
                    </div>

                    <div>
                      <strong>
                        {exam.name}
                      </strong>

                      <span>
                        {exam.type ||
                          "Examination"}
                        {" • "}
                        {exam.course}
                      </span>
                    </div>
                  </div>
                ))}

                {!upcomingExams.length && (
                  <div className="student-empty">
                    No upcoming exams.
                  </div>
                )}
              </div>
            </section>
          </div>

          <div className="student-side-column">
            <section className="student-panel">
              <div className="student-panel-header">
                <div>
                  <span className="student-section-label">
                    COLLEGE EVENTS
                  </span>

                  <h2>Upcoming Events</h2>
                </div>

                <FaCalendarAlt className="student-header-icon" />
              </div>

              <div className="student-upcoming-list">
                {upcomingEvents.map((event) => (
                  <div
                    className="student-upcoming-item"
                    key={event.id}
                  >
                    <div className="student-upcoming-date">
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
                  <div className="student-empty">
                    No upcoming events.
                  </div>
                )}
              </div>
            </section>

            <section className="student-panel">
              <div className="student-panel-header">
                <div>
                  <span className="student-section-label">
                    NOTIFICATIONS
                  </span>

                  <h2>Recent Notices</h2>
                </div>

                <FaBell className="student-header-icon" />
              </div>

              <div className="student-notice-list">
                {recentNotices.map((notice) => (
                  <div
                    className="student-notice"
                    key={notice.id}
                  >
                    <div className="student-notice-icon">
                      <FaBell />
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

                {!recentNotices.length && (
                  <div className="student-empty">
                    No notices available.
                  </div>
                )}
              </div>
            </section>

            <section className="student-profile-card">
              <div className="student-profile-avatar">
                <FaUserCircle />
              </div>

              <div>
                <span>
                  STUDENT ACCOUNT
                </span>

                <strong>
                  {studentName}
                </strong>

                <small>
                  {currentStudent
                    ? `${currentStudent.course} • ${currentStudent.year}`
                    : "Academic Portal"}
                </small>
              </div>

              <Link to="/student/profile">
                <FaArrowRight />
              </Link>
            </section>

            <section className="student-panel">
              <div className="student-panel-header">
                <div>
                  <span className="student-section-label">
                    ATTENDANCE
                  </span>

                  <h2>My Attendance</h2>
                </div>

                <FaClipboardCheck className="student-header-icon" />
              </div>

              <div className="student-performance">
                <div className="student-performance-circle">
                  <div>
                    <strong>
                      {myAttendancePercentage}%
                    </strong>

                    <span>Present</span>
                  </div>
                </div>

                <div className="student-performance-details">
                  <div className="student-performance-row">
                    <span>
                      <i className="student-dot green" />
                      Present
                    </span>

                    <strong>
                      {
                        myAttendance.filter(
                          (item) =>
                            item.status?.toLowerCase() ===
                            "present"
                        ).length
                      }
                    </strong>
                  </div>

                  <div className="student-performance-row">
                    <span>
                      <i className="student-dot blue" />
                      Total Classes
                    </span>

                    <strong>
                      {myAttendance.length}
                    </strong>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </section>
      </div>
    </Layout>
  );
}

export default Dashboard;