import Dashboard from "../components/dashboard/Dashboard";
import Header from '../components/Header';
import Breadcrumbs from '../components/Breadcrumb';
// import "../css/dashboard.css";

export default function DashboardPage() {
  return (
    <>
        <Header text="Categorie" />
        <main className="dashboard-main">
          <Dashboard />
        </main>
    </>
  );
}
