import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import API from "../../services/api";

function Attendance() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    try {
      const res = await API.get("/students");

      const data = res.data.map((student) => ({
        ...student,
        status: "Present",
      }));

      setStudents(data);
    } catch (error) {
      console.log(error);
    }
  };

  const changeStatus = (id, status) => {
    const updated = students.map((student) =>
      student.id === id ? { ...student, status } : student
    );

    setStudents(updated);
  };

  const saveAttendance = () => {
    alert("Attendance Saved Successfully");
    console.log(students);
  };

  return (
    <Layout>
      <div className="container-fluid">

        <div className="d-flex justify-content-between mb-4">

          <h2>Attendance Management</h2>

          <button
            className="btn btn-success"
            onClick={saveAttendance}
          >
            Save Attendance
          </button>

        </div>

        <div className="card shadow">

          <div className="card-body">

            <div className="table-responsive">

              <table className="table table-bordered table-hover">

                <thead className="table-dark">

                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Course</th>
                    <th>Attendance</th>
                  </tr>

                </thead>

                <tbody>

                  {students.map((student) => (

                    <tr key={student.id}>

                      <td>{student.id}</td>

                      <td>{student.name}</td>

                      <td>{student.course}</td>

                      <td>

                        <select
                          className="form-select"
                          value={student.status}
                          onChange={(e) =>
                            changeStatus(student.id, e.target.value)
                          }
                        >
                          <option>Present</option>
                          <option>Absent</option>
                        </select>

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