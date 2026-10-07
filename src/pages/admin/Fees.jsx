import {
  FaMoneyBillWave,
  FaCheckCircle,
  FaClock,
  FaExclamationCircle,
} from "react-icons/fa";
import Layout from "../../components/Layout";
import "../../styles/admin-modules.css";

function Fees() {
  return (
    <Layout variant="admin">
      <div className="admin-module-page">

        <div className="admin-module-header">
          <div>
            <span className="admin-module-eyebrow">
              FINANCE MANAGEMENT
            </span>
            <h1>Fees Management</h1>
            <p>Track student fee payments and pending balances.</p>
          </div>
        </div>

        <div className="admin-module-stats">

          <div className="admin-module-stat">
            <div className="admin-module-stat-icon green">
              <FaCheckCircle />
            </div>
            <div>
              <span>Fees Collected</span>
              <strong>—</strong>
            </div>
          </div>

          <div className="admin-module-stat">
            <div className="admin-module-stat-icon orange">
              <FaClock />
            </div>
            <div>
              <span>Pending Fees</span>
              <strong>—</strong>
            </div>
          </div>

          <div className="admin-module-stat">
            <div className="admin-module-stat-icon red">
              <FaExclamationCircle />
            </div>
            <div>
              <span>Overdue</span>
              <strong>—</strong>
            </div>
          </div>

        </div>

        <section className="admin-module-card">

          <div className="admin-module-card-header">
            <div>
              <h2>Fee Transactions</h2>
              <p>Student payment records</p>
            </div>
          </div>

          <div className="admin-empty-state">
            <div className="admin-empty-icon">
              <FaMoneyBillWave />
            </div>

            <h3>No fee transactions available</h3>

            <p>
              Fee transaction data is not available in the current
              backend API.
            </p>
          </div>

        </section>

      </div>
    </Layout>
  );
}

export default Fees;