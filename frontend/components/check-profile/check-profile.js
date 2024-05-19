"use client";

import styles from "./check-profile.module.css";

import Link from "next/link";
import { useEffect, useState } from "react";

import { auth } from "@/firebase-config";

import { getUser } from "@/lib/users_actions";

const CheckProfile = () => {
  const user = auth.currentUser;
  const [isProfileChecked, setIsProfileChecked] = useState(false);

  useEffect(() => {
    const handleCheck = async () => {
      const userData = await getUser(user.uid);

      if (userData && user.emailVerified) {
        setIsProfileChecked(true);
      } else {
        setIsProfileChecked(false);
      }
    };
    handleCheck();
  }, []);
  if (isProfileChecked === false) {
    return (
      <div className={styles.main}>
        <div className={styles.container}>
          <h1>UPDATE YOUR PROFILE AND VERIFY YOUR EMAIL BEFORE BROWSING</h1>
          <Link href="/profile">
            <p>You can do that here</p>
          </Link>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default CheckProfile;
