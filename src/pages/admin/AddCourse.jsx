import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout";
import CourseForm from "../../components/CourseForm";
import API from "../../services/api";

function AddCourse() {
  const navigate = useNavigate();

  const saveCourse = async (course) => {
    await API.post("/courses", course);

    alert("Course Added Successfully");

    navigate("/admin/courses");
  };

  return (
    <Layout>
      <div className="container">

        <div className="card shadow">

          <div className="card-header bg-primary text-white">
            <h3>Add Course</h3>
          </div>

          <div className="card-body">

            <CourseForm
              onSubmit={saveCourse}
            />

          </div>

        </div>

      </div>
    </Layout>
  );
}

export default AddCourse;