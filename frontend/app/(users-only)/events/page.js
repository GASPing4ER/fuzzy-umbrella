import styles from "./page.module.css";

import Event from "@/components/event/event";
import { getEvents } from "@/lib/events_actions";

const EventsPage = async () => {
  const events = await getEvents();
  if (events) {
    return (
      <div className={styles.main}>
        <h1>Events</h1>
        <div className={styles.eventList}>
          {Object.entries(events).map(([eventId, event]) => (
            <Event key={eventId} eventId={eventId} event={event} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.main}>
      <h1>Events</h1>
      <p>No events...</p>
    </div>
  );
};

export default EventsPage;
