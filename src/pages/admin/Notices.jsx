import {
  FaBullhorn,
  FaPlus,
  FaCalendarAlt,
} from "react-icons/fa";
import Layout from "../../components/Layout";
import "../../styles/admin-modules.css";

function Notices() {
  const notices = [
    {
      title: "College Announcement",
      description: "Important college information will appear here.",
      date: "Oct 2026",
    },
    {
      title: "Academic Notice",
      description: "Academic announcements will be displayed here.",
      date: "Oct 2026",
    },
    {
      title: "General Notice",
      description: "General college notices will appear here.",
      date: "Oct 2026",
    },
  ];

  return (
    <Layout variant="admin">
      <div className="admin-module-page">

        <div className="admin-module-header">
          <div>
            <span className="admin-module-eyebrow">
              COMMUNICATION
            </span>
            <h1>Notices</h1>
            <p>Publish and manage college announcements.</p>
          </div>

          <button className="admin-primary-button">
            <FaPlus />
            Create Notice
          </button>
        </div>

        <section className="admin-module-card">

          <div className="admin-module-card-header">
            <div>
              <h2>Recent Notices</h2>
              <p>Latest college announcements</p>
            </div>
          </div>

          <div className="admin-notice-grid">

            {notices.map((notice) => (
              <article
                className="admin-notice-card"
                key={notice.title}
              >
                <div className="admin-notice-card-icon">
                  <FaBullhorn />
                </div>

                <div className="admin-notice-card-content">
                  <span>
                    <FaCalendarAlt />
                    {notice.date}
                  </span>

                  <h3>{notice.title}</h3>

                  <p>{notice.description}</p>

                  <button className="admin-table-action">
                    View Notice
                  </button>
                </div>
              </article>
            ))}

          </div>

        </section>

      </div>
    </Layout>
  );
}

export default Notices;