import Layout from "../../components/Layout";

function Attendance() {
  const attendance = [
    { id: 1, subject: "ReactJS", total: 30, present: 28 },
    { id: 2, subject: "Java", total: 30, present: 26 },
    { id: 3, subject: "Python", total: 30, present: 27 },
    { id: 4, subject: "Database", total: 30, present: 29 },
    { id: 5, subject: "Web Development", total: 30, present: 25 }
  ];

  return (
    <Layout>
      <div className="container-fluid">

        <h2 className="mb-4">My Attendance</h2>

        <div className="card shadow">

          <div className="card-body">

            <div className="table-responsive">

              <table className="table table-bordered table-hover">

                <thead className="table-dark">

                  <tr>
                    <th>ID</th>
                    <th>Subject</th>
                    <th>Total Classes</th>
                    <th>Present</th>
                    <th>Attendance %</th>
                  </tr>

                </thead>

                <tbody>

                  {attendance.map((item) => (

                    <tr key={item.id}>

                      <td>{item.id}</td>

                      <td>{item.subject}</td>

                      <td>{item.total}</td>

                      <td>{item.present}</td>

                      <td>
                        {((item.present / item.total) * 100).toFixed(0)}%
                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          </div>

        </div>

      </div>
    </Layout>
  );
}

export default Attendance;