import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/login.css";

function Login() {
  const navigate = useNavigate();

  const { login, user } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

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
    <main className="login-page">

      <div
        className="login-page__overlay"
        aria-hidden="true"
      />

      {/* University branding */}
      <div className="login-brand">
        <span className="login-brand__small">
          random
        </span>

        <span className="login-brand__name">
          UNIVERSITY.
        </span>
      </div>

      {/* Login card */}
      <section
        className="login-card"
        aria-labelledby="login-title"
      >

        <div className="login-card__content">

          <h1 id="login-title">
            Login
          </h1>

          {error && (
            <div
              className="login-error"
              role="alert"
            >
              {error}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            noValidate
          >

            {/* Email */}
            <div className="login-field">

              <span
                className="login-field__icon"
                aria-hidden="true"
              >
                ✉
              </span>

              <input
                type="text"
                name="email"
                placeholder="Email ID / enrollment No"
                value={formData.email}
                onChange={handleChange}
                autoComplete="username"
                aria-label="Email ID or enrollment number"
              />

            </div>

            {/* Password */}
            <div className="login-field">

              <span
                className="login-field__icon login-lock-icon"
                aria-hidden="true"
              >
                🔒
              </span>

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                autoComplete="current-password"
                aria-label="Password"
              />

              {/* Show / Hide password */}
              <button
                type="button"
                className="login-field__toggle"
                onClick={() =>
                  setShowPassword(
                    (visible) => !visible
                  )
                }
                aria-label={
                  showPassword
                    ? "Hide password"
                    : "Show password"
                }
              >
                {showPassword ? "◉" : "◌"}
              </button>

            </div>

            {/* Login */}
            <button
              type="submit"
              className="login-submit"
            >
              Login
            </button>

          </form>

          {/* Demo login */}
          <div className="login-demo">

            <strong>
              Demo Login
            </strong>

            <span>
              Admin : admin@gmail.com / 123456
            </span>

            <span>
              Teacher : teacher@gmail.com / 123456
            </span>

            <span>
              Student : student@gmail.com / 123456
            </span>

          </div>

        </div>

      </section>

    </main>
  );
}

export default Login;