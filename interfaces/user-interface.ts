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
    lastMacrosAdded: Timestamp;
    lastName: string;
    masterExerciseList: [];
    numWeeks: number;
    numWorkouts: number;
    premiumUser: boolean;
    proteins: string;
    tdee: number;
    totalCalories: number;
    totalWorkouts: number;
    userAge: string;
    UserFat: string;
    userHeight: string;
    userWeight: string;
    weekEnd: Timestamp;
    weekStart: Timestamp;
    workoutsForWeek: number;
    role?: string;
}