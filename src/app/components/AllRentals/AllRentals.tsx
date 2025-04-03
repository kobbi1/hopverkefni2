"use client"

import { useEffect, useState } from "react";
import styles from "./AllRentals.module.css"
import { useRouter } from "next/navigation";
import { MovieRentalApi } from "@/api";
import { Rental } from "@/types";

export default function AllRentals() {
    const router = useRouter();
    const [isAuthorized, setIsAuthorized] = useState<null | boolean>(null);
    const [rentals, setRentals] = useState<Rental[]>([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");


    useEffect(() => {
        const token = localStorage.getItem("token");
        const role = localStorage.getItem("role");
    
        if (!token || role !== "ADMIN") {
          router.push("/");
        } else {
          setIsAuthorized(true);
        }
      }, [router]);

    useEffect(() => {
        if (!isAuthorized) return;

        async function fetchRentals() {
            const api = new MovieRentalApi();
            const data = await api.getRentals();

            if(data) {
                setRentals(data);
            }
            setLoading(false);
        }
        fetchRentals();
    },[isAuthorized])

    async function handleDeleteRental(rentalId: number) {
        const confirmed = window.confirm("Are you sure you want to delete this rental?");
        if (!confirmed) return;
      
        const api = new MovieRentalApi();
        const success = await api.deleteRental(rentalId);
      
        if (success) {
          setMessage("Rental deleted successfully.");
          setRentals((prev) => prev.filter((r) => r.id !== rentalId));
        } else {
          setMessage("Failed to delete rental.");
        }
      }
      
      if (isAuthorized === null || loading) {
        return (
            <div className={styles.page}>
                <div className={styles.mainContent}>
                    <h1>Loading rentals...</h1>
                </div>
            </div>
        )
      }
    
      return (
        <div className={styles.page}>
          <div className={styles.mainContent}>
            <h1>All Rentals</h1>
            {message && <p className={styles.statusMessage}>{message}</p>}
            {rentals.length === 0 ? (
              <p>No rentals found.</p>
            ) : (
              <ul className={styles.rentalList}>
                {rentals.map((rental) => (
                  <li key={rental.id} className={styles.rentalItem}>
                    <p><strong>Movie:</strong> {rental.movie?.title}</p>
                    <p><strong>User:</strong> {rental.user?.email}</p>
                    <p><strong>Status:</strong> {rental.status}</p>
                    <p><strong>Rented At:</strong> {new Date(rental.rentalDate).toLocaleDateString()}</p>
                    {rental.returnDate && (
                      <p><strong>Returned:</strong> {new Date(rental.returnDate).toLocaleDateString()}</p>
                    )}
                    <button onClick={() => handleDeleteRental(rental.id)} className={styles.deleteButton}>
                     Delete
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      );
}