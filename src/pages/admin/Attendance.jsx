import { useEffect, useMemo, useState } from "react";
import {
  FaClipboardCheck,
  FaUserCheck,
  FaUserTimes,
  FaChartPie,
} from "react-icons/fa";

import Layout from "../../components/Layout";
import API from "../../services/api";
import "../../styles/admin-modules.css";

function Attendance() {
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadAttendance = async () => {
      try {
        setLoading(true);
        setError("");

        const [studentsRes, attendanceRes] = await Promise.all([
          API.get("/students"),
          API.get("/attendance"),
        ]);

        setStudents(
          Array.isArray(studentsRes.data)
            ? studentsRes.data
            : []
        );

        setAttendance(
          Array.isArray(attendanceRes.data)
            ? attendanceRes.data
            : []
        );
      } catch (err) {
        console.error("Admin attendance error:", err);

        setError(
          "Attendance data load nahi ho raha. Please JSON Server start karein."
        );
      } finally {
        setLoading(false);
      }
    };

    loadAttendance();
  }, []);

  const presentCount = useMemo(
    () =>
      attendance.filter(
        (item) =>
          String(item.status).toLowerCase() === "present"
      ).length,
    [attendance]
  );

  const absentCount = useMemo(
    () =>
      attendance.filter(
        (item) =>
          String(item.status).toLowerCase() === "absent"
      ).length,
    [attendance]
  );

  const attendanceRate = attendance.length
    ? Math.round((presentCount / attendance.length) * 100)
    : 0;

  const studentMap = useMemo(() => {
    const map = {};

    students.forEach((student) => {
      map[String(student.id)] = student;
    });

    return map;
  }, [students]);

  const sortedAttendance = useMemo(() => {
    return [...attendance].sort((a, b) =>
      String(b.date).localeCompare(String(a.date))
    );
  }, [attendance]);

  return (
    <Layout variant="admin">
      <div className="admin-module-page">
        <div className="admin-module-header">
          <div>
            <span className="admin-module-eyebrow">
              ATTENDANCE MANAGEMENT
            </span>

            <h1>Attendance</h1>

            <p>
              View and monitor student attendance records.
            </p>
          </div>
        </div>

        {error && (
          <div className="admin-module-card" style={{ marginBottom: 20 }}>
            <div className="admin-empty-state">
              <h3>Unable to load attendance</h3>
              <p>{error}</p>
            </div>
          </div>
        )}

        <div className="admin-module-stats">
          <div className="admin-module-stat">
            <div className="admin-module-stat-icon blue">
              <FaClipboardCheck />
            </div>

            <div>
              <span>Total Records</span>
              <strong>
                {loading ? "..." : attendance.length}
              </strong>
            </div>
          </div>

          <div className="admin-module-stat">
            <div className="admin-module-stat-icon green">
              <FaUserCheck />
            </div>

            <div>
              <span>Present</span>
              <strong>
                {loading ? "..." : presentCount}
              </strong>
            </div>
          </div>

          <div className="admin-module-stat">
            <div className="admin-module-stat-icon red">
              <FaUserTimes />
            </div>

            <div>
              <span>Absent</span>
              <strong>
                {loading ? "..." : absentCount}
              </strong>
            </div>
          </div>

          <div className="admin-module-stat">
            <div className="admin-module-stat-icon purple">
              <FaChartPie />
            </div>

            <div>
              <span>Attendance Rate</span>
              <strong>
                {loading ? "..." : `${attendanceRate}%`}
              </strong>
            </div>
          </div>
        </div>

        <section className="admin-module-card">
          <div className="admin-module-card-header">
            <div>
              <h2>Attendance Records</h2>
              <p>
                Daily attendance information from the college database.
              </p>
            </div>
          </div>

          {loading ? (
            <div className="admin-empty-state">
              <div className="admin-empty-icon">
                <FaClipboardCheck />
              </div>

              <h3>Loading attendance...</h3>

              <p>
                Please wait while attendance records are being loaded.
              </p>
            </div>
          ) : sortedAttendance.length === 0 ? (
            <div className="admin-empty-state">
              <div className="admin-empty-icon">
                <FaClipboardCheck />
              </div>

              <h3>No attendance records available</h3>

              <p>
                There are currently no attendance records in db.json.
              </p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table align-middle mb-0">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Student</th>
                    <th>Course</th>
                    <th>Date</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>
                  {sortedAttendance.map((record, index) => {
                    const student =
                      studentMap[String(record.studentId)];

                    const isPresent =
                      String(record.status).toLowerCase() ===
                      "present";

                    return (
                      <tr key={record.id || index}>
                        <td>{index + 1}</td>

                        <td>
                          <strong>
                            {student?.name || "Unknown Student"}
                          </strong>
                        </td>

                        <td>
                          {student?.course || "—"}
                        </td>

                        <td>{record.date || "—"}</td>

                        <td>
                          <span
                            className={`badge ${
                              isPresent
                                ? "text-bg-success"
                                : "text-bg-danger"
                            }`}
                          >
                            {record.status || "Unknown"}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </Layout>
  );
}

export default Attendance;