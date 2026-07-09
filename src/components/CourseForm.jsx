import { useState } from "react";

function CourseForm({ initialData, onSubmit }) {
  const [course, setCourse] = useState(
    initialData || {
      name: "",
      duration: "",
      fees: "",
    }
  );

  const handleChange = (e) => {
    setCourse({
      ...course,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(course);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label>Course Name</label>
        <input
          type="text"
          className="form-control"
          name="name"
          value={course.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label>Duration</label>
        <input
          type="text"
          className="form-control"
          name="duration"
          value={course.duration}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label>Fees</label>
        <input
          type="number"
          className="form-control"
          name="fees"
          value={course.fees}
          onChange={handleChange}
          required
        />
      </div>

      <button className="btn btn-success">
        Save Course
      </button>
    </form>
  );
}

export default CourseForm;