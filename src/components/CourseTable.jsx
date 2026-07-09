function CourseTable({ courses, handleDelete, handleEdit }) {
  return (
    <table className="table table-bordered table-hover">
      <thead className="table-dark">
        <tr>
          <th>ID</th>
          <th>Course</th>
          <th>Duration</th>
          <th>Fees</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        {courses.length > 0 ? (
          courses.map((course) => (
            <tr key={course.id}>
              <td>{course.id}</td>
              <td>{course.name}</td>
              <td>{course.duration}</td>
              <td>₹ {course.fees}</td>
              <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => handleEdit(course)}
                >
                  Edit
                </button>

                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(course.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="5" className="text-center">
              No Courses Found
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

export default CourseTable;