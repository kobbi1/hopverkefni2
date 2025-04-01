'use client'

import { useState } from "react";
import styles from "./SignupForm.module.css"
import {MovieRentalApi} from "@/api";
import { useRouter } from "next/navigation";

export default function SignupForm() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
    
        const api = new MovieRentalApi();
        const result = await api.register(email, password);
    
        if (result) {
            router.push("/login");
        } else {
            setMessage("Signup failed, please try again later.");
        }
      }
    return (
        <div className={styles.formContainer}>
            <form onSubmit={handleSubmit} className={styles.form}>
                <label className={styles.label} htmlFor="email">Email:</label>
                <input
                    className={styles.input}
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <label className={styles.label} htmlFor="password">Password:</label>
                <input
                    className={styles.input}
                    id="password"
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button className={styles.button} type="submit">
                    Signup
                </button>
                <p>Already have an account? <a href="/login">Sign in here</a></p>
                {message && <p>{message}</p>}
            </form>
            </div>
      );
}