import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="container mt-5">

      <div className="text-center">

        <h1 className="mb-3 text-primary">
          College Management System
        </h1>

        <p className="lead">
          Welcome to College Management System
        </p>

        <Link
          to="/login"
          className="btn btn-primary mt-3"
        >
          Go To Login
        </Link>

      </div>

    </div>
  );
}

export default Home;