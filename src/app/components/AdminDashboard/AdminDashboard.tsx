"use client"

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./AdminDashboard.module.css"
import AddMovieForm from "./AddMovieForm";
import UpdateMovieForm from "./UpdateMovieForm";
import RemoveMovieForm from "./RemoveMovieForm";
import Link from "next/link";

export default function AdminDashboard() {
    const router = useRouter();
    const [isAuthorized, setIsAuthorized] = useState<null | boolean>(null);
    const [showAddForm, setShowAddForm] = useState(false);
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [showRemoveForm, setShowRemoveForm] = useState(false);
  
    useEffect(() => {
      const token = localStorage.getItem("token");
      const role = localStorage.getItem("role");
  
      if (!token || role !== "ADMIN") {
        router.push("/");
      } else {
        setIsAuthorized(true);
      }
    }, []);
  
    if (isAuthorized === null) {
      return <p>Checking permissions...</p>;
    }
  
    return (
      
      <div className={styles.page}>
        <section className={styles.manageMoviesContainer}>
          <div className={styles.manageMoviesButtons}>
            <h2 className="text-xl font-semibold">Manage Movies</h2>
            <button className={styles.adminButtons} onClick={() => setShowAddForm(!showAddForm)}>
            {showAddForm ? "Cancel" : "Add a movie"}
            </button>
            {showAddForm && <AddMovieForm />}

            <button className={styles.adminButtons} onClick={() => setShowUpdateForm(!showUpdateForm)}>
            {showUpdateForm ? "Cancel" : "Update a movie"}
            </button>
            {showUpdateForm && <UpdateMovieForm />}

            <button className={styles.adminButtons} onClick={() => setShowRemoveForm(!showRemoveForm)}>
            {showRemoveForm ? "Cancel" : "Remove a movie"}
            </button>

            {showRemoveForm && <RemoveMovieForm />}
          </div>
        </section>
        <section className={styles.manageRentalsContainer}>
            <div className={styles.manageMoviesButtons}>
                <h2>Manage Rentals</h2>
                <Link className={styles.adminButtons} href="/all-rentals">All Rentals</Link>
            </div>
        </section>
      </div>
    );
  }