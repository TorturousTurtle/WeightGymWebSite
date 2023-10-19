"use client";
import Image from "next/image";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="body-font md:border-t md:border-wg-green">
      <div className="flex flex-row justify-center items-center">
      <Image
          src="/Weight-Gym-5.png"
          alt="Logo"
          width={75}
          height={75}
          className="sm:flex rounded-full mt-5 hidden"
        />
        <div className="flex flex-col justify-center items-center">
      <div className="container px-5 pt-5 mx-auto flex items-center justify-center sm:flex-row flex-col">
        <p className="text-sm text-gray-500 sm:ml-2 sm:pl-4 sm:py-2 sm:mt-0 mt-4">
          © 2023 Weight Gym! —
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
        </p>
      </div>
      <Link href={"/tos"}>
        <p className="text-blue-900">Terms & Conditions</p>
      </Link>
      <Link href={"/privacypolicy"}>
        <p className="text-blue-900">Privacy Policy</p>
      </Link>
      </div>
      </div>
    </footer>
  );
};

export default Footer;
