import { getEvents } from "@/lib/events_actions";
import styles from "./page.module.css";
import DashboardEvents from "@/components/dashboard-events/dashboard-events";

const ProfileEventsPage = async () => {
  const events = await getEvents();
  if (events) {
    return (
      <div className={styles.main}>
        <h1>Your Events:</h1>
        <DashboardEvents events={events} />
      </div>
    );
  }
  return (
    <div>
      <h1>Events</h1>
      <p>No events...</p>
    </div>
  );
};

export default ProfileEventsPage;
