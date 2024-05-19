"use client";

import styles from "./member.module.css";

import logo from "@/public/logo.svg";
import { FaPhoneVolume, FaEnvelope } from "react-icons/fa";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { auth } from "@/firebase-config";
import { update } from "firebase/database";

import { getUserData } from "@/lib/users_actions";

const Member = ({ featuredMember, memberId, isFull }) => {
  const user = auth.currentUser;
  const router = useRouter();

  const handleNetworkAdding = async () => {
    try {
      const { userData, userRef } = await getUserData(user.uid);
      console.log("userData:", userData)
      console.log("userRef:", userRef)
      if (userData) {
        if (userData.myNetwork && userData.myNetwork.includes(memberId)) {
          alert("You have already added this user.");
        } else {
          const updatedUserData = {
            ...userData,
            myNetwork: userData.myNetwork
              ? [...userData.myNetwork, memberId]
              : [memberId],
          };

          // Step 3: Update event data in Firebase with the modified data
          await update(userRef, updatedUserData);
          router.refresh();
          alert("Added successfully");
        }
      }
    } catch (error) {
      console.error("Firebase Error!", error);
    }
  };

  return (
    <div className={styles["featured-profile"]}>
      {isFull && (
        <div className={styles["front-side"]}>
          <img src={featuredMember.photoUrl} alt="profile pic" />
          <h2>
            {featuredMember.firstName} {featuredMember.lastName}
          </h2>
        </div>
      )}
      <div className={styles["back-side"]}>
        <Image src={logo} width={75} alt="logo" />
        <h2>
          {featuredMember.firstName} {featuredMember.lastName}
        </h2>
        <h3>{featuredMember.occupation}</h3>
        <hr />
        <div className={styles.contacts}>
          {featuredMember.phoneNumber && (
            <div className={styles.contact}>
              <FaPhoneVolume />{" "}
              <span className={styles.phone}>{featuredMember.phoneNumber}</span>
            </div>
          )}
          {featuredMember.email && (
            <div className={styles.contact}>
              <FaEnvelope />{" "}
              <span className={styles.phone}>{featuredMember.email}</span>
            </div>
          )}
        </div>
      </div>
      {isFull && (
        <div className={styles.button}>
          <button onClick={() => handleNetworkAdding()}>
            Add to my network
          </button>
        </div>
      )}
    </div>
  );
};

export default Member;
