"use client";

import styles from "./page.module.css";
import { useState, useEffect } from "react";
import CheckProfile from "@/components/check-profile/check-profile";
import Member from "@/components/member/member";
import { getUsers } from "@/lib/users_actions";
import SearchedMember from "@/components/searched-member/searched-member";

const ConnectPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [originalMembers, setOriginalMembers] = useState([]);
  const [featuredMember, setFeaturedMember] = useState();
  const [featuredMemberId, setFeaturedMemberId] = useState();
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const getMembers = async () => {
      const membersData = await getUsers();

      if (membersData) {
        setOriginalMembers(membersData);
        setMembers(membersData);
        setFeaturedMember(membersData[0]);
        setLoading(false);
      } else {
        setMembers([]);
      }
    };
    getMembers();
  }, []);

  useEffect(() => {
    handleSearch();
  }, [searchQuery]); // Trigger search whenever searchQuery changes

  const handleSearch = () => {
    // Convert members object to array
    setLoading(true);
    if (searchQuery === "") {
      setMembers(originalMembers);
      setFeaturedMember();
    } else {
      const membersArray = Object.values(originalMembers);
      // Filter members based on search query
      const filteredMembers = membersArray.filter(
        (member) =>
          member.firstName
            ?.toLowerCase()
            .startsWith(searchQuery.toLowerCase()) ||
          member.lastName?.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
      setMembers(filteredMembers);
      setFeaturedMember();
    }

    setLoading(false);
  };

  const chooseFeaturedMember = (member) => {
    for (const [memberId, mem] of Object.entries(originalMembers)) {
      if (mem.email === member.email) {
        setFeaturedMemberId(memberId);
        setFeaturedMember(mem);
        return; // Exit loop once the member is found
      }
    }
  };

  return (
    <div className={styles.main}>
      <div className={styles["left-side"]}>
        <h1>Networking time</h1>
        <div className={styles.search}>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Start searching..."
          />
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <ul>
            {Object.keys(members).length > 0 ? (
              Object.values(members).map((member, index) => (
                <li key={index}>
                <SearchedMember
                  member={member}
                  onHandleMember={chooseFeaturedMember}
                />
                </li>
              ))
            ) : (
              <li>No members found.</li>
            )}
          </ul>
        )}
      </div>
      {featuredMember && (
        <Member
          featuredMember={featuredMember}
          memberId={featuredMemberId}
          isFull={true}
        />
      )}
      <CheckProfile />
    </div>
  );
};

export default ConnectPage;
