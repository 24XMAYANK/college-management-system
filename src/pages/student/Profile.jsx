import Layout from "../../components/Layout";
import { FaUserCircle } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";

function Profile() {
  const { user } = useAuth();

  return (
    <Layout>
      <div className="container">

        <div className="card shadow">

          <div className="card-body text-center">

            <FaUserCircle
              size={120}
              className="text-primary mb-3"
            />

            <h2>{user?.name || "Student"}</h2>

            <hr />

            <table className="table table-bordered mt-4">

              <tbody>

                <tr>
                  <th width="220">Name</th>
                  <td>{user?.name || "Rahul Sharma"}</td>
                </tr>

                <tr>
                  <th>Email</th>
                  <td>{user?.email || "rahul@gmail.com"}</td>
                </tr>

                <tr>
                  <th>Role</th>
                  <td>Student</td>
                </tr>

                <tr>
                  <th>Course</th>
                  <td>BCA</td>
                </tr>

                <tr>
                  <th>Semester</th>
                  <td>5th Semester</td>
                </tr>

                <tr>
                  <th>Roll Number</th>
                  <td>BCA-105</td>
                </tr>

                <tr>
                  <th>Mobile</th>
                  <td>9876543210</td>
                </tr>

                <tr>
                  <th>Address</th>
                  <td>Ahmedabad, Gujarat</td>
                </tr>

              </tbody>

            </table>

          </div>

        </div>

      </div>
    </Layout>
  );
}

export default Profile;