"use client";

import styles from "./dashboard-event.module.css";

import { useRouter } from "next/navigation";

import { auth, database } from "@/firebase-config";
import { ref, get, update } from "firebase/database";

const DashboardEvent = ({ event, eventId }) => {
  const user = auth.currentUser;
  const router = useRouter()

  const handleCancelation = async () => {
    try {
      const eventRef = ref(database, `events/${eventId}/members/`);
      const snapshot = await get(eventRef);

      if (snapshot.exists()) {
        // If the user is in the members array, remove them
        const members = snapshot.val();
        const updatedMembers = members.filter(
          (memberId) => memberId !== user.uid
        );

        // Construct the update object
        const updates = {};
        updates[`events/${eventId}/members`] = updatedMembers;

        // Set the updated array back to the database
        await update(ref(database), updates);
        router.refresh()
      }
    } catch (error) {
      console.error("Firebase Error!", error);
    }
  };

  return (
    <div className={styles.event}>
      <div className={styles.time}>
        <h3>{event.date}</h3>
        <h2>{event.time}</h2>
      </div>
      <div className={styles.content}>
        <h2>{event.title}</h2>
        <p>{event.description}</p>
      </div>
      <button onClick={handleCancelation}>Cancel</button>
    </div>
  );
};

export default DashboardEvent;
