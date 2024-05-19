"use client";

import styles from "./dashboard-events.module.css"

import { auth } from "@/firebase-config";

import DashboardEvent from "../dashboard-event/dashboard-event";

const DashboardEvents = ({ events }) => {
  const user = auth.currentUser;
  return (
    <div className={styles.main}>
      {/* Map over events and render each event */}
      {Object.entries(events).map(([eventId, event]) => {
        if (event.members && event.members.includes(user.uid)) {
          return <DashboardEvent key={eventId} eventId={eventId} event={event} />;
        }
      })}
    </div>
  );
};

export default DashboardEvents;
