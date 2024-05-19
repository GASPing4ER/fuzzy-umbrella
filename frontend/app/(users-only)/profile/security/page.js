"use client";

import styles from "./page.module.css";

import { useState, useEffect } from "react";

import { ref, update } from "firebase/database";
import { auth, database } from "@/firebase-config";

import { getUserData } from "@/lib/users_actions";

const ProfileSecurityPage = () => {
  const [generatedInvite, setGeneratedInvite] = useState("");
  const [invitesLeft, setInvitesLeft] = useState(0); // Number of invites left
  const user = auth.currentUser;

  useEffect(() => {
    console.log("useEffect()");
    const fetchInviteInfo = async () => {
      try {
        console.log(user.uid)
        const {userData, userRef} = await getUserData(user.uid);
        console.log("user data:", userData)
        if (userData.code) {
          setGeneratedInvite(userData.code);
          setInvitesLeft(userData.invitesLeft);
        } else {
          // Check if generatedInvite is empty
          console.log("generateAndSaveInviteCode()");
          generateAndSaveInviteCode(userRef, userData);
        }
      } catch (error) {
        console.error("Error fetching invite info:", error);
      }
    };
    // Prevent re-execution if generatedInvite is already set
    fetchInviteInfo();
  }, []); // Add generatedInvite to the dependency array

  const generateAndSaveInviteCode = async (userRef, userData) => {
    try {
      console.log("generateInvite(6)");
      const inviteCode = generateInvite(6);
      const codeRef = ref(database, `codes/${inviteCode}`);

      const codeData = {
        valid: true,
        userId: user.uid,
      };

      await update(codeRef, codeData);

      const updatedUserData = {
        ...userData,
        code: inviteCode,
        invitesLeft: 3,
      };

      await update(userRef, updatedUserData);
    } catch (error) {
      console.error("Error generating and saving invite code:", error);
    }
  };

  const generateInvite = (length) => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let code = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      code += characters[randomIndex];
    }
    let formattedCode = code.match(/.{1,3}/g).join("-");
    setGeneratedInvite(formattedCode);
    setInvitesLeft(3);
    return formattedCode;
  };

  const copyToClipboard = (code) => {
    navigator.clipboard.writeText(`localhost:3000/membership?code=${code}`);
  };

  return (
    <div className={styles.main}>
      <h1>Exclusive Invitation</h1>
      <hr />
      <p>
        As a valued member of our prestigious community, you possess a unique
        privilege – the power to shape our network and expand your influence. We
        believe in quality over quantity, which is why we're entrusting you with
        an exclusive opportunity to invite three individuals who embody the same
        spirit of ambition and integrity that defines our club.
      </p>
      <div className={styles.container}>
        <h2>You have {invitesLeft} invitations left.</h2>
        <h3>Your personal invitation code</h3>
        <div className={styles["inner-container"]}>
          <button onClick={() => copyToClipboard(generatedInvite)}>
            {generatedInvite}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileSecurityPage;
