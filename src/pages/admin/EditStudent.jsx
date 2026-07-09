import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../../components/Layout";
import StudentForm from "../../components/StudentForm";
import API from "../../services/api";

function EditStudent() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [student, setStudent] = useState(null);

  useEffect(() => {
    loadStudent();
  }, []);

  const loadStudent = async () => {
    const res = await API.get(`/students/${id}`);
    setStudent(res.data);
  };

  const updateStudent = async (data) => {
    await API.put(`/students/${id}`, data);

    alert("Student Updated Successfully");

    navigate("/admin/students");
  };

  if (!student) {
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
            <h3>Edit Student</h3>
          </div>

          <div className="card-body">

            <StudentForm
              initialData={student}
              onSubmit={updateStudent}
            />

          </div>

        </div>

      </div>

    </Layout>
  );
}

export default EditStudent;