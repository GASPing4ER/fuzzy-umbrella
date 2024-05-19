"use client";

import styles from "./profile-pic.module.css";

import defaultPic from "@/public/anonymous.webp";
import { FaEdit } from "react-icons/fa";

import { useState, useRef } from "react";

import { storage, auth } from "@/firebase-config";
import { updateProfile } from "firebase/auth";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

const ProfilePic = () => {
  const user = auth.currentUser;
  const [profilePic, setProfilePic] = useState(
    user.photoURL ? user.photoURL : defaultPic
  );
  const [isFileSelected, setIsFileSelected] = useState(false); // State to track file selection
  const [isUploading, setIsUploading] = useState(false); // State to track file selection

  const fileInputRef = useRef(null); // Ref to access the file input element

  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsUploading(true);

    const file = fileInputRef.current.files[0];
    if (!file) return;

    const storageRef = ref(storage, `profiles/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    setIsFileSelected(false);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        console.log("Upload progress:", snapshot);
      },
      (error) => {
        console.error("Upload error:", error);
        alert(error);
      },
      async () => {
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          console.log("Download URL:", downloadURL);

          // Update user profile picture URL in Firebase Authentication
          await updateProfile(auth.currentUser, {
            photoURL: downloadURL,
          });

          // Update the profilePic state with the new URL
          setProfilePic(downloadURL);
          setIsUploading(false);

          console.log("Profile picture updated successfully");
        } catch (error) {
          console.error("Error updating profile picture:", error);
          alert("Error updating profile picture");
        }
      }
    );
  };

  const handleFileSelect = () => {
    setIsFileSelected(true); // Set file selection status to true when a file is selected
  };

  return (
    <div className={styles.glue}>
      <img src={profilePic} alt="Profile" />
      <form onSubmit={handleSubmit} className={styles.form}>
        <label htmlFor="fileInput">
          <span>
            <FaEdit />
          </span>
        </label>
        <input
          id="fileInput"
          type="file"
          accept="image/*"
          ref={fileInputRef} // Associate the ref with the file input element
          style={{ display: "none" }} // Hide the file input
          onChange={handleFileSelect} // Call handleFileSelect when a file is selected
        />
        {isFileSelected &&
          !isUploading && ( // Render submit button only when a file is selected and not uploading
            <button type="submit">Submit</button>
          )}
        {isUploading && ( // Render submit button only when a file is selected and not uploading
          <button type="submit" disabled={isUploading}>
            Uploading...
          </button>
        )}
      </form>
    </div>
  );
};

export default ProfilePic;
