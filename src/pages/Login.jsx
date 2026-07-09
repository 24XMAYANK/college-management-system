import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();

  const { login, user } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  useEffect(() => {
    if (user) {
      if (user.role === "admin") {
        navigate("/admin/dashboard");
      } else if (user.role === "teacher") {
        navigate("/teacher/dashboard");
      } else if (user.role === "student") {
        navigate("/student/dashboard");
      }
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setError("Please fill all fields.");
      return;
    }

    const loggedInUser = login(
      formData.email,
      formData.password
    );

    if (!loggedInUser) {
      setError("Invalid Email or Password");
    }
  };

  return (
    <div className="container">

      <div className="row justify-content-center align-items-center vh-100">

        <div className="col-md-5">

          <div className="card shadow-lg">

            <div className="card-header bg-primary text-white text-center">

              <h2>College Management System</h2>

            </div>

            <div className="card-body p-4">

              <h4 className="text-center mb-4">
                Login
              </h4>

              {error && (
                <div className="alert alert-danger">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit}>

                <div className="mb-3">

                  <label className="form-label">
                    Email
                  </label>

                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />

                </div>

                <div className="mb-4">

                  <label className="form-label">
                    Password
                  </label>

                  <input
                    type="password"
                    className="form-control"
                    placeholder="Enter Password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                  />

                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100"
                >
                  Login
                </button>

              </form>

              <hr />

              <div className="text-center">

                <p className="fw-bold">
                  Demo Login
                </p>

                <small>

                  Admin : admin@gmail.com / 123456

                  <br />

                  Teacher : teacher@gmail.com / 123456

                  <br />

                  Student : student@gmail.com / 123456

                </small>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Login;