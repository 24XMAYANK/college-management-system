import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout";
import StudentForm from "../../components/StudentForm";
import API from "../../services/api";

function AddStudent() {
  const navigate = useNavigate();

  const saveStudent = async (student) => {
    try {
      await API.post("/students", student);
      alert("Student Added Successfully");
      navigate("/admin/students");
    } catch (error) {
      console.log(error);
      alert("Error Adding Student");
    }
  };

  return (
    <Layout>
      <div className="container">
        <div className="card shadow">
          <div className="card-header bg-primary text-white">
            <h3>Add Student</h3>
          </div>

          <div className="card-body">
            <StudentForm onSubmit={saveStudent} />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default AddStudent;