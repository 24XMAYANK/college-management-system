import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout";
import CourseTable from "../../components/CourseTable";
import API from "../../services/api";

function Courses() {
  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      const res = await API.get("/courses");
      setCourses(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteCourse = async (id) => {
    if (!window.confirm("Delete Course?")) return;

    await API.delete(`/courses/${id}`);
    loadCourses();
  };

  const editCourse = (course) => {
    navigate(`/admin/edit-course/${course.id}`);
  };

  const filteredCourses = courses.filter((course) =>
    course.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Layout variant="admin">
      <div className="d-flex justify-content-between mb-4">
        <h2>Courses Management</h2>

        <button
          className="btn btn-primary"
          onClick={() => navigate("/admin/add-course")}
        >
          Add Course
        </button>
      </div>

      <input
        className="form-control mb-4"
        placeholder="Search Course..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <CourseTable
        courses={filteredCourses}
        handleDelete={deleteCourse}
        handleEdit={editCourse}
      />
    </Layout>
  );
}

export default Courses;