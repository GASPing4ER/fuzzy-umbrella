import { useState, useEffect } from "react";

const useCheckCode = (searchParams, getCodes) => {
  const [showForm, setShowForm] = useState(false);
  const [currentCode, setCurrentCode] = useState("");
  useEffect(() => {
    const checkCodeInUrl = async () => {
      const code = searchParams.get("code");
      if (code) {
        const codesData = await getCodes();
        if (codesData) {
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
  return { showForm, currentCode };
};

const useGetUserNetwork = (user, getUsers) => {
  const [myNetwork, setMyNetwork] = useState();
  const [users, setUsers] = useState();

  useEffect(() => {
    const getMyUser = async () => {
      const userData = await getUsers();
      if (userData[user.uid].myNetwork) {
        setMyNetwork(userData[user.uid].myNetwork);
        setUsers(userData);
      }
    };
    getMyUser();
  }, []);

  return { myNetwork, setMyNetwork, users };
};

const useHandleCheck = (getUser, user) => {
  const [isProfileChecked, setIsProfileChecked] = useState(false);

  useEffect(() => {
    const handleCheck = async () => {
      const userData = await getUser(user.uid);

      if (userData && user.emailVerified) {
        setIsProfileChecked(true);
      } else {
        setIsProfileChecked(false);
      }
    };
    handleCheck();
  }, []);

  return isProfileChecked;
};

const useCheckLoggedIn = () => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoggedUser = () => {
      setIsUserLoggedIn(
        typeof window !== "undefined" && localStorage.getItem("user")
      );
    };

    checkLoggedUser();
  }, [isUserLoggedIn]);

  return isUserLoggedIn;
};

export { useCheckCode, useGetUserNetwork, useHandleCheck, useCheckLoggedIn };
