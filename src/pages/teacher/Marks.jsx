import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import API from "../../services/api";

function Marks() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    try {
      const res = await API.get("/students");

      const data = res.data.map((student) => ({
        ...student,
        subject: "ReactJS",
        marks: "",
      }));

      setStudents(data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateMarks = (id, value) => {
    const updated = students.map((student) =>
      student.id === id
        ? { ...student, marks: value }
        : student
    );

    setStudents(updated);
  };

  const saveMarks = () => {
    alert("Marks Saved Successfully");
    console.log(students);
  };

  return (
    <Layout>
      <div className="container-fluid">

        <div className="d-flex justify-content-between mb-4">
          <h2>Marks Management</h2>

          <button
            className="btn btn-success"
            onClick={saveMarks}
          >
            Save Marks
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
                    <th>Subject</th>
                    <th>Marks</th>
                  </tr>

                </thead>

                <tbody>

                  {students.map((student) => (

                    <tr key={student.id}>

                      <td>{student.id}</td>

                      <td>{student.name}</td>

                      <td>{student.course}</td>

                      <td>{student.subject}</td>

                      <td>

                        <input
                          type="number"
                          className="form-control"
                          placeholder="Enter Marks"
                          value={student.marks}
                          onChange={(e) =>
                            updateMarks(student.id, e.target.value)
                          }
                        />

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

export default Marks;