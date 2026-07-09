import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import API from "../../services/api";
import {
  FaUserGraduate,
  FaChalkboardTeacher,
  FaBook,
  FaUniversity,
} from "react-icons/fa";

function Dashboard() {
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const studentRes = await API.get("/students");
      const teacherRes = await API.get("/teachers");
      const courseRes = await API.get("/courses");

      setStudents(studentRes.data);
      setTeachers(teacherRes.data);
      setCourses(courseRes.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="container-fluid">

        <h2 className="mb-4">Admin Dashboard</h2>

        <div className="row">

          <div className="col-md-3 mb-4">
            <div className="card bg-primary text-white shadow">
              <div className="card-body text-center">
                <FaUserGraduate size={45} />
                <h3 className="mt-3">{students.length}</h3>
                <h5>Total Students</h5>
              </div>
            </div>
          </div>

          <div className="col-md-3 mb-4">
            <div className="card bg-success text-white shadow">
              <div className="card-body text-center">
                <FaChalkboardTeacher size={45} />
                <h3 className="mt-3">{teachers.length}</h3>
                <h5>Total Teachers</h5>
              </div>
            </div>
          </div>

          <div className="col-md-3 mb-4">
            <div className="card bg-warning shadow">
              <div className="card-body text-center">
                <FaBook size={45} />
                <h3 className="mt-3">{courses.length}</h3>
                <h5>Total Courses</h5>
              </div>
            </div>
          </div>

          <div className="col-md-3 mb-4">
            <div className="card bg-info text-white shadow">
              <div className="card-body text-center">
                <FaUniversity size={45} />
                <h3 className="mt-3">2025</h3>
                <h5>Academic Year</h5>
              </div>
            </div>
          </div>

        </div>

        <div className="card shadow">

          <div className="card-header bg-dark text-white">
            Recent Students
          </div>

          <div className="card-body">

            <table className="table table-bordered table-hover">

              <thead className="table-dark">

                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Course</th>
                  <th>Year</th>
                </tr>

              </thead>

              <tbody>

                {students.slice(0, 5).map((student) => (

                  <tr key={student.id}>
                    <td>{student.id}</td>
                    <td>{student.name}</td>
                    <td>{student.email}</td>
                    <td>{student.course}</td>
                    <td>{student.year}</td>
                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>

      </div>
    </Layout>
  );
}

export default Dashboard;