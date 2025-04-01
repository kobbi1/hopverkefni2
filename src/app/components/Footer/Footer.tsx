import React from "react";
import styles from "./Footer.module.css"; // Import the CSS module

const Footer: React.FC = () => {
    return (
        <footer className={styles.footer}>
            <p>&copy; {new Date().getFullYear()} Jakob Daníel Vigfússon og Omar Altabbaa</p>
        </footer>
    );
};

export default Footer;
