import styles from "./searched-member.module.css";

const SearchedMember = ({ member, onHandleMember }) => {
  return (
    <div
      className={styles["member-info"]}
      onClick={() => onHandleMember(member)}
    >
      <img src={member.photoUrl} alt="profile pic" />
      <div className={styles["member-content"]}>
        <p>
          {member.firstName} {member.lastName}
        </p>
        <p className={styles.occupation}>{member.occupation}</p>
      </div>
    </div>
  );
};

export default SearchedMember;
