"use client";

import { handleEventJoining } from "@/lib/events_actions";
import styles from "./event.module.css";
import Link from "next/link";

const Event = ({ event, eventId }) => {
  return (
    <div className={styles.event}>
      <img src={event.featuredImage} alt="event image" />
      <div className={styles.container}>
        <p>{event.date}</p>
        <h2>{event.title}</h2>
        <p>{event.description}</p>
        <div className={styles.buttons}>
          <button onClick={() => handleEventJoining(eventId)}>Join</button>
          <div className={styles.details}>
            <Link href={`/event/${eventId}`}>
              <button>Details</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Event;
