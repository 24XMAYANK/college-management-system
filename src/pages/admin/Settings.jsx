import {
  FaCog,
  FaUserShield,
  FaBell,
  FaLock,
  FaPalette,
} from "react-icons/fa";
import Layout from "../../components/Layout";
import "../../styles/admin-modules.css";

function Settings() {
  return (
    <Layout variant="admin">
      <div className="admin-module-page">

        <div className="admin-module-header">
          <div>
            <span className="admin-module-eyebrow">
              SYSTEM MANAGEMENT
            </span>
            <h1>Settings</h1>
            <p>Manage your college management system settings.</p>
          </div>
        </div>

        <section className="admin-settings-grid">

          <div className="admin-setting-card">
            <div className="admin-setting-icon blue">
              <FaUserShield />
            </div>

            <div>
              <h3>Account Settings</h3>
              <p>Manage administrator account information.</p>
            </div>

            <button className="admin-secondary-button">
              Manage
            </button>
          </div>

          <div className="admin-setting-card">
            <div className="admin-setting-icon green">
              <FaBell />
            </div>

            <div>
              <h3>Notifications</h3>
              <p>Configure system notifications.</p>
            </div>

            <button className="admin-secondary-button">
              Manage
            </button>
          </div>

          <div className="admin-setting-card">
            <div className="admin-setting-icon purple">
              <FaLock />
            </div>

            <div>
              <h3>Security</h3>
              <p>Manage password and security preferences.</p>
            </div>

            <button className="admin-secondary-button">
              Manage
            </button>
          </div>

          <div className="admin-setting-card">
            <div className="admin-setting-icon orange">
              <FaPalette />
            </div>

            <div>
              <h3>Appearance</h3>
              <p>Manage dashboard appearance preferences.</p>
            </div>

            <button className="admin-secondary-button">
              Manage
            </button>
          </div>

        </section>

        <section className="admin-module-card">

          <div className="admin-module-card-header">
            <div>
              <h2>System Information</h2>
              <p>College Management System configuration</p>
            </div>

            <FaCog className="admin-settings-header-icon" />
          </div>

          <div className="admin-system-info">

            <div>
              <span>Application</span>
              <strong>College Management System</strong>
            </div>

            <div>
              <span>Panel</span>
              <strong>Administrator</strong>
            </div>

            <div>
              <span>Version</span>
              <strong>1.0.0</strong>
            </div>

          </div>

        </section>

      </div>
    </Layout>
  );
}

export default Settings;