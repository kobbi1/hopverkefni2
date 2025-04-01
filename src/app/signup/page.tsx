"use client"
import styles from "./page.module.css";
import Navigation from "../components/Navigation/Navigation";
import Footer from "../components/Footer/Footer";
import SignupForm from "../components/SignupForm/SignupForm"

export default function signupPage() {
  return (
    <div  className={styles.page}>
      <Navigation />
      <h1 className={styles.mainContent}>Sign up</h1>
      <SignupForm />
      <Footer/>
      <h2></h2>
    </div>
  );
}
