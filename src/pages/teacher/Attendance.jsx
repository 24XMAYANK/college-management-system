import { useEffect, useMemo, useState } from "react";
import Layout from "../../components/Layout";
import API from "../../services/api";

function TeacherAttendance() {
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [date, setDate] = useState("2026-10-06");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const loadData = async () => {
    try {
      setLoading(true);

      const [studentsRes, attendanceRes] = await Promise.all([
        API.get("/students"),
        API.get("/attendance"),
      ]);

      setStudents(
        Array.isArray(studentsRes.data) ? studentsRes.data : []
      );

      setAttendance(
        Array.isArray(attendanceRes.data)
          ? attendanceRes.data
          : []
      );
    } catch (error) {
      console.error("Teacher attendance error:", error);
      setMessage(
        "Attendance data load nahi ho paya. JSON Server check karein."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const recordsForDate = useMemo(() => {
    return attendance.filter((item) => item.date === date);
  }, [attendance, date]);

  const statusForStudent = (studentId) => {
    const record = recordsForDate.find(
      (item) =>
        String(item.studentId) === String(studentId)
    );

    return record?.status || "Present";
  };

  const setStatus = (studentId, status) => {
    setAttendance((current) => {
      const existing = current.find(
        (item) =>
          String(item.studentId) === String(studentId) &&
          item.date === date
      );

      if (existing) {
        return current.map((item) =>
          item.id === existing.id
            ? { ...item, status }
            : item
        );
      }

      return [
        ...current,
        {
          id: `local-${studentId}-${date}`,
          studentId: String(studentId),
          date,
          status,
        },
      ];
    });
  };

  const saveAttendance = async () => {
    try {
      setSaving(true);
      setMessage("");

      for (const student of students) {
        const status = statusForStudent(student.id);

        const existing = attendance.find(
          (item) =>
            String(item.studentId) === String(student.id) &&
            item.date === date
        );

        if (
          existing &&
          !String(existing.id).startsWith("local-")
        ) {
          await API.patch(
            `/attendance/${existing.id}`,
            {
              status,
            }
          );
        } else {
          await API.post("/attendance", {
            studentId: String(student.id),
            date,
            status,
          });
        }
      }

      await loadData();

      setMessage(
        `Attendance successfully saved for ${date}.`
      );
    } catch (error) {
      console.error("Save attendance error:", error);

      setMessage(
        "Attendance save nahi ho paya."
      );
    } finally {
      setSaving(false);
    }
  };

  const presentCount = students.filter(
    (student) =>
      statusForStudent(student.id) === "Present"
  ).length;

  const absentCount =
    students.length - presentCount;

  const percentage = students.length
    ? Math.round(
        (presentCount / students.length) * 100
      )
    : 0;

  return (
    <Layout variant="teacher">
      <div className="cms-page-shell">

        <div className="cms-page-header">
          <div>
            <span className="cms-page-eyebrow">
              TEACHER PORTAL
            </span>

            <h1>Attendance</h1>

            <p>
              Students ki daily attendance yahin se
              manage karein.
            </p>
          </div>

          <div className="cms-page-actions">
            <input
              type="date"
              value={date}
              onChange={(e) =>
                setDate(e.target.value)
              }
            />

            <button
              type="button"
              onClick={saveAttendance}
              disabled={saving}
            >
              {saving
                ? "Saving..."
                : "Save Attendance"}
            </button>
          </div>
        </div>

        {message && (
          <div className="cms-message">
            {message}
          </div>
        )}

        <div className="cms-stat-grid">

          <div className="cms-stat-card">
            <span>Total Students</span>
            <strong>
              {students.length}
            </strong>
          </div>

          <div className="cms-stat-card">
            <span>Present</span>
            <strong>
              {presentCount}
            </strong>
          </div>

          <div className="cms-stat-card">
            <span>Absent</span>
            <strong>
              {absentCount}
            </strong>
          </div>

          <div className="cms-stat-card">
            <span>Attendance</span>
            <strong>
              {percentage}%
            </strong>
          </div>

        </div>

        <section className="cms-card">

          <div className="cms-card-header">
            <h2>
              Student Attendance
            </h2>

            <span>
              {date}
            </span>
          </div>

          {loading ? (
            <div className="cms-empty">
              Loading attendance...
            </div>
          ) : (
            <div className="cms-table-wrap">

              <table className="cms-table">

                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Student</th>
                    <th>Email</th>
                    <th>Course</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>

                  {students.map((student) => {
                    const status =
                      statusForStudent(
                        student.id
                      );

                    return (
                      <tr key={student.id}>

                        <td>
                          ST
                          {String(student.id).padStart(
                            3,
                            "0"
                          )}
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
                          {student.course}
                        </td>

                        <td>

                          <div className="cms-status-buttons">

                            <button
                              type="button"
                              className={
                                status === "Present"
                                  ? "active"
                                  : ""
                              }
                              onClick={() =>
                                setStatus(
                                  student.id,
                                  "Present"
                                )
                              }
                            >
                              Present
                            </button>

                            <button
                              type="button"
                              className={
                                status === "Absent"
                                  ? "active absent"
                                  : ""
                              }
                              onClick={() =>
                                setStatus(
                                  student.id,
                                  "Absent"
                                )
                              }
                            >
                              Absent
                            </button>

                          </div>

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

      <style>{`
        .cms-page-shell {
          padding: 24px;
          max-width: 1500px;
          margin: 0 auto;
        }

        .cms-page-header {
          display: flex;
          justify-content: space-between;
          gap: 20px;
          align-items: flex-end;
          margin-bottom: 22px;
        }

        .cms-page-eyebrow {
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 1.5px;
          color: #6477d9;
        }

        .cms-page-header h1 {
          margin: 7px 0;
          font-size: 32px;
          color: #18243b;
        }

        .cms-page-header p {
          margin: 0;
          color: #7c879c;
        }

        .cms-page-actions {
          display: flex;
          gap: 10px;
          align-items: center;
        }

        .cms-page-actions input {
          padding: 11px 13px;
          border: 1px solid #e2e6ef;
          border-radius: 10px;
          background: #fff;
        }

        .cms-page-actions button {
          padding: 11px 17px;
          border: 0;
          border-radius: 10px;
          background: #5e72dc;
          color: #fff;
          font-weight: 700;
          cursor: pointer;
        }

        .cms-page-actions button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .cms-message {
          padding: 12px 15px;
          border-radius: 10px;
          background: #eef3ff;
          color: #5368c9;
          margin-bottom: 18px;
        }

        .cms-stat-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
          margin-bottom: 20px;
        }

        .cms-stat-card,
        .cms-card {
          background: #fff;
          border: 1px solid #e9ecf2;
          border-radius: 16px;
          box-shadow: 0 5px 20px rgba(25,35,55,.04);
        }

        .cms-stat-card {
          padding: 20px;
        }

        .cms-stat-card span {
          display: block;
          color: #78839a;
          font-size: 13px;
          margin-bottom: 8px;
        }

        .cms-stat-card strong {
          font-size: 27px;
          color: #17233a;
        }

        .cms-card {
          overflow: hidden;
        }

        .cms-card-header {
          padding: 20px 22px;
          border-bottom: 1px solid #edf0f5;
          display: flex;
          justify-content: space-between;
        }

        .cms-card-header h2 {
          margin: 0;
          font-size: 18px;
          color: #1d2940;
        }

        .cms-card-header span {
          color: #7c879c;
          font-size: 13px;
        }

        .cms-table-wrap {
          overflow-x: auto;
        }

        .cms-table {
          width: 100%;
          border-collapse: collapse;
          min-width: 850px;
        }

        .cms-table th,
        .cms-table td {
          padding: 14px 18px;
          text-align: left;
          border-bottom: 1px solid #edf0f5;
          font-size: 13px;
        }

        .cms-table th {
          background: #fafbfc;
          color: #7d8799;
          font-size: 11px;
          text-transform: uppercase;
        }

        .cms-table td {
          color: #59657b;
        }

        .cms-table td strong {
          color: #26334b;
        }

        .cms-status-buttons {
          display: flex;
          gap: 7px;
        }

        .cms-status-buttons button {
          border: 1px solid #dfe4ed;
          background: #fff;
          padding: 7px 11px;
          border-radius: 8px;
          color: #68748a;
          cursor: pointer;
        }

        .cms-status-buttons button.active {
          background: #e8f7ef;
          border-color: #b8e4c9;
          color: #278450;
          font-weight: 700;
        }

        .cms-status-buttons button.active.absent {
          background: #fff0f1;
          border-color: #f1c4c8;
          color: #d04e59;
        }

        .cms-empty {
          padding: 45px;
          text-align: center;
          color: #8994a8;
        }

        @media (max-width: 800px) {
          .cms-page-header {
            flex-direction: column;
            align-items: stretch;
          }

          .cms-page-actions {
            flex-wrap: wrap;
          }

          .cms-stat-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 480px) {
          .cms-stat-grid {
            grid-template-columns: 1fr;
          }

          .cms-page-shell {
            padding: 14px;
          }
        }
      `}</style>
    </Layout>
  );
}

export default TeacherAttendance;