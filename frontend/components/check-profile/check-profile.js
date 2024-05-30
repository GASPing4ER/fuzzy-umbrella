"use client";

import styles from "./check-profile.module.css";

import Link from "next/link";

import { auth } from "@/firebase-config";

import { getUser } from "@/lib/users_actions";
import { useHandleCheck } from "@/hooks";

const CheckProfile = () => {
  const user = auth.currentUser;

  const isProfileChecked = useHandleCheck(getUser, user);

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
