import Layout from "../../components/Layout";
import { FaUserCircle } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";

function Profile() {
  const { user } = useAuth();

  return (
    <Layout>
      <div className="container mt-4">
        <div className="card shadow">
          <div className="card-body text-center">

            <FaUserCircle
              size={120}
              className="text-primary mb-3"
            />

            <h2>{user?.name || "Teacher"}</h2>

            <table className="table table-bordered mt-4">
              <tbody>
                <tr>
                  <th>Name</th>
                  <td>{user?.name || "Teacher"}</td>
                </tr>

                <tr>
                  <th>Email</th>
                  <td>{user?.email || "teacher@gmail.com"}</td>
                </tr>

                <tr>
                  <th>Role</th>
                  <td>Teacher</td>
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