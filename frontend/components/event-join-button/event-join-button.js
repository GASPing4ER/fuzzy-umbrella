"use client";

import { handleEventJoining } from "@/lib/events_actions";
import styles from "./event-join-button.module.css";

const EventJoinButton = ({ eventId }) => {
  return (
    <div>
      <button
        onClick={() => handleEventJoining(eventId)}
        className={styles.button}
      >
        Join Event
      </button>
    </div>
  );
};

export default EventJoinButton;
