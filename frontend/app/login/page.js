import styles from "./page.module.css";

import logo from "@/public/logo.svg";

import Image from "next/image";

import LoginForm from "@/components/login-form/login-form";

const LoginPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles["inner-container"]}>
        <div className={styles.form}>
          <Image src={logo} alt="logo" width={75} />
          <h1>VANGUARD LODGE</h1>
          <p>Welcome back!</p>
          <LoginForm />
        </div>
        <div className={styles.background} />
      </div>
    </div>
  );
};

export default LoginPage;
