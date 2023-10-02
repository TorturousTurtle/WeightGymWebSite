import React, { useState, useEffect } from "react";
import {
  getDoc,
  doc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { signOut } from "firebase/auth";
import { auth, db } from "../firebase/firebaseConfig";

import { UserData } from "../interfaces/user-interface";
import { UserWorkout } from "../interfaces/workout-interface";

type UserContextType = {
  isLoggedIn: boolean;
  uid: string;
  userData: UserData | undefined;
  workouts: UserWorkout[] | undefined;
  onLogin: (id: string) => void;
  onLogOut: () => void;
};

type UserContextProviderProps = {
  children: React.ReactNode;
};

export const UserContext = React.createContext<UserContextType>({
  isLoggedIn: false,
  uid: "",
  userData: undefined,
  workouts: undefined,
  onLogin: (id: string) => {},
  onLogOut: () => {},
});

const UserContextProvider: React.FC<UserContextProviderProps> = (
  props
) => {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [id, setId] = useState<string>("");
  const [userData, setUserData] = useState<UserData | undefined>(undefined);
  const [workouts, setWorkouts] = useState<UserWorkout[] | undefined>(
    undefined
  );

  const onLogin = (id: string) => {
    getUserInfo(id);
    getUserWorkouts(id);
    setId(id);
    setLoggedIn(true);
  };

  const onLogOut = () => {
    signOut(auth)
      .then(() => {
        setLoggedIn(false);
        setId("");
        setUserData(undefined);
        setWorkouts(undefined);
        console.log("Successfully signed out");
      })
      .catch((error) => {
        console.log("There was an error logging out: ", error);
      });
  };

  // get user data from firestore
  const getUserInfo = async (uid: string) => {
    const docRef = doc(db, "users", uid);
    const d = await getDoc(docRef);
    if (d.exists()) {
      const userData: UserData = d.data() as UserData;
      setUserData(userData);
      console.log("User data retrieved");
    } else {
      // user doesn't exist
      console.error("User document not found for UID: ", uid);
    }
  };

  // get user workouts from firestore
  const getUserWorkouts = async (uid: string) => {
    const q = query(collection(db, "workouts"), where("authorID", "==", uid));
    const querySnapshot = await getDocs(q);
    let historicalWorkouts: UserWorkout[] = [];

    querySnapshot.forEach((doc) => {
      const userData = doc.data() as UserWorkout;
      historicalWorkouts.push(userData);
    });
    setWorkouts(historicalWorkouts);
    console.log("User workout history retrieved");
  };

  const contextValue: UserContextType = {
    isLoggedIn: loggedIn,
    uid: id,
    userData: userData,
    workouts: workouts,
    onLogin: onLogin,
    onLogOut: onLogOut,
  };

  useEffect(() => {}, [loggedIn, id, userData, workouts]);
  return (
    <UserContext.Provider value={contextValue}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
