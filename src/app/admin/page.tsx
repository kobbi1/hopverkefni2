import styles from "./page.module.css";
import Navigation from "../components/Navigation/Navigation";
import Footer from "../components/Footer/Footer";
import AdminDashboard from "../components/AdminDashboard/AdminDashboard";

export default function AdminPage() {
  
  return (
    <div  className={styles.page}>
        <Navigation />
        <h1 className={styles.mainContent}>Admin Dashboard</h1>
        <AdminDashboard />
        <Footer/>
    </div>
  );
}
