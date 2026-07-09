import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout";
import TeacherForm from "../../components/TeacherForm";
import API from "../../services/api";

function AddTeacher() {
  const navigate = useNavigate();

  const saveTeacher = async (teacher) => {
    try {
      await API.post("/teachers", teacher);

      alert("Teacher Added Successfully");

      navigate("/admin/teachers");
    } catch (error) {
      console.log(error);
      alert("Error");
    }
  };

  return (
    <Layout>
      <div className="container">

        <div className="card shadow">

          <div className="card-header bg-primary text-white">
            <h3>Add Teacher</h3>
          </div>

          <div className="card-body">

            <TeacherForm
              onSubmit={saveTeacher}
            />

          </div>

        </div>

      </div>
    </Layout>
  );
}

export default AddTeacher;