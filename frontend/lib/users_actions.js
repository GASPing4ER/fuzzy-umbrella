import { ref, get } from "firebase/database";
import { database } from "@/firebase-config";

const getUsers = async () => {
  const usersRef = ref(database, "users");
  const snapshot = await get(usersRef);

  if (snapshot.exists() && snapshot.val()) {
    return snapshot.val();
  } else {
    console.log("No data available");
  }
  return null; // explicitly return null if no data exists
};

const getUser = async (userId) => {
  const userRef = ref(database, `users/${userId}`);
  const snapshot = await get(userRef);
  console.log("Snapshot:", snapshot);
  if (snapshot.exists() && snapshot.val()) {
    console.log("User Data:", snapshot.val());
    return snapshot.val();
  } else {
    console.log("No data available");
  }
  return null; // explicitly return null if no data exists
};

const getUserData = async (userId) => {
  const userRef = ref(database, `users/${userId}`);
  const snapshot = await get(userRef);
  if (snapshot.exists() && snapshot.val()) {
    const userData = snapshot.val();
    return { userData, userRef };
  } else {
    console.log("No data available");
  }
  return null;
};

export { getUsers, getUser, getUserData };
