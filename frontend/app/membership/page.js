"use client";

import styles from "./page.module.css";
import logo from "@/public/logo.svg";

import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

import MembershipForm from "@/components/membership-form/membership-form";

import { useCheckCode } from "@/hooks";

import { getCodes } from "@/lib/codes_actions";

const MembershipContent = () => {
  const searchParams = useSearchParams();
  const { showForm, currentCode } = useCheckCode(searchParams, getCodes);

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
