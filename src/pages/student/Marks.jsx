import { useEffect, useMemo, useState } from "react";
import Layout from "../../components/Layout";
import API from "../../services/api";
import { useAuth } from "../../context/AuthContext";

function StudentMarks() {
  const { user } = useAuth();

  const [students, setStudents] =
    useState([]);

  const [marks, setMarks] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [
          studentsRes,
          marksRes,
        ] = await Promise.all([
          API.get("/students"),
          API.get("/marks"),
        ]);

        setStudents(
          Array.isArray(studentsRes.data)
            ? studentsRes.data
            : []
        );

        setMarks(
          Array.isArray(marksRes.data)
            ? marksRes.data
            : []
        );
      } catch (error) {
        console.error(
          "Student marks error:",
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

  const myMarks = useMemo(() => {
    return marks.filter(
      (item) =>
        String(item.studentId) ===
        String(studentId)
    );
  }, [marks, studentId]);

  const average = myMarks.length
    ? Math.round(
        (myMarks.reduce(
          (sum, item) =>
            sum +
            (Number(item.marks) /
              Math.max(
                Number(item.total) || 100,
                1
              )) *
              100,
          0
        ) /
          myMarks.length) *
          10
      ) / 10
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
              My Marks
            </h1>

            <p>
              {me?.name ||
                user?.name ||
                "Student"}{" "}
              ki academic performance.
            </p>

          </div>

        </div>

        <div className="student-stats">

          <div>
            <span>
              Subjects
            </span>

            <strong>
              {myMarks.length}
            </strong>
          </div>

          <div>
            <span>
              Average
            </span>

            <strong>
              {average}%
            </strong>
          </div>

          <div>
            <span>
              Course
            </span>

            <strong>
              {me?.course || "—"}
            </strong>
          </div>

          <div>
            <span>
              Year
            </span>

            <strong>
              {me?.year || "—"}
            </strong>
          </div>

        </div>

        <section className="student-card">

          <div className="student-card-title">

            <h2>
              Academic Marks
            </h2>

            <span>
              {me?.course ||
                "Academic Course"}
            </span>

          </div>

          {loading ? (
            <div className="student-empty">
              Loading marks...
            </div>
          ) : (
            <div className="student-table-wrap">

              <table>

                <thead>
                  <tr>
                    <th>
                      Subject
                    </th>

                    <th>
                      Exam
                    </th>

                    <th>
                      Marks
                    </th>

                    <th>
                      Total
                    </th>

                    <th>
                      Percentage
                    </th>
                  </tr>
                </thead>

                <tbody>

                  {myMarks.map(
                    (item) => {
                      const percentage =
                        Math.round(
                          (Number(
                            item.marks
                          ) /
                            Math.max(
                              Number(
                                item.total
                              ) || 100,
                              1
                            )) *
                            100
                        );

                      return (
                        <tr
                          key={item.id}
                        >

                          <td>
                            <strong>
                              {
                                item.subject
                              }
                            </strong>
                          </td>

                          <td>
                            {item.exam}
                          </td>

                          <td>
                            {item.marks}
                          </td>

                          <td>
                            {item.total}
                          </td>

                          <td>

                            <span className="mark-badge">
                              {
                                percentage
                              }%
                            </span>

                          </td>

                        </tr>
                      );
                    }
                  )}

                  {!myMarks.length && (
                    <tr>
                      <td
                        colSpan="5"
                        className="student-empty"
                      >
                        No marks records
                        found.
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
          font-size: 25px;
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
          min-width: 650px;
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

        td strong {
          color: #26334b;
        }

        .mark-badge {
          padding: 6px 10px;
          border-radius: 99px;
          background: #eee9ff;
          color: #7046d6;
          font-weight: 700;
          font-size: 11px;
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

export default StudentMarks;