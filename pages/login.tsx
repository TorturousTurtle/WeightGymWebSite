import React, { useState, useRef, useContext } from "react";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { UserContext } from "../store/user-context";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/router";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import Head from "next/head";

const LoginScreen = () => {
  const [isInvalidCredentials, setIsInvalidCredentials] = useState<
    boolean | undefined
  >(false);
  const [isInvalidReset, setIsInvalidReset] = useState<boolean | undefined>(
    false
  );
  const nameTextInputRef = useRef<HTMLInputElement>(null);
  const passwordTextInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const userCtx = useContext(UserContext);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const username: string | undefined = nameTextInputRef.current?.value;
    const password: string | undefined = passwordTextInputRef.current?.value;
    setIsInvalidCredentials(false);

    if (username && password) {
      signInWithEmailAndPassword(auth, username, password)
        .then((user) => {
          console.log("Signed in successfully!");
          userCtx.onLogin(user.user.uid);
          router.push("/");
        })
        .catch((error) => {
          setIsInvalidCredentials(true);
          console.log(error.message);
        });
    } else {
      setIsInvalidCredentials(true);
    }
  };

  const handlePasswordReset = (e: React.FormEvent) => {
    e.preventDefault();
    const email: string | undefined = nameTextInputRef.current?.value;
    setIsInvalidReset(false);
    if (email) {
      sendPasswordResetEmail(auth, email)
        .then(() => {
          toast.success("Password reset email sent!");
        })
        .catch((error) => {
          const errorMessage = error.message;
          toast.error(errorMessage);
        });
    } else {
      setIsInvalidReset(true);
    }
  };

  return (
    <>
      <Head>
        <title>Weight Gym! - Login Page</title>
        <meta
          name="description"
          content="Login to track your workouts and update your profile"
        />
      </Head>
      <div className="flex flex-col items-center h-screen">
        <div className="flex flex-col items-center justify-center bg-wg-blue rounded-lg py-5 pb-15 mt-40">
          <h1 className="text-4xl text-wg-green font-monoton">WG!</h1>
          <br />
          <h1 className="text-3xl text-white font-bold mb-4">Sign In</h1>
          <div className="md:border-t md:border-wg-green w-[75%]" />
          <form
            className="bg-rapdev-cyan rounded p-8 h-[90%] w-[80%]"
            onSubmit={handleLogin}
          >
            <input
              type="text"
              placeholder="Email Address"
              ref={nameTextInputRef}
              className="w-full px-4 py-2 mb-4 border border-gray-300 text-gray-900 rounded"
            />
            <input
              type="password"
              placeholder="Password"
              ref={passwordTextInputRef}
              className="w-full px-4 py-2 mb-4 border border-gray-300 text-gray-900 rounded"
            />
            {isInvalidCredentials && (
              <p className="text-lato text-red-500 mb-4">
                Invalid credentials. Please try again.
              </p>
            )}
            {isInvalidReset && (
              <p className="text-lato text-red-500 mb-4">
                Please provide your email to reset
              </p>
            )}
            <div className="flex flex-col md:flex-row  justify-between items-center mt-5">
              <button
                className="bg-blue-500  focus:outline-none hover:bg-wg-green text-white hover:underline py-2 px-4 rounded font-bold"
                type="submit"
              >
                Login
              </button>
              <a
                href="#"
                className="text-white text-xs font-bold hover:text-green-400 mt-5 md:mt-0"
                onClick={handlePasswordReset}
              >
                Forgot Password?
              </a>
            </div>
          </form>
          <Link href="/create-account">
            <p className="text-wg-green text-center">Create Account</p>
          </Link>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

// use this function to execute authentication call on the server. does not get exposed to the client
// export function getServerSideProps(){
//     // make authentication call here
//     const userId = "";
//     return {
//         props: {
//             userId: userId
//         }
//     }
// }

export default LoginScreen;
