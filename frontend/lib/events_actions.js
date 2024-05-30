import { ref, get, update } from "firebase/database";
import { database } from "@/firebase-config";
import { auth } from "@/firebase-config";

const user = auth.currentUser;

const getEvents = async () => {
  const eventsRef = ref(database, "events");
  const snapshot = await get(eventsRef);

  if (snapshot.exists() && snapshot.val()) {
    return snapshot.val();
  }
};

const getEvent = async (eventId) => {
  const eventRef = ref(database, `events/${eventId}`);
  const snapshot = await get(eventRef);
  if (snapshot.exists() && snapshot.val()) {
    return snapshot.val();
  }
};

const getEventData = async (eventId) => {
  const eventRef = ref(database, `events/${eventId}`);
  const snapshot = await get(eventRef);
  if (snapshot.exists() && snapshot.val()) {
    const eventData = snapshot.val();
    return { eventData, eventRef };
  }
};

const handleEventJoining = async (eventId) => {
  try {
    const { eventData, eventRef } = await getEventData(eventId);

    if (eventData) {
      console.log(user.uid);
      if (eventData.members && eventData.members.includes(user.uid)) {
        alert("You have already joined this event.");
      } else {
        const updatedEventData = {
          ...eventData,
          members: eventData.members
            ? [...eventData.members, user.uid]
            : [user.uid],
        };

        // Step 3: Update event data in Firebase with the modified data
        await update(eventRef, updatedEventData);
        alert("Joined successfully");
      }
    }
  } catch (error) {
    console.error("Firebase Error!", error);
  }
};

export { getEvents, getEvent, getEventData, handleEventJoining };
