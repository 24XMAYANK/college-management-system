import { useState } from "react";

function StudentForm({ onSubmit, initialData }) {
  const [student, setStudent] = useState(
    initialData || {
      name: "",
      email: "",
      course: "",
      year: "",
    }
  );

  const handleChange = (e) => {
    setStudent({
      ...student,
      [e.target.name]: e.target.value,
    });
  };

  const submitForm = (e) => {
    e.preventDefault();
    onSubmit(student);
  };

  return (
    <form onSubmit={submitForm}>

      <div className="mb-3">
        <label>Name</label>
        <input
          type="text"
          name="name"
          className="form-control"
          value={student.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label>Email</label>
        <input
          type="email"
          name="email"
          className="form-control"
          value={student.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label>Course</label>
        <input
          type="text"
          name="course"
          className="form-control"
          value={student.course}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label>Year</label>
        <input
          type="text"
          name="year"
          className="form-control"
          value={student.year}
          onChange={handleChange}
          required
        />
      </div>

      <button className="btn btn-success">
        Save Student
      </button>

    </form>
  );
}

export default StudentForm;