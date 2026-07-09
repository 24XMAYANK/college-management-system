import Layout from "../components/Layout";
import { FaUserCircle } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

function Profile() {
  const { user } = useAuth();

  return (
    <Layout>
      <div className="container mt-4">

        <div className="card shadow">

          <div className="card-header bg-primary text-white">
            <h3>My Profile</h3>
          </div>

          <div className="card-body text-center">

            <FaUserCircle
              size={120}
              className="text-primary mb-3"
            />

            <h3>{user?.name || "Guest"}</h3>

            <table className="table table-bordered mt-4">

              <tbody>

                <tr>
                  <th width="200">Name</th>
                  <td>{user?.name || "-"}</td>
                </tr>

                <tr>
                  <th>Email</th>
                  <td>{user?.email || "-"}</td>
                </tr>

                <tr>
                  <th>Role</th>
                  <td>{user?.role || "-"}</td>
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