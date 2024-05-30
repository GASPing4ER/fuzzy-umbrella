"use client";

import styles from "./membership-form.module.css";

import { useRouter } from "next/navigation";
import { useState } from "react";

import {
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
} from "firebase/auth";
import { update } from "firebase/database";
import { auth } from "@/firebase-config";

import { getUserData } from "@/lib/users_actions";
import { getCodeData } from "@/lib/codes_actions";

const MembershipForm = ({ code }) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [passwordOne, setPasswordOne] = useState("");
  const [passwordTwo, setPasswordTwo] = useState("");
  const [error, setError] = useState(null);

  const router = useRouter();

  const handleSubmit = async (event) => {
    setError(null);
    //check if passwords match. If they do, create user in Firebase
    // and redirect to your logged in page.
    if (passwordOne === passwordTwo) {
      createUserWithEmailAndPassword(auth, email, passwordOne)
        .then((authUser) => {
          updateProfile(auth?.currentUser, {
            displayName: username,
            photoURL:
              "https://firebasestorage.googleapis.com/v0/b/vanguard-lodge.appspot.com/o/profiles%2Fanonymous.png?alt=media&token=017e8674-5f69-498b-96fb-01bd71a00133",
          });
          localStorage.setItem("user", auth.currentUser);
          sendEmailVerification(auth.currentUser);
          setEmail("");
          setUsername("");
          setPasswordOne("");
          setPasswordTwo("");
          router.push("/");
        })
        .catch((error) => {
          // An error occurred. Set error message to be displayed to user
          setError(error.message);
          return alert(error);
        });

      const { codeData, codeRef } = await getCodeData(code);

      const { userData, userRef } = await getUserData(codeData.userId);
      if (userData.invitesLeft == 1) {
        const updatedCodeData = {
          ...codeData,
          valid: false,
        };
        await update(codeRef, updatedCodeData);
      }

      const updatedUserData = {
        ...userData,
        invitesLeft: userData.invitesLeft - 1,
      };
      await update(userRef, updatedUserData);
    } else setError("Password do not match");
  };

  return (
    <form action={handleSubmit} className={styles.form} autoComplete="off">
      {error && <div style={{ color: "red" }}>{error}</div>}
      <input
        name="email"
        id="email"
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="Email"
        autoComplete="off"
      />
      <input
        name="username"
        id="username"
        type="text"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
        placeholder="Username"
        autoComplete="off"
      />
      <input
        name="password"
        id="password"
        type="password"
        value={passwordOne}
        onChange={(event) => setPasswordOne(event.target.value)}
        placeholder="Password"
        autoComplete="new-password"
      />
      <input
        name="password-confirm"
        id="password-confirm"
        type="password"
        value={passwordTwo}
        onChange={(event) => setPasswordTwo(event.target.value)}
        placeholder="Confirm password"
        autoComplete="new-password"
      />
      <button>Get Started</button>
    </form>
  );
};

export default MembershipForm;
