import { Timestamp } from "firebase/firestore";

export interface UserWorkout {
    authorID: string;
    calories: number;
    createAt: Timestamp;
    exercises: string;
    scheduledDay: Timestamp | undefined;
    totalWeight: number;
    totalWeightExercise: string;
    workoutName: string;
    workoutTime: string;
}