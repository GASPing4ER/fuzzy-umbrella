"use client";

import styles from "./page.module.css";
import { auth, database } from "@/firebase-config";
import { useEffect, useState } from "react";
import { ref, get as getFirebaseData, update } from "firebase/database";
import Member from "@/components/member/member";
import { getUsers } from "@/lib/users_actions";

const ProfileNetworkPage = () => {
  const user = auth.currentUser;
  const [myNetwork, setMyNetwork] = useState();
  const [users, setUsers] = useState();

  useEffect(() => {
    const getMyUser = async () => {
      const userData = await getUsers();
      if (userData[user.uid].myNetwork) {
        setMyNetwork(userData[user.uid].myNetwork);
        setUsers(userData);
      }
    };
    getMyUser();
  }, []);

  const handleDeletion = async (chosenId) => {
    try {
      const userRef = ref(database, `users/${user.uid}/myNetwork/`);
      const snapshot = await getFirebaseData(userRef);

      if (snapshot.exists()) {
        // If the user is in the members array, remove them
        const myNetwork = snapshot.val();
        const updatedMyNetwork = myNetwork.filter(
          (memberId) => memberId !== chosenId
        );

        // Construct the update object
        const updates = {};
        updates[`users/${user.uid}/myNetwork`] = updatedMyNetwork;

        // Set the updated array back to the database
        await update(ref(database), updates);
        setMyNetwork(updatedMyNetwork);
      }
    } catch (error) {
      console.error("Firebase Error!", error);
    }
  };

  return (
    <div className={styles.main}>
      <h1>My Network:</h1>
      {myNetwork &&
        myNetwork.map((userId) => {
          const user = users[userId];
          if (user) {
            return (
              <div className={styles.contact} key={userId}>
                <Member
                  featuredMember={user}
                  memberId={userId}
                  isFull={false}
                />
                <button onClick={() => handleDeletion(userId)}>
                  Remove Contact
                </button>
              </div>
            );
          } else {
            return null; // Or handle the case when user is not found
          }
        })}
    </div>
  );
};

export default ProfileNetworkPage;
