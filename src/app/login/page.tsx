"use client"
import styles from "./page.module.css";
import Navigation from "../components/Navigation/Navigation";
import Footer from "../components/Footer/Footer";
import LoginForm from "../components/LoginForm/LoginForm"

export default function loginPage() {
  return (
    <div  className={styles.page}>
      <Navigation />
      <h1 className={styles.mainContent}>Login</h1>
      <LoginForm />
      <Footer/>
      <h2></h2>
    </div>
  );
}
