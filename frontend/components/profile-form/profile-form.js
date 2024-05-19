"use client";

import styles from "./profile-form.module.css";

import { useState, useEffect } from "react";

import { auth, database } from "@/firebase-config";
import { updateProfile } from "firebase/auth";
import { set, ref, update } from "firebase/database";

import { getUser } from "@/lib/users_actions";

const ProfileForm = () => {
  const user = auth.currentUser;
  const [email, setEmail] = useState(user.email ? user.email : "");
  const [displayName, setDisplayName] = useState(
    user.displayName ? user.displayName : ""
  );
  const [occupation, setOccupation] = useState(
    user.occupation ? user.occupation : ""
  );
  const [phoneNumber, setPhoneNumber] = useState(
    user.phoneNumber ? user.phoneNumber : ""
  );
  const [firstName, setFirstName] = useState(
    user.firstName ? user.firstName : ""
  );
  const [lastName, setLastName] = useState(user.lastName ? user.lastName : "");
  const [error, setError] = useState(null);
  const [userExists, setUserExists] = useState(false);

  useEffect(() => {
    const checkUserExists = async () => {
      const userData = await getUser(user.uid)

      if (userData) {
        setUserExists(true);
        setOccupation(userData.occupation);
        setPhoneNumber(userData.phoneNumber);
        setFirstName(userData.firstName);
        setLastName(userData.lastName);
      } else {
        setUserExists(false);
      }
    };
    checkUserExists();
  }, [user]);

  const handleSubmit = async (event) => {
    updateProfile(auth?.currentUser, {
      displayName: displayName,
      email: email,
    });
    if (userExists) {
      const userData = {
        displayName,
        firstName,
        lastName,
        occupation,
        phoneNumber,
        email,
        photoUrl: user.photoURL,
      };
      const userRef = ref(database, `users/${user.uid}`);
      update(userRef, userData);
    } else {
      try {
        set(ref(database, "users/" + user.uid), {
          displayName,
          firstName,
          lastName,
          occupation,
          phoneNumber,
          email,
          photoUrl: user.photoURL,
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <form action={handleSubmit} className={styles.form}>
      {error && <p>Error: {error}</p>}
      <div className={styles["abstract-duo"]}>
        <div className={styles["abstract-input"]}>
          <label htmlFor="displayName">Display name</label>
          <input
            type="text"
            id="displayName"
            required
            value={displayName}
            onChange={(event) => setDisplayName(event.target.value)}
          />
        </div>
        <div className={styles["abstract-input"]}>
          <label htmlFor="emailAddress">Email address</label>
          <input
            type="email"
            id="emailAddress"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
      </div>
      <div className={styles["abstract-duo"]}>
        <div className={styles["abstract-input"]}>
          <label htmlFor="firstName">First name</label>
          <input
            type="text"
            id="firstName"
            required
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
          />
        </div>
        <div className={styles["abstract-input"]}>
          <label htmlFor="lastName">Last name</label>
          <input
            type="text"
            id="lastName"
            required
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
          />
        </div>
      </div>
      <div className={styles["abstract-duo"]}>
        <div className={styles["abstract-input"]}>
          <label htmlFor="occupation">Occupation</label>
          <input
            type="text"
            id="occupation"
            required
            value={occupation}
            onChange={(event) => setOccupation(event.target.value)}
          />
        </div>
        <div className={styles["abstract-input"]}>
          <label htmlFor="phoneNumber">Phone number</label>
          <input
            type="text"
            id="phoneNumber"
            required
            value={phoneNumber}
            onChange={(event) => setPhoneNumber(event.target.value)}
          />
        </div>
      </div>
      <div>
        <button className={styles["form-button"]}>Save changes</button>
      </div>
    </form>
  );
};

export default ProfileForm;
