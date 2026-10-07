import {
  FaGraduationCap,
  FaCalendarAlt,
  FaBook,
  FaClock,
} from "react-icons/fa";
import Layout from "../../components/Layout";
import "../../styles/admin-modules.css";

function Exams() {
  const exams = [
    {
      name: "Mid Semester Examination",
      course: "Academic Examination",
      date: "12 Oct 2026",
      status: "Upcoming",
    },
    {
      name: "Internal Examination",
      course: "Academic Examination",
      date: "18 Oct 2026",
      status: "Upcoming",
    },
    {
      name: "Semester Examination",
      course: "Academic Examination",
      date: "02 Nov 2026",
      status: "Upcoming",
    },
  ];

  return (
    <Layout variant="admin">
      <div className="admin-module-page">

        <div className="admin-module-header">
          <div>
            <span className="admin-module-eyebrow">
              EXAMINATION MANAGEMENT
            </span>
            <h1>Exams</h1>
            <p>Manage examinations and academic schedules.</p>
          </div>

          <button className="admin-primary-button">
            <FaGraduationCap />
            Add Exam
          </button>
        </div>

        <div className="admin-module-stats">

          <div className="admin-module-stat">
            <div className="admin-module-stat-icon purple">
              <FaGraduationCap />
            </div>
            <div>
              <span>Total Exams</span>
              <strong>{exams.length}</strong>
            </div>
          </div>

          <div className="admin-module-stat">
            <div className="admin-module-stat-icon blue">
              <FaCalendarAlt />
            </div>
            <div>
              <span>Upcoming</span>
              <strong>{exams.length}</strong>
            </div>
          </div>

          <div className="admin-module-stat">
            <div className="admin-module-stat-icon green">
              <FaBook />
            </div>
            <div>
              <span>Courses</span>
              <strong>—</strong>
            </div>
          </div>

        </div>

        <section className="admin-module-card">

          <div className="admin-module-card-header">
            <div>
              <h2>Upcoming Exams</h2>
              <p>Academic examination schedule</p>
            </div>
          </div>

          <div className="admin-module-table-wrapper">

            <table className="admin-module-table">

              <thead>
                <tr>
                  <th>Exam</th>
                  <th>Course</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {exams.map((exam) => (
                  <tr key={exam.name}>
                    <td>
                      <strong>{exam.name}</strong>
                    </td>

                    <td>{exam.course}</td>

                    <td>
                      <span className="admin-date-text">
                        <FaClock />
                        {exam.date}
                      </span>
                    </td>

                    <td>
                      <span className="admin-active-badge">
                        {exam.status}
                      </span>
                    </td>

                    <td>
                      <button className="admin-table-action">
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>

          </div>

        </section>

      </div>
    </Layout>
  );
}

export default Exams;