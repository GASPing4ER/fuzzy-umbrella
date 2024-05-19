"use client";

import styles from "./navigator.module.css";

import { FaUser } from "react-icons/fa";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const Navigator = () => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  useEffect(() => {
    const checkLoggedUser = () => {
      setIsUserLoggedIn(
        typeof window !== "undefined" && localStorage.getItem("user")
      );
    };

    checkLoggedUser();
  }, [isUserLoggedIn]);
  const pathname = usePathname();

  return (
    <div className={styles.navigator}>
      <ul>
        <li className={pathname === "/" ? styles.active : ""}>
          <Link href="/">Home</Link>
        </li>
        <li className={pathname === "/connect" ? styles.active : ""}>
          <Link href="/connect">Connect</Link>
        </li>
        <li className={pathname === "/events" ? styles.active : ""}>
          <Link href="/events">Events</Link>
        </li>
        <li className={pathname === "/contact" ? styles.active : ""}>
          <Link href="/contact">Contact</Link>
        </li>
        {isUserLoggedIn ? (
          <li className={pathname.startsWith("/profile") ? styles.active : ""}>
            <Link href="/profile">
              <FaUser />
            </Link>
          </li>
        ) : (
          <li className={pathname === "/login" ? styles.active : ""}>
            <Link href="/login">Login</Link>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Navigator;
