import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../../components/Layout";
import TeacherForm from "../../components/TeacherForm";
import API from "../../services/api";

function EditTeacher() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [teacher, setTeacher] = useState(null);

  useEffect(() => {
    loadTeacher();
  }, []);

  const loadTeacher = async () => {
    const res = await API.get(`/teachers/${id}`);
    setTeacher(res.data);
  };

  const updateTeacher = async (data) => {
    await API.put(`/teachers/${id}`, data);

    alert("Teacher Updated Successfully");

    navigate("/admin/teachers");
  };

  if (!teacher) {
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
            <h3>Edit Teacher</h3>
          </div>

          <div className="card-body">

            <TeacherForm
              initialData={teacher}
              onSubmit={updateTeacher}
            />

          </div>

        </div>

      </div>
    </Layout>
  );
}

export default EditTeacher;