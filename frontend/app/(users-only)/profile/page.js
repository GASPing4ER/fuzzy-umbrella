"use client";

import styles from "./page.module.css";
import { auth } from "@/firebase-config";
import ProfilePic from "@/components/profile-pic/profile-pic";
import ProfileForm from "@/components/profile-form/profile-form";
import { sendEmailVerification } from "firebase/auth";
import { useState } from "react";

const ProfilePage = () => {
  const user = auth.currentUser;
  const [isVerifying, setIsVerifying] = useState(false);

  const handleVerifying = () => {
    sendEmailVerification(user);
    setIsVerifying(true);
  };
  return (
    <div className={styles.container}>
      <h1>Profile</h1>
      <p>Update your photo and personal details here.</p>
      <div className={styles["profile-pic"]}>
        <ProfilePic />
        <div>
          <h2>{user.displayName}</h2>
          {user.emailVerified ? (
            <p>Verified account</p>
          ) : (
            <p>
              Account not verified.{" "}
              <span className={styles.verify} onClick={handleVerifying}>
                {isVerifying ? "Verification in progress." : "Verify now!"}
              </span>
            </p>
          )}
        </div>
      </div>
      <ProfileForm />
    </div>
  );
};

export default ProfilePage;
