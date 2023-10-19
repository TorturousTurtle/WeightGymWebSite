import React, { useState, useEffect } from "react";
import {
  getDoc,
  setDoc,
  doc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { auth, db } from "@/firebase/firebaseConfig";
import { createUserWithEmailAndPassword, User, signOut } from "firebase/auth";
import { UserData } from "@/interfaces/user-interface";
import { UserWorkout } from "@/interfaces/workout-interface";
import { RegisterUserData } from "@/interfaces/register-user-data-interface";

type UserContextType = {
  isLoggedIn: boolean;
  uid: string;
  userData: UserData | undefined;
  userAuth: User | undefined;
  workouts: UserWorkout[] | undefined;
  screenWidth: number | undefined;
  onLogin: (user: string) => void;
  onLogOut: () => void;
  registerUser: (registrationData: RegisterUserData) => void;
};

type UserContextProviderProps = {
  children: React.ReactNode;
};

export const UserContext = React.createContext<UserContextType>({
  isLoggedIn: false,
  uid: "",
  userData: undefined,
  userAuth: undefined,
  workouts: undefined,
  screenWidth: 0,
  onLogin: (user: string) => {},
  onLogOut: () => {},
  registerUser: (registrationData: RegisterUserData) => {},
});

const UserContextProvider: React.FC<UserContextProviderProps> = (props) => {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [id, setId] = useState<string>("");
  const [userData, setUserData] = useState<UserData | undefined>(undefined);
  const [userAuth, setUserAuth] = useState<User | undefined>(undefined); // TODO: see if this is used anywhere and delete it if not
  const [workouts, setWorkouts] = useState<UserWorkout[] | undefined>(
    undefined
  );
  const [screenWidth, setScreenWidth] = useState(0);

  const onLogin = (user: string) => {
    getUserInfo(user);
    getUserWorkouts(user);
    setId(user);
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
      console.log("user role is: ", userData.role);
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

  // register user
  const registerUser = async (registrationData: RegisterUserData) => {
    const email = registrationData.email!;
    const password = registrationData.password!;
    const firstName = registrationData.firstName!;
    const lastName = registrationData.lastName!;
    const exercisePBs = registrationData.exercisePBs!;
    const activityLevel = registrationData.activityLevel!;
    const fitnessGoal = registrationData.fitnessGoal!;
    const calories = registrationData.calories!;
    const premiumUser = false;
    let userAge = registrationData.age!.toString();
    let userHeight = registrationData.height!.toString();
    let userWeight = registrationData.weight!.toString();
    let userFat = registrationData.bodyfat!.toString();
    let goalWeight = registrationData.goalWeight!.toString();
    let carbs =
      registrationData.carbs && registrationData.carbs.length > 1
        ? registrationData.carbs
        : "0";
    let fats =
      registrationData.fats && registrationData.fats.length > 1
        ? registrationData.fats
        : "0";
    let proteins =
      registrationData.proteins && registrationData.proteins.length > 1
        ? registrationData.proteins
        : "0";
    let tdee =
      registrationData.tdee && registrationData.tdee.toString().length > 1
        ? parseFloat(registrationData.tdee as string)
        : 0;
    let gender = registrationData.gender!;
    let firstDay = new Date();
    let lastDay = new Date();
    let numDay = firstDay.getDay();
    firstDay.setDate(firstDay.getDate() - numDay);
    let weekStart = firstDay;
    lastDay.setDate(firstDay.getDate() + 7);
    let weekEnd = lastDay;

    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const uid = response.user.uid;

      const data = {
        id: uid,
        email,
        firstName,
        lastName,
        userAge,
        userHeight,
        userWeight,
        goalWeight,
        calories,
        fats,
        carbs,
        proteins,
        tdee,
        userFat,
        gender,
        activityLevel,
        fitnessGoal,
        exercisePBs,
        masterExerciseList: [],
        totalCalories: 0,
        numWorkouts: 0,
        totalWorkouts: 0,
        workoutsForWeek: 0,
        numWeeks: 0,
        weekStart,
        weekEnd,
        premiumUser,
        dailyCalories: "0",
        dailyCarbs: "0",
        dailyFats: "0",
        dailyProteins: "0",
        lastMacrosAdded: new Date(),
      };

      try {
        await setDoc(doc(db, "users", uid), data);
        setUserData(data);
      } catch (error) {
        console.log(error);
      }

      let schedule = {
        Sunday: {},
        Monday: {},
        Tuesday: {},
        Wednesday: {},
        Thursday: {},
        Friday: {},
        Saturday: {},
      };

      try {
        await setDoc(doc(db, "scheduledworkouts", uid), schedule);
        console.log("Schedule created");
      } catch (error) {
        console.log(error);
      }
      setId(uid);
      setLoggedIn(true);
    } catch (error) {
      console.log(error);
    }
  };

  // get screen size
  const getScreenWidth = () => {
    return (
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth
    );
  };

  const contextValue: UserContextType = {
    isLoggedIn: loggedIn,
    uid: id,
    userData: userData,
    userAuth: userAuth,
    workouts: workouts,
    screenWidth: screenWidth,
    onLogin: onLogin,
    onLogOut: onLogOut,
    registerUser: registerUser,
  };

  useEffect(() => {
    const width = getScreenWidth();
    setScreenWidth(width);
  }, [loggedIn, id, userData, workouts, screenWidth]);
  return (
    <UserContext.Provider value={contextValue}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
