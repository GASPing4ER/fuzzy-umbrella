import styles from "./user-dashboard.module.css";

import {
  FaCalendarAlt,
  FaUserCircle,
  FaLock,
  FaNetworkWired,
} from "react-icons/fa";

import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import Link from "next/link";

import { auth } from "@/firebase-config";
import { signOut } from "firebase/auth";

const UserDashboard = () => {
  const router = useRouter();
  const pathname = usePathname();

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("Signed out successfully");
        localStorage.removeItem("user");
        router.push("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className={styles.dashboard}>
      <h1>Settings</h1>
      <Link href="/profile">
        <div
          className={
            pathname === "/profile"
              ? styles["sidebar-items-active"]
              : styles["sidebar-items"]
          }
        >
          <FaUserCircle />
          Profile
        </div>
      </Link>
      <Link href="/profile/events">
        <div
          className={
            pathname === "/profile/events"
              ? styles["sidebar-items-active"]
              : styles["sidebar-items"]
          }
        >
          <FaCalendarAlt />
          Events
        </div>
      </Link>
      <Link href="/profile/network">
        <div
          className={
            pathname === "/profile/network"
              ? styles["sidebar-items-active"]
              : styles["sidebar-items"]
          }
        >
          <FaNetworkWired />
          Network
        </div>
      </Link>
      <Link href="/profile/security">
        <div
          className={
            pathname === "/profile/security"
              ? styles["sidebar-items-active"]
              : styles["sidebar-items"]
          }
        >
          <FaLock />
          Security
        </div>
      </Link>
      <button onClick={handleSignOut}>Log Out</button>
    </div>
  );
};

export default UserDashboard;
