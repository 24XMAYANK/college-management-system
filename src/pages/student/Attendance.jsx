import { useEffect, useMemo, useState } from "react";
import Layout from "../../components/Layout";
import API from "../../services/api";
import { useAuth } from "../../context/AuthContext";

function StudentAttendance() {
  const { user } = useAuth();

  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [
          studentsRes,
          attendanceRes,
        ] = await Promise.all([
          API.get("/students"),
          API.get("/attendance"),
        ]);

        setStudents(
          Array.isArray(studentsRes.data)
            ? studentsRes.data
            : []
        );

        setAttendance(
          Array.isArray(
            attendanceRes.data
          )
            ? attendanceRes.data
            : []
        );
      } catch (error) {
        console.error(
          "Student attendance error:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const studentId =
    user?.studentId || user?.id;

  const me = students.find(
    (student) =>
      String(student.id) ===
      String(studentId)
  );

  const myAttendance = useMemo(() => {
    return attendance
      .filter(
        (item) =>
          String(item.studentId) ===
          String(studentId)
      )
      .sort((a, b) =>
        String(b.date).localeCompare(
          String(a.date)
        )
      );
  }, [attendance, studentId]);

  const present =
    myAttendance.filter(
      (item) =>
        item.status === "Present"
    ).length;

  const absent =
    myAttendance.filter(
      (item) =>
        item.status === "Absent"
    ).length;

  const percentage =
    myAttendance.length
      ? Math.round(
          (present /
            myAttendance.length) *
            100
        )
      : 0;

  return (
    <Layout variant="student">

      <div className="student-page">

        <div className="student-page-header">

          <div>

            <span>
              STUDENT PORTAL
            </span>

            <h1>
              My Attendance
            </h1>

            <p>
              {me?.name ||
                user?.name ||
                "Student"}{" "}
              ki attendance details.
            </p>

          </div>

        </div>

        <div className="student-stats">

          <div>
            <span>
              Total Records
            </span>

            <strong>
              {myAttendance.length}
            </strong>
          </div>

          <div>
            <span>
              Present
            </span>

            <strong>
              {present}
            </strong>
          </div>

          <div>
            <span>
              Absent
            </span>

            <strong>
              {absent}
            </strong>
          </div>

          <div>
            <span>
              Attendance
            </span>

            <strong>
              {percentage}%
            </strong>
          </div>

        </div>

        <section className="student-card">

          <div className="student-card-title">

            <h2>
              Attendance History
            </h2>

            <span>
              {me?.course ||
                "Academic Course"}
            </span>

          </div>

          {loading ? (
            <div className="student-empty">
              Loading attendance...
            </div>
          ) : (
            <div className="student-table-wrap">

              <table>

                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Student</th>
                    <th>Course</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>

                  {myAttendance.map(
                    (item) => (
                      <tr key={item.id}>

                        <td>
                          {item.date}
                        </td>

                        <td>
                          {me?.name ||
                            "Student"}
                        </td>

                        <td>
                          {me?.course ||
                            "—"}
                        </td>

                        <td>

                          <span
                            className={
                              item.status ===
                              "Present"
                                ? "present"
                                : "absent"
                            }
                          >
                            {item.status}
                          </span>

                        </td>

                      </tr>
                    )
                  )}

                  {!myAttendance.length && (
                    <tr>
                      <td
                        colSpan="4"
                        className="student-empty"
                      >
                        No attendance
                        records found.
                      </td>
                    </tr>
                  )}

                </tbody>

              </table>

            </div>
          )}

        </section>

      </div>

      <style>{`
        .student-page {
          padding: 24px;
          max-width: 1400px;
          margin: 0 auto;
        }

        .student-page-header span {
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 1.5px;
          color: #6477d9;
        }

        .student-page-header h1 {
          margin: 7px 0;
          font-size: 32px;
          color: #17233a;
        }

        .student-page-header p {
          margin: 0;
          color: #7c879c;
        }

        .student-stats {
          display: grid;
          grid-template-columns:
            repeat(4, 1fr);
          gap: 16px;
          margin: 24px 0;
        }

        .student-stats > div,
        .student-card {
          background: #fff;
          border: 1px solid #e9ecf2;
          border-radius: 16px;
          box-shadow:
            0 5px 20px
            rgba(25,35,55,.04);
        }

        .student-stats > div {
          padding: 20px;
        }

        .student-stats span {
          display: block;
          color: #7b879c;
          font-size: 13px;
          margin-bottom: 8px;
        }

        .student-stats strong {
          font-size: 28px;
          color: #18243b;
        }

        .student-card {
          overflow: hidden;
        }

        .student-card-title {
          padding: 20px 22px;
          border-bottom: 1px solid #edf0f5;
          display: flex;
          justify-content: space-between;
        }

        .student-card-title h2 {
          margin: 0;
          color: #1c2940;
          font-size: 18px;
        }

        .student-card-title span {
          color: #7b879c;
          font-size: 13px;
        }

        .student-table-wrap {
          overflow-x: auto;
        }

        table {
          width: 100%;
          border-collapse: collapse;
          min-width: 600px;
        }

        th,
        td {
          padding: 14px 18px;
          border-bottom: 1px solid #edf0f5;
          text-align: left;
          font-size: 13px;
        }

        th {
          background: #fafbfc;
          color: #7c879a;
          font-size: 11px;
          text-transform: uppercase;
        }

        td {
          color: #58657b;
        }

        td span {
          padding: 6px 10px;
          border-radius: 99px;
          font-size: 11px;
          font-weight: 700;
        }

        td .present {
          background: #e9f8ef;
          color: #2d8a56;
        }

        td .absent {
          background: #fff0f1;
          color: #d14f5a;
        }

        .student-empty {
          padding: 40px;
          text-align: center;
          color: #8994a8;
        }

        @media (max-width: 700px) {
          .student-stats {
            grid-template-columns:
              repeat(2, 1fr);
          }
        }

        @media (max-width: 450px) {
          .student-stats {
            grid-template-columns: 1fr;
          }

          .student-page {
            padding: 14px;
          }
        }
      `}</style>

    </Layout>
  );
}

export default StudentAttendance;