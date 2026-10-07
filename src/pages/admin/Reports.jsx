import {
  FaFileAlt,
  FaUserGraduate,
  FaChalkboardTeacher,
  FaBook,
  FaChartBar,
} from "react-icons/fa";
import Layout from "../../components/Layout";
import "../../styles/admin-modules.css";

function Reports() {
  const reports = [
    {
      title: "Student Report",
      description: "View student related information.",
      icon: FaUserGraduate,
    },
    {
      title: "Teacher Report",
      description: "View faculty related information.",
      icon: FaChalkboardTeacher,
    },
    {
      title: "Course Report",
      description: "View available course information.",
      icon: FaBook,
    },
    {
      title: "Academic Report",
      description: "View academic performance information.",
      icon: FaChartBar,
    },
  ];

  return (
    <Layout variant="admin">
      <div className="admin-module-page">

        <div className="admin-module-header">
          <div>
            <span className="admin-module-eyebrow">
              ANALYTICS
            </span>
            <h1>Reports</h1>
            <p>View and analyze college management reports.</p>
          </div>
        </div>

        <section className="admin-report-grid">

          {reports.map((report) => {
            const Icon = report.icon;

            return (
              <article
                className="admin-report-card"
                key={report.title}
              >
                <div className="admin-report-icon">
                  <Icon />
                </div>

                <h3>{report.title}</h3>

                <p>{report.description}</p>

                <button className="admin-secondary-button">
                  Generate Report
                </button>
              </article>
            );
          })}

        </section>

        <section className="admin-module-card">

          <div className="admin-module-card-header">
            <div>
              <h2>Report Data</h2>
              <p>Generated reports will appear here.</p>
            </div>
          </div>

          <div className="admin-empty-state">
            <div className="admin-empty-icon">
              <FaFileAlt />
            </div>

            <h3>No reports generated</h3>

            <p>
              Reporting data is not connected to the current
              backend API.
            </p>
          </div>

        </section>

      </div>
    </Layout>
  );
}

export default Reports;