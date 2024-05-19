"use client";

import { auth } from "@/firebase-config";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function UsersOnlyLayout({ children }) {
  const router = useRouter();
  const [isUserValid, setIsUserValid] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      auth.onAuthStateChanged((user) => {
        if (user) {
          setIsUserValid(true);
        } else {
          router.push("/login");
        }
      });
    };

    checkAuth();
  }, []);

  if (isUserValid) {
    return <div>{children}</div>;
  }
}
