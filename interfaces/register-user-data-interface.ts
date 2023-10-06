import { ExercisePBs } from "./exercise-pbs-interface";
export interface RegisterUserData {
    email?: string;
    password?: string;
    firstName?: string;
    lastName?: string;
    age?: string | number;
    height?: string | number;
    weight?: string | number;
    goalWeight?: string | number;
    bodyfat?: string | number;
    calories?: string;
    carbs?: string;
    fats?: string;
    proteins?: string;
    tdee?: string | number;
    gender?: string;
    exercisePBs?: ExercisePBs;
    activityLevel?: string;
    fitnessGoal?: string;
  }