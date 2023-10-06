import { Timestamp } from "firebase/firestore";

export interface UserData {
    activityLevel: string;
    calories: string;
    carbs: string;
    dailyCalories: string;
    dailyCarbs: string;
    dailyFats: string;
    dailyProteins: string;
    email: string;
    exercisePBs: {};
    fats: string;
    firstName: string;
    fitnessGoal: string;
    gender: string;
    goalWeight: string;
    id: string;
    lastMacrosAdded: Date;
    lastName: string;
    masterExerciseList: string[][];
    numWeeks: number;
    numWorkouts: number;
    premiumUser: boolean;
    proteins: string;
    tdee: number;
    totalCalories: number;
    totalWorkouts: number;
    userAge: string;
    userFat: string;
    userHeight: string;
    userWeight: string;
    weekEnd: Date;
    weekStart: Date;
    workoutsForWeek: number;
    role?: string;
}

// id: uid,
// email,
// firstName,
// lastName,
// userAge,
// userHeight,
// userWeight,
// goalWeight,
// calories,
// fats,
// carbs,
// proteins,
// tdee,
// userFat,
// gender,
// activityLevel,
// fitnessGoal,
// exercisePBs,
// masterExerciseList: [],
// totalCalories: 0,
// numWorkouts: 0,
// totalWorkouts: 0,
// workoutsForWeek: 0,
// numWeeks: 0,
// weekStart,
// weekEnd,
// premiumUser,
// dailyCalories: "0",
// dailyCarbs: "0",
// dailyFats: "0",
// dailyProteins: "0",
// lastMacrosAdded: new Date(),