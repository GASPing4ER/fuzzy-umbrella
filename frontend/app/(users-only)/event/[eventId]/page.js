import EventJoinButton from "@/components/event-join-button/event-join-button"
import styles from "./page.module.css"

import { getEvent } from '@/lib/events_actions'

const EventDetails = async({ params }) => {
  const event = await getEvent(params.eventId)
  
  return (
    <div className={styles.main}>
      <img src={event.featuredImage}/>
      <h1>{event.title}</h1>
      <p>{event.description}</p>
      <p>Data: {event.date}</p>
      <p>Time: {event.time}</p>
      <EventJoinButton eventId={params.eventId}/>
    </div>
  )
}

export default EventDetails