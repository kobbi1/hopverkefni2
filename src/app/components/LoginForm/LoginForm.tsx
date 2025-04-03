'use client'

import { useState } from "react";
import styles from "./LoginForm.module.css"
import {MovieRentalApi} from "@/api";
import { useRouter } from "next/navigation";
import {jwtDecode} from "jwt-decode";
import { TokenPayload } from "../../../types";
import Cookies from "js-cookie"; 


export default function LoginForm() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
      
        const api = new MovieRentalApi();
        const result = await api.login(email, password);
      
        if (result && result.token) {
          // Store in localStorage (for client-side logic)
          localStorage.setItem("token", result.token);
      
          // ✅ Also store in cookies (so server can access it)
          Cookies.set("token", result.token, { path: "/" });
      
          const decoded = jwtDecode<TokenPayload>(result.token);
          const decodedRole = decoded.role;
      
          localStorage.setItem("role", decodedRole);
      
          console.log("Logged in as:", decodedRole);
          router.push("/");
        } else {
          setMessage("Login failed, please check your email or password");
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
                    Login
                </button>
                <p>Dont have an account? <a href="/signup">Sign up here</a></p>
                {message && <p>{message}</p>}
            </form>
            </div>
      );
}