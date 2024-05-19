"use client";

import styles from "./page.module.css";
import logo from "@/public/logo.svg";

import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";

import MembershipForm from "@/components/membership-form/membership-form";

import { getCodes } from "@/lib/codes_actions";

const MembershipContent = () => {
  const [showForm, setShowForm] = useState(false);
  const [currentCode, setCurrentCode] = useState("");
  const searchParams = useSearchParams();
  useEffect(() => {
    const checkCodeInUrl = async () => {
      const code = searchParams.get("code");
      if (code) {
        const codesData = await getCodes();
        if (codesData) {
          const codes = Object.keys(codesData);
          for (const key in codesData) {
            const value = codesData[key];
            if (key === code && value.valid === true) {
              setShowForm(true);
              setCurrentCode(code);
              break;
            }
          }
        }
      }
    };

    checkCodeInUrl();
  }, []);
  return (
    <div className={styles.container}>
      {showForm ? (
        <div className={styles["inner-container"]}>
          <div className={styles.form}>
            <Image src={logo} alt="logo" width={75} />
            <h1>VANGUARD LODGE</h1>
            <p>Join Our Membership Today</p>
            <MembershipForm code={currentCode} />
          </div>
          <div className={styles.background} />
        </div>
      ) : (
        <div className={styles["members-only"]}>
          <Image src={logo} alt="logo" width={75} />
          <h1>FOR MEMBERS ONLY</h1>
        </div>
      )}
    </div>
  );
};

const MembershipPage = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <MembershipContent />
  </Suspense>
);

export default MembershipPage;
