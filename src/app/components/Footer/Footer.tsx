"use client"

import React, { useEffect, useState } from "react";
import styles from "./Footer.module.css"; // Import the CSS module
import { usePathname} from "next/navigation";
import Link from "next/link";

export default function Footer() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

      const pathname = usePathname();

      useEffect(() => {
        const token = localStorage.getItem("token");
        const role = localStorage.getItem("role");
    
        setIsLoggedIn(!!token);
        setIsAdmin(role === "ADMIN");
      },[pathname])

    return (
        <footer className={styles.footer}>
            <div className={styles.footerContent}>
                <p>&copy; {new Date().getFullYear()} Jakob Daníel Vigfússon og Omar Altabbaa</p>

                {isLoggedIn && isAdmin && (
                    <div className={styles.adminPanelOptions}>
                        <Link href="/admin">Admin Panel</Link>
                    </div>
                )}
            </div>

        </footer>
    );
};

