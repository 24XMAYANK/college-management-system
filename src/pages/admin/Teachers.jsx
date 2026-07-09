import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout";
import TeacherTable from "../../components/TeacherTable";
import API from "../../services/api";

function Teachers() {
  const navigate = useNavigate();

  const [teachers, setTeachers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadTeachers();
  }, []);

  const loadTeachers = async () => {
    try {
      const res = await API.get("/teachers");
      setTeachers(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTeacher = async (id) => {
    if (!window.confirm("Delete Teacher?")) return;

    await API.delete(`/teachers/${id}`);
    loadTeachers();
  };

  const editTeacher = (teacher) => {
    navigate(`/admin/edit-teacher/${teacher.id}`);
  };

  const filteredTeachers = teachers.filter(
    (teacher) =>
      teacher.name.toLowerCase().includes(search.toLowerCase()) ||
      teacher.email.toLowerCase().includes(search.toLowerCase()) ||
      teacher.subject.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Layout>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Teachers Management</h2>

        <button
          className="btn btn-primary"
          onClick={() => navigate("/admin/add-teacher")}
        >
          Add Teacher
        </button>
      </div>

      <input
        className="form-control mb-4"
        placeholder="Search Teacher..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <TeacherTable
        teachers={filteredTeachers}
        handleDelete={deleteTeacher}
        handleEdit={editTeacher}
      />
    </Layout>
  );
}

export default Teachers;