import Layout from "../../components/Layout";

function Students() {
  return (
    <Layout>
      <div className="container mt-4">
        <h2>Teacher Students</h2>

        <table className="table table-bordered">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Course</th>
              <th>Year</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>1</td>
              <td>Rahul Sharma</td>
              <td>BCA</td>
              <td>1st</td>
            </tr>

            <tr>
              <td>2</td>
              <td>Amit Patel</td>
              <td>BSc IT</td>
              <td>2nd</td>
            </tr>
          </tbody>
        </table>
      </div>
    </Layout>
  );
}

export default Students;