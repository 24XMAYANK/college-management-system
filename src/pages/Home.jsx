import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="container mt-5">

      <div className="text-center">

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