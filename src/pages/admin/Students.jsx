import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout";
import StudentTable from "../../components/StudentTable";
import API from "../../services/api";

function Students() {

  const navigate = useNavigate();

  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
  try {
    const res = await API.get("/students");

    console.log("API Response:", res.data);

    setStudents(res.data);
  } catch (error) {
    console.error("API Error:", error);
  }
};

  const deleteStudent = async (id) => {

    if (!window.confirm("Delete Student?")) return;

    await API.delete(`/students/${id}`);

    loadStudents();
  };

  const editStudent = (student) => {
    navigate(`/admin/edit-student/${student.id}`);
  };

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(search.toLowerCase()) ||
    student.email.toLowerCase().includes(search.toLowerCase()) ||
    student.course.toLowerCase().includes(search.toLowerCase())
  );

  console.log("Students State:", students);

  return (
    <Layout>

      <div className="d-flex justify-content-between mb-3">

        <h2>Students Management</h2>

        <button
          className="btn btn-primary"
          onClick={() => navigate("/admin/add-student")}
        >
          Add Student
        </button>

      </div>

      <input
        className="form-control mb-4"
        placeholder="Search Student..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <StudentTable
        students={filteredStudents}
        handleDelete={deleteStudent}
        handleEdit={editStudent}
      />

    </Layout>
  );
}

export default Students;