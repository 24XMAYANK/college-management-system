import Layout from "../../components/Layout";
import { FaUsers, FaClipboardCheck, FaBookOpen } from "react-icons/fa";

function Dashboard() {
  return (
    <Layout>
      <h2 className="mb-4">Teacher Dashboard</h2>

      <div className="row">

        <div className="col-md-4 mb-4">
          <div className="card shadow border-0 bg-primary text-white">
            <div className="card-body text-center">
              <FaUsers size={40} />
              <h3 className="mt-3">120</h3>
              <h5>Total Students</h5>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="card shadow border-0 bg-success text-white">
            <div className="card-body text-center">
              <FaClipboardCheck size={40} />
              <h3 className="mt-3">95%</h3>
              <h5>Attendance</h5>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="card shadow border-0 bg-warning text-dark">
            <div className="card-body text-center">
              <FaBookOpen size={40} />
              <h3 className="mt-3">6</h3>
              <h5>Subjects</h5>
            </div>
          </div>
        </div>

      </div>

      <div className="card shadow">
        <div className="card-header bg-dark text-white">
          Today's Classes
        </div>

        <div className="card-body">

          <table className="table table-bordered">

            <thead>
              <tr>
                <th>Subject</th>
                <th>Time</th>
                <th>Room</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>ReactJS</td>
                <td>10:00 AM</td>
                <td>A-201</td>
              </tr>

              <tr>
                <td>Java</td>
                <td>1:00 PM</td>
                <td>B-102</td>
              </tr>

              <tr>
                <td>Database</td>
                <td>3:00 PM</td>
                <td>C-301</td>
              </tr>
            </tbody>

          </table>

        </div>
      </div>

    </Layout>
  );
}

export default Dashboard;