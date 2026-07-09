function DashboardCard({ title, value, color }) {
  return (
    <div className="col-md-3 mb-4">
      <div className={`card text-white bg-${color} shadow`}>
        <div className="card-body text-center">
          <h5>{title}</h5>
          <h2>{value}</h2>
        </div>
      </div>
    </div>
  );
}

export default DashboardCard;