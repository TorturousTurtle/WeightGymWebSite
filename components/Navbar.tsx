"use client";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import React, { useState, useContext } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { UserContext } from "../store/user-context";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const router = useRouter();
  const userCtx = useContext(UserContext);

  const logOut = () => {
    userCtx.onLogOut();
    router.push("/");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <header className="bg-black md:sticky top-0 z-10 md:border-b md:border-wg-green">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center justify-between">
        <div className="flex w-full justify-end items-start">
          {userCtx.isLoggedIn ? (
            <div>
            <AccountCircleIcon className="w-10 h-10 text-white hover:text-blue-400 mr-5" />
            <button
              className="inline-flex items-center bg-wg-blue border-0 py-1 px-3 focus:outline-none hover:bg-wg-green text-white hover:underline rounded text-base mt-4 md:mt-0"
              onClick={logOut}
            >
              Sign Out
              <ArrowRightIcon className="w-4 h-4 ml-1" />
            </button>
            </div>
          ) : (
            <Link href="/login">
              <button className="inline-flex items-center bg-wg-blue border-0 py-1 px-3 focus:outline-none hover:bg-wg-green text-white hover:underline rounded text-base mt-4 md:mt-0">
                Log In
                <ArrowRightIcon className="w-4 h-4 ml-1" />
              </button>
            </Link>
          )}
        </div>
        <div className="flex items-center justify-center flex-grow">
          <div className="w-32 h-32 bg-white rounded-full flex-shrink-0 flex items-center justify-center mr-10">
            <Link href="/">
              <Image
                src="/Weight-Gym-5.png"
                alt="Logo"
                width={130}
                height={130}
                className="rounded-full"
              />
            </Link>
          </div>
          <div className="menu-div text-center">
            <Link href="/">
              <h1 className="text-6xl font-monoton text-wg-green">
                Weight&nbsp;&nbsp;Gym!
              </h1>
              <h2 className="font-monoton text-xl text-wg-green">
                Less&nbsp;
                Thinkin&apos;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;More&nbsp;
                Healthin&apos;
              </h2>
            </Link>
            <nav
              className={` flex flex-wrap items-center text-base justify-center ${
                isMenuOpen ? "block" : "hidden md:flex"
              }`}
            >
              <Link
                href="/"
                className="mr-5 text-xl text-white hover:underline focus:outline-none md:border-r md:border-gray-700  md:ml-4 md:py-1 md:pl-4 pr-5"
              >
                Home
              </Link>
              <a
                target="_blank"
                href="https://www.teepublic.com/user/weightgym"
                rel="noopener noreferrer"
                className="mr-5 text-xl text-white hover:underline focus:outline-none md:border-r md:border-gray-700 pr-5"
              >
                Shop
              </a>
              <Link
                href="/blog"
                className="mr-5 text-xl text-white hover:underline focus:outline-none md:border-r md:border-gray-700 pr-5"
              >
                Blog
              </Link>
              <Link
                href="/contact"
                className="mr-5 text-xl text-white hover:underline focus:outline-none  md:border-gray-700"
              >
                Contact
              </Link>
              {userCtx.isLoggedIn && (
                <Link
                  href="/account"
                  className="mr-5 text-xl text-white hover:underline focus:outline-none  md:border-l pl-5 md:border-gray-700"
                >
                  Account
                </Link>
              )}
              <div className="flex items-center pl-5">
                <a
                  href="https://www.facebook.com/WeightGymInc/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mr-2"
                >
                  <FacebookIcon className="w-6 h-6 text-white hover:text-blue-500" />
                </a>
                <a
                  href="https://twitter.com/Weight_Gym_Inc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mr-2"
                >
                  <TwitterIcon className="w-6 h-6 text-white hover:text-blue-400" />
                </a>
                <a
                  href="https://www.instagram.com/weightgyminc/"
                  rel="noopener noreferrer"
                >
                  <InstagramIcon className="w-6 h-6 text-white hover:text-pink-500" />
                </a>
              </div>
            </nav>
          </div>
        </div>
        <button
          className="inline-block md:hidden ml-auto outline-none focus:outline-none"
          onClick={toggleMenu}
        >
          {isMenuOpen ? (
            <XMarkIcon className="w-6 h-6 text-white" />
          ) : (
            <Bars3Icon className="w-6 h-6 text-white" />
          )}
        </button>
      </div>
    </header>
  );
};

export default Navbar;
