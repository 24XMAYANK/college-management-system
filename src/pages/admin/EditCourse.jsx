import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../../components/Layout";
import CourseForm from "../../components/CourseForm";
import API from "../../services/api";

function EditCourse() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [course, setCourse] = useState(null);

  useEffect(() => {
    loadCourse();
  }, []);

  const loadCourse = async () => {
    const res = await API.get(`/courses/${id}`);
    setCourse(res.data);
  };

  const updateCourse = async (data) => {
    await API.put(`/courses/${id}`, data);

    alert("Course Updated Successfully");

    navigate("/admin/courses");
  };

  if (!course) {
    return (
      <Layout>
        <h3>Loading...</h3>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container">

        <div className="card shadow">

          <div className="card-header bg-warning">
            <h3>Edit Course</h3>
          </div>

          <div className="card-body">

            <CourseForm
              initialData={course}
              onSubmit={updateCourse}
            />

          </div>

        </div>

      </div>
    </Layout>
  );
}

export default EditCourse;