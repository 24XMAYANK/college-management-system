import { useEffect, useMemo, useState } from "react";
import Layout from "../../components/Layout";
import API from "../../services/api";

function TeacherMarks() {
  const [students, setStudents] = useState([]);
  const [marks, setMarks] = useState([]);
  const [selectedStudent, setSelectedStudent] =
    useState("");

  const [form, setForm] = useState({
    subject: "",
    exam: "Internal Exam",
    marks: "",
    total: "100",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const loadData = async () => {
    try {
      setLoading(true);

      const [studentsRes, marksRes] =
        await Promise.all([
          API.get("/students"),
          API.get("/marks"),
        ]);

      const studentData = Array.isArray(
        studentsRes.data
      )
        ? studentsRes.data
        : [];

      setStudents(studentData);

      setMarks(
        Array.isArray(marksRes.data)
          ? marksRes.data
          : []
      );

      if (
        !selectedStudent &&
        studentData.length
      ) {
        setSelectedStudent(
          String(studentData[0].id)
        );
      }
    } catch (error) {
      console.error(
        "Teacher marks error:",
        error
      );

      setMessage(
        "Marks data load nahi ho paya."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const studentMarks = useMemo(() => {
    return marks.filter(
      (item) =>
        String(item.studentId) ===
        String(selectedStudent)
    );
  }, [marks, selectedStudent]);

  const selectedStudentObject =
    students.find(
      (student) =>
        String(student.id) ===
        String(selectedStudent)
    );

  const saveMark = async (event) => {
    event.preventDefault();

    if (
      !selectedStudent ||
      !form.subject.trim() ||
      form.marks === ""
    ) {
      setMessage(
        "Student, subject aur marks required hain."
      );

      return;
    }

    try {
      setSaving(true);
      setMessage("");

      await API.post("/marks", {
        studentId: String(selectedStudent),
        subject: form.subject.trim(),
        exam:
          form.exam.trim() ||
          "Internal Exam",
        marks: Number(form.marks),
        total:
          Number(form.total) || 100,
      });

      setForm({
        subject: "",
        exam: "Internal Exam",
        marks: "",
        total: "100",
      });

      await loadData();

      setMessage(
        "Marks successfully save ho gaye."
      );
    } catch (error) {
      console.error(
        "Save marks error:",
        error
      );

      setMessage(
        "Marks save nahi ho paye."
      );
    } finally {
      setSaving(false);
    }
  };

  const deleteMark = async (id) => {
    const confirmDelete = window.confirm(
      "Kya aap ye marks record delete karna chahte hain?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await API.delete(`/marks/${id}`);

      await loadData();

      setMessage(
        "Marks record delete ho gaya."
      );
    } catch (error) {
      console.error(
        "Delete mark error:",
        error
      );

      setMessage(
        "Marks delete nahi ho paya."
      );
    }
  };

  const average = studentMarks.length
    ? Math.round(
        (studentMarks.reduce(
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
          studentMarks.length) *
          10
      ) / 10
    : 0;

  return (
    <Layout variant="teacher">

      <div className="cms-page-shell">

        <div className="cms-page-header">

          <div>
            <span className="cms-page-eyebrow">
              TEACHER PORTAL
            </span>

            <h1>
              Marks Management
            </h1>

            <p>
              Students ke marks add karein
              aur academic performance dekhein.
            </p>
          </div>

        </div>

        {message && (
          <div className="cms-message">
            {message}
          </div>
        )}

        <div className="cms-two-column">

          <section className="cms-card">

            <div className="cms-card-header">
              <h2>
                Add Marks
              </h2>
            </div>

            <form
              className="cms-form"
              onSubmit={saveMark}
            >

              <label>
                Student

                <select
                  value={selectedStudent}
                  onChange={(e) =>
                    setSelectedStudent(
                      e.target.value
                    )
                  }
                >
                  {students.map((student) => (
                    <option
                      key={student.id}
                      value={student.id}
                    >
                      {student.name} —{" "}
                      {student.course}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                Subject

                <input
                  value={form.subject}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      subject:
                        e.target.value,
                    })
                  }
                  placeholder="e.g. ReactJS"
                />
              </label>

              <label>
                Exam

                <input
                  value={form.exam}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      exam: e.target.value,
                    })
                  }
                />
              </label>

              <div className="cms-form-row">

                <label>
                  Marks

                  <input
                    type="number"
                    min="0"
                    value={form.marks}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        marks:
                          e.target.value,
                      })
                    }
                  />
                </label>

                <label>
                  Total

                  <input
                    type="number"
                    min="1"
                    value={form.total}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        total:
                          e.target.value,
                      })
                    }
                  />
                </label>

              </div>

              <button
                type="submit"
                disabled={saving}
              >
                {saving
                  ? "Saving..."
                  : "Save Marks"}
              </button>

            </form>

          </section>

          <section className="cms-card">

            <div className="cms-card-header">

              <div>

                <h2>
                  {selectedStudentObject?.name ||
                    "Student"}{" "}
                  — Marks
                </h2>

                <span>
                  Average:{" "}
                  <strong>
                    {average}%
                  </strong>
                </span>

              </div>

            </div>

            {loading ? (
              <div className="cms-empty">
                Loading marks...
              </div>
            ) : (
              <div className="cms-table-wrap">

                <table className="cms-table">

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
                        Percentage
                      </th>
                      <th>
                        Action
                      </th>
                    </tr>
                  </thead>

                  <tbody>

                    {studentMarks.map(
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
                              {item.marks}/
                              {item.total}
                            </td>

                            <td>
                              {
                                percentage
                              }%
                            </td>

                            <td>

                              <button
                                className="cms-delete"
                                type="button"
                                onClick={() =>
                                  deleteMark(
                                    item.id
                                  )
                                }
                              >
                                Delete
                              </button>

                            </td>

                          </tr>
                        );
                      }
                    )}

                    {!studentMarks.length && (
                      <tr>
                        <td
                          colSpan="5"
                          className="cms-empty"
                        >
                          No marks found.
                        </td>
                      </tr>
                    )}

                  </tbody>

                </table>

              </div>
            )}

          </section>

        </div>

      </div>

      <style>{`
        .cms-page-shell {
          padding: 24px;
          max-width: 1500px;
          margin: 0 auto;
        }

        .cms-page-header {
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

        .cms-message {
          padding: 12px 15px;
          border-radius: 10px;
          background: #eef3ff;
          color: #5368c9;
          margin-bottom: 18px;
        }

        .cms-two-column {
          display: grid;
          grid-template-columns:
            minmax(300px, 390px)
            minmax(0, 1fr);
          gap: 20px;
        }

        .cms-card {
          background: #fff;
          border: 1px solid #e9ecf2;
          border-radius: 16px;
          overflow: hidden;
          box-shadow:
            0 5px 20px
            rgba(25,35,55,.04);
        }

        .cms-card-header {
          padding: 20px 22px;
          border-bottom: 1px solid #edf0f5;
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

        .cms-form {
          padding: 22px;
          display: grid;
          gap: 15px;
        }

        .cms-form label {
          display: grid;
          gap: 7px;
          font-size: 12px;
          font-weight: 700;
          color: #536078;
        }

        .cms-form input,
        .cms-form select {
          width: 100%;
          padding: 11px 12px;
          border: 1px solid #dfe4ed;
          border-radius: 9px;
          outline: none;
          background: #fff;
        }

        .cms-form input:focus,
        .cms-form select:focus {
          border-color: #697de0;
        }

        .cms-form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }

        .cms-form > button {
          border: 0;
          border-radius: 10px;
          padding: 12px;
          background: #5e72dc;
          color: #fff;
          font-weight: 700;
          cursor: pointer;
        }

        .cms-form > button:disabled {
          opacity: .6;
        }

        .cms-table-wrap {
          overflow-x: auto;
        }

        .cms-table {
          width: 100%;
          border-collapse: collapse;
          min-width: 650px;
        }

        .cms-table th,
        .cms-table td {
          padding: 14px 16px;
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

        .cms-delete {
          border: 0;
          background: #fff0f1;
          color: #d04e59;
          padding: 7px 10px;
          border-radius: 7px;
          cursor: pointer;
        }

        .cms-empty {
          padding: 40px;
          text-align: center;
          color: #8994a8;
        }

        @media (max-width: 850px) {
          .cms-two-column {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

    </Layout>
  );
}

export default TeacherMarks;