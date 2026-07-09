import Layout from "../../components/Layout";

function Marks() {
  const marks = [
    {
      id: 1,
      subject: "ReactJS",
      total: 100,
      obtained: 90,
    },
    {
      id: 2,
      subject: "Java",
      total: 100,
      obtained: 82,
    },
    {
      id: 3,
      subject: "Python",
      total: 100,
      obtained: 88,
    },
    {
      id: 4,
      subject: "Database",
      total: 100,
      obtained: 79,
    },
    {
      id: 5,
      subject: "Web Development",
      total: 100,
      obtained: 91,
    },
  ];

  return (
    <Layout>
      <div className="container-fluid">

        <h2 className="mb-4">My Marks</h2>

        <div className="card shadow">

          <div className="card-body">

            <div className="table-responsive">

              <table className="table table-bordered table-hover">

                <thead className="table-dark">

                  <tr>
                    <th>ID</th>
                    <th>Subject</th>
                    <th>Total Marks</th>
                    <th>Obtained Marks</th>
                    <th>Percentage</th>
                    <th>Grade</th>
                  </tr>

                </thead>

                <tbody>

                  {marks.map((item) => {

                    const percentage = (
                      (item.obtained / item.total) *
                      100
                    ).toFixed(0);

                    let grade = "F";

                    if (percentage >= 90) grade = "A+";
                    else if (percentage >= 80) grade = "A";
                    else if (percentage >= 70) grade = "B";
                    else if (percentage >= 60) grade = "C";
                    else if (percentage >= 50) grade = "D";

                    return (
                      <tr key={item.id}>

                        <td>{item.id}</td>

                        <td>{item.subject}</td>

                        <td>{item.total}</td>

                        <td>{item.obtained}</td>

                        <td>{percentage}%</td>

                        <td>
                          <span className="badge bg-success">
                            {grade}
                          </span>
                        </td>

                      </tr>
                    );
                  })}

                </tbody>

              </table>

            </div>

          </div>

        </div>

      </div>
    </Layout>
  );
}

export default Marks;