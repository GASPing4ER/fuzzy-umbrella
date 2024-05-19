"use client";

import styles from "./login-form.module.css";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase-config";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [passwordOne, setPasswordOne] = useState("");
  const [error, setError] = useState(null);

  const router = useRouter();

  const submitHandle = (event) => {
    setError(null);
    //check if passwords match. If they do, create user in Firebase
    // and redirect to your logged in page.
    signInWithEmailAndPassword(auth, email, passwordOne)
      .then((authUser) => {
        localStorage.setItem("user", auth.currentUser);
        setEmail("");
        setPasswordOne("");
        router.push("/");
      })
      .catch((error) => {
        // An error occurred. Set error message to be displayed to user
        setError(error.message);
      });
  };

  return (
    <form action={submitHandle} className={styles.form} autoComplete="off">
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
        name="password"
        id="password"
        type="password"
        value={passwordOne}
        onChange={(event) => setPasswordOne(event.target.value)}
        placeholder="Password"
        autoComplete="new-password"
      />
      <button>Log in</button>
    </form>
  );
};

export default LoginForm;
