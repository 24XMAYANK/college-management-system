import Layout from "../../components/Layout";
import { FaBook, FaClipboardCheck, FaGraduationCap, FaUserGraduate } from "react-icons/fa";

function Dashboard() {
  return (
    <Layout>
      <h2 className="mb-4">Student Dashboard</h2>

      <div className="row">

        <div className="col-md-3 mb-4">
          <div className="card shadow bg-primary text-white">
            <div className="card-body text-center">
              <FaBook size={40} />
              <h3 className="mt-3">6</h3>
              <h5>Courses</h5>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-4">
          <div className="card shadow bg-success text-white">
            <div className="card-body text-center">
              <FaClipboardCheck size={40} />
              <h3 className="mt-3">92%</h3>
              <h5>Attendance</h5>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-4">
          <div className="card shadow bg-warning">
            <div className="card-body text-center">
              <FaGraduationCap size={40} />
              <h3 className="mt-3">78%</h3>
              <h5>Average Marks</h5>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-4">
          <div className="card shadow bg-info text-white">
            <div className="card-body text-center">
              <FaUserGraduate size={40} />
              <h3 className="mt-3">2025</h3>
              <h5>Academic Year</h5>
            </div>
          </div>
        </div>

      </div>

      <div className="card shadow">

        <div className="card-header bg-dark text-white">
          My Information
        </div>

        <div className="card-body">

          <table className="table table-bordered">

            <tbody>

              <tr>
                <th>Name</th>
                <td>Rahul Sharma</td>
              </tr>

              <tr>
                <th>Course</th>
                <td>BCA</td>
              </tr>

              <tr>
                <th>Semester</th>
                <td>5th</td>
              </tr>

              <tr>
                <th>Roll No</th>
                <td>BCA-105</td>
              </tr>

            </tbody>

          </table>

        </div>

      </div>

    </Layout>
  );
}

export default Dashboard;