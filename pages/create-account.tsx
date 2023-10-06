import React, { useRef, useState, useContext } from "react";
import { ActivityLevelScore } from "@/interfaces/activity-level-interface";
import { GoalScore } from "@/interfaces/goal-score-interface";
import { ExercisePBs } from "@/interfaces/exercise-pbs-interface";
import masterExerciseList from "../utilities/MASTEREXERCISELIST";
import { UserContext } from "@/store/user-context";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Head from "next/head";

const ActivityLevelScore: ActivityLevelScore = {
  sedentary: 1.2,
  lightlyActive: 1.375,
  moderatelyActive: 1.55,
  veryActive: 1.725,
  extremelyActive: 1.9,
};

const GoalScore: GoalScore = {
  gainWeightAgg: 500,
  gainWeightNorm: 250,
  maintain: 0,
  loseWeightNorm: -500,
  loseWeightAgg: -1000,
};

const NewAccount = () => {
  const [gender, setGender] = useState("male");
  const [actLevel, setActLevel] = useState<
    | "sedentary"
    | "lightlyActive"
    | "moderatelyActive"
    | "veryActive"
    | "extremelyActive"
  >("sedentary");
  const [fitGoal, setFitGoal] = useState<
    | "gainWeightAgg"
    | "gainWeightNorm"
    | "maintain"
    | "loseWeightNorm"
    | "loseWeightAgg"
  >("maintain");
  const [isInvalidCredentials, setIsInvalidCredentials] = useState<
    boolean | undefined
  >(false);
  const [passwordsDontMatch, setPasswordsDontMatch] = useState<
    boolean | undefined
  >(false);
  const fnameTextInputRef = useRef<HTMLInputElement>(null);
  const lnameTextInputRef = useRef<HTMLInputElement>(null);
  const emailTextInputRef = useRef<HTMLInputElement>(null);
  const ageTextInputRef = useRef<HTMLInputElement>(null);
  const heightTextInputRef = useRef<HTMLInputElement>(null);
  const weightTextInputRef = useRef<HTMLInputElement>(null);
  const gWeightTextInputRef = useRef<HTMLInputElement>(null);
  const bodyFatTextInputRef = useRef<HTMLInputElement>(null);
  const passwordTextInputRef = useRef<HTMLInputElement>(null);
  const rtpasswordTextInputRef = useRef<HTMLInputElement>(null);
  const { registerUser } = useContext(UserContext);
  const router = useRouter();

  const handleGenderOption = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setGender(e.target.value);
  };

  const handleActivityOption = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setActLevel(
      e.target.value as
        | "sedentary"
        | "lightlyActive"
        | "moderatelyActive"
        | "veryActive"
        | "extremelyActive"
    );
  };

  const handleFitGoalOption = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFitGoal(
      e.target.value as
        | "gainWeightAgg"
        | "gainWeightNorm"
        | "maintain"
        | "loseWeightNorm"
        | "loseWeightAgg"
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsInvalidCredentials(false);
    setPasswordsDontMatch(false);

    const fname: string | undefined = fnameTextInputRef.current?.value;
    const lname: string | undefined = lnameTextInputRef.current?.value;
    const email: string | undefined = emailTextInputRef.current?.value;
    const age: string | number = ageTextInputRef.current
      ? ageTextInputRef.current.value
      : 21;
    const height: string | number = heightTextInputRef.current
      ? heightTextInputRef.current.value
      : 0;
    const weight: string | number = weightTextInputRef.current
      ? weightTextInputRef.current.value
      : 0;
    const gWeight: string | number = gWeightTextInputRef.current
      ? gWeightTextInputRef.current.value
      : 0;
    const bodyFat: string | number = bodyFatTextInputRef.current
      ? bodyFatTextInputRef.current.value
      : 0;
    const password: string | undefined = passwordTextInputRef.current?.value;
    const rtpassword: string | undefined =
      rtpasswordTextInputRef.current?.value;
    let td;
    let cal;
    let carbGoal;
    let fatGoal;
    let protGoal;

    if (password && password !== rtpassword) {
      setPasswordsDontMatch(true);
    } else if (password && password?.length < 12) {
      setIsInvalidCredentials(true);
    } else {
      if (height.toString().length > 0 && weight.toString().length > 0) {
        let heightCM = parseFloat(height.toString()) * 2.54;
        let weightKG = parseFloat(weight.toString()) / 2.2;
        let alScore = ActivityLevelScore[actLevel];
        if (gender === "Male") {
          td = Math.round(
            (66 +
              13.7 * weightKG +
              5 * heightCM -
              6.8 * parseInt(age.toString())) *
              alScore
          );
        } else {
          td = Math.round(
            (655 +
              9.6 * weightKG +
              1.8 * heightCM -
              4.7 * parseInt(age.toString())) *
              alScore
          );
        }
        cal = (td + GoalScore[fitGoal]).toString();
        carbGoal = Math.round(parseInt(cal) * 0.45).toString();
        fatGoal = Math.round(parseInt(cal) * 0.2).toString();
        protGoal = Math.round(parseInt(cal) * 0.35).toString();
      } else {
        td = "";
        cal = "No Goal Set";
        carbGoal = "";
        fatGoal = "";
        protGoal = "";
      }
      let exercisePBs: ExercisePBs = {};
      for (let i = 0; i < masterExerciseList.length; i++) {
        exercisePBs[masterExerciseList[i][0]] = [0, 0];
      }
      const registrationData = {
        email: email,
        password: password,
        firstName: fname,
        lastName: lname,
        age: age,
        height: height,
        weight: weight,
        goalWeight: gWeight,
        bodyfat: bodyFat,
        calories: cal,
        carbs: carbGoal,
        fats: fatGoal,
        proteins: protGoal,
        tdee: td,
        gender: gender,
        exercisePBs: exercisePBs,
        activityLevel: actLevel,
        fitnessGoal: fitGoal,
      };

      registerUser(registrationData);
      toast.success("New user created!");
      setTimeout(() => {
        router.push("/");
      }, 3000);
    }
  };

  return (
    <>
    <Head>
        <title>Weight Gym! - Create Account</title>
        <meta
          name="description"
          content="Create a Weight Gym! account"
        />
      </Head>
      <div className="flex flex-col items-center">
        <div className="pt-10">
          <h1 className="text-5xl text-wg-green font-monoton">Registration</h1>
        </div>
        <form
          className="bg-gray-200 p-6 mt-6 rounded-lg w-1/2"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-row justify-between mb-4">
            <div className="w-2/5">
              <label htmlFor="f-name" className="text-gray-700">
                First Name:
              </label>
              <input
                id="f-name"
                type="text"
                name="fname"
                ref={fnameTextInputRef}
                required
                className="block w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring focus:ring-wg-green focus:border-wg-green text-gray-900"
              />
            </div>
            <div className="w-2/5">
              <label htmlFor="l-name" className="text-gray-700">
                Last Name:
              </label>
              <input
                id="l-name"
                type="text"
                name="lname"
                ref={lnameTextInputRef}
                required
                className="block w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring focus:ring-wg-green focus:border-wg-green text-gray-900"
              />
            </div>
          </div>
          <div className="flex flex-row justify-between mb-4">
            <div className="w-2/5">
              <label htmlFor="email" className="text-gray-700">
                Email:
              </label>
              <input
                id="email"
                type="email"
                name="email"
                ref={emailTextInputRef}
                required
                className="block w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring focus:ring-wg-green focus:border-wg-green text-gray-900"
              />
            </div>
            <div className="w-2/5">
              <label htmlFor="age" className="text-gray-700">
                Age (Optional):
              </label>
              <input
                id="age"
                type="number"
                name="age"
                ref={ageTextInputRef}
                className="block w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring focus:ring-wg-green focus:border-wg-green text-gray-900"
              />
            </div>
          </div>
          <div className="flex flex-row justify-between mb-4">
            <div className="w-2/5">
              <label htmlFor="height" className="text-gray-700">
                Height (Optional):
              </label>
              <input
                id="height"
                type="number"
                name="height"
                placeholder="Inches"
                ref={heightTextInputRef}
                className="block w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring focus:ring-wg-green focus:border-wg-green text-gray-900"
              />
            </div>
            <div className="w-2/5">
              <label htmlFor="weight" className="text-gray-700">
                Weight (Optional):
              </label>
              <input
                id="weight"
                type="number"
                name="weight"
                ref={weightTextInputRef}
                placeholder="Lbs"
                className="block w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring focus:ring-wg-green focus:border-wg-green text-gray-900"
              />
            </div>
          </div>
          <div className="flex flex-row justify-between mb-4">
            <div className="w-2/5">
              <label htmlFor="gWeight" className="text-gray-700">
                Weight Goal (Optional):
              </label>
              <input
                id="gWeight"
                type="number"
                name="gWeight"
                placeholder="Lbs"
                ref={gWeightTextInputRef}
                className="block w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring focus:ring-wg-green focus:border-wg-green text-gray-900"
              />
            </div>
            <div className="w-2/5">
              <label htmlFor="bodyfat" className="text-gray-700">
                Body Fat % (Optional):
              </label>
              <input
                id="bodyfat"
                type="number"
                name="bodyfat"
                ref={bodyFatTextInputRef}
                className="block w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring focus:ring-wg-green focus:border-wg-green text-gray-900"
              />
            </div>
          </div>
          <div className="flex flex-row justify-between mb-4 mt-20">
            <div className="flex flex-col w-1/4">
              <label htmlFor="gender" className="text-gray-700">
                Gender:
              </label>
              <select
                onChange={handleGenderOption}
                className="block w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 text-gray-900"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="flex flex-col w-1/4">
              <label htmlFor="gender" className="text-gray-700">
                Current Activity Level:
              </label>
              <select
                onChange={handleActivityOption}
                className="block w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 text-gray-900"
              >
                <option value="sedentry">Sedentry</option>
                <option value="lightlyActive">Lightly Active</option>
                <option value="moderatelyActive">Moderately Active</option>
                <option value="veryActive">Very Active</option>
                <option value="extremelyActive">Extremely Active</option>
              </select>
            </div>
            <div className="flex flex-col w-1/4">
              <label htmlFor="gender" className="text-gray-700">
                Fitness Goal:
              </label>
              <select
                onChange={handleFitGoalOption}
                className="block w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 text-gray-900"
              >
                <option value="gainWeightAgg">
                  Gain Weight - Agressive (+500 Calories)
                </option>
                <option value="gainWeightNorm">
                  Gain Weight - Normal (+250 Calories)
                </option>
                <option value="maintain">Maintain Weight</option>
                <option value="loseWeightNorm">
                  Lose Weight - Normal (-500 Calories)
                </option>
                <option value="loseWeightAgg">
                  Lose Weight - Agressive (-1000 Calories)
                </option>
              </select>
            </div>
          </div>
          <div className="flex flex-row justify-between mb-4">
            <div className="w-2/5">
              <label htmlFor="password" className="text-gray-700">
                Password:
              </label>
              <input
                id="password"
                type="password"
                name="password"
                ref={passwordTextInputRef}
                required
                className="block w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring focus:ring-wg-green focus:border-wg-green text-gray-900"
              />
            </div>
            <div className="w-2/5">
              <label htmlFor="rtpassword" className="text-gray-700">
                Confirm Password:
              </label>
              <input
                id="rtpassword"
                type="password"
                name="rtpassword"
                ref={rtpasswordTextInputRef}
                required
                className="block w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring focus:ring-wg-green focus:border-wg-green text-gray-900"
              />
              <p className="text-gray-900 text-sm text-center">
                Password must be at least 12 characters long
              </p>
            </div>
          </div>
          <div className="flex flex-col text-center items-center justify-center w-full">
            {passwordsDontMatch && (
              <p className="text-lato text-red-500 mb-4">
                Passwords don&apos;t match. Please try again.
              </p>
            )}
            {isInvalidCredentials && (
              <p className="text-lato text-red-500 mb-4">
                Invalid credentials. Password must be at least 12 characters
                long.
              </p>
            )}
            <button
              type="submit"
              className="bg-wg-green text-white w-1/6 py-2 px-4 mr-5 rounded-lg hover:bg-opacity-80 focus:outline-none focus:ring focus:ring-wg-green font-bold"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </>
  );
};

export default NewAccount;
