import styles from "./experience.module.css";

import Image from "next/image";

const Experience = (props) => {
  return (
    <div className={styles.experience}>
      <Image src={props.icon} alt="experience icon" height={60} />
      <h2>{props.title}</h2>
      <p>{props.desc}</p>
      <hr />
    </div>
  );
};

export default Experience;
