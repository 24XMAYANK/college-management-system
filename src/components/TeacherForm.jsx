import { useState } from "react";

function TeacherForm({ onSubmit, initialData }) {

  const [teacher, setTeacher] = useState(
    initialData || {
      name: "",
      email: "",
      subject: "",
      experience: "",
    }
  );

  const handleChange = (e) => {
    setTeacher({
      ...teacher,
      [e.target.name]: e.target.value,
    });
  };

  const submitForm = (e) => {
    e.preventDefault();
    onSubmit(teacher);
  };

  return (
    <form onSubmit={submitForm}>

      <div className="mb-3">
        <label>Name</label>
        <input
          className="form-control"
          name="name"
          value={teacher.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label>Email</label>
        <input
          className="form-control"
          type="email"
          name="email"
          value={teacher.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label>Subject</label>
        <input
          className="form-control"
          name="subject"
          value={teacher.subject}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label>Experience</label>
        <input
          className="form-control"
          name="experience"
          value={teacher.experience}
          onChange={handleChange}
          required
        />
      </div>

      <button className="btn btn-success">
        Save Teacher
      </button>

    </form>
  );
}

export default TeacherForm;