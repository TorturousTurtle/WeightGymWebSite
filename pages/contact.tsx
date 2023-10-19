import React from "react";
import { useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Head from "next/head";

const Contact = () => {
  const nameTextInputRef = useRef<HTMLInputElement>(null);
  const emailTextInputRef = useRef<HTMLInputElement>(null);
  const messageTextInputRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const name = nameTextInputRef.current?.value;
    const email = emailTextInputRef.current?.value;
    const message = messageTextInputRef.current?.value;
    axios
      .post("/api/contact-form", {
        name: name,
        email: email,
        message: message,
      })
      .then((res) => {
        if (res.status === 200) {
          toast.success("Message sent!");
        } else {
          toast.error("Message couldn't be sent!");
        }
      })
      .catch((err) => {
        console.log("Error trying to send form", err);
      });
  };

  return (
    <>
    <Head>
      <title>Weight Gym! - Contact Us</title>
      <meta name="description" content='Contact us for any fitness related questions or just to tell us how much fun you are having' />
    </Head>
    <div className="flex flex-col h-screen items-center pb-10 pl-5 pr-5 md:pl-0 md:pr-0">
      <h1 className="text-4xl md:text-6xl font-monoton text-wg-green text-center m-8">
        Contact&nbsp;&nbsp;Us
      </h1>
      <h1 className="text-4xl text-white text-center font-bold">
        How Can We Help You?
      </h1>
      <form
        className="bg-gray-200 p-6 mt-6 rounded-lg w-full md:w-1/2"
        onSubmit={handleSubmit}
      >
        <div className="w-full md:w-1/2 mb-4">
          <label htmlFor="f-name" className="text-gray-700">
            Name:
          </label>
          <input
            id="f-name"
            type="text"
            name="name"
            ref={nameTextInputRef}
            required
            className="block w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring focus:ring-wg-green focus:border-wg-green text-gray-900"
          />
        </div>
        <div className="w-full md:w-1/2 mb-4">
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
        <div className="mb-4">
          <label htmlFor="message" className="text-gray-700">
            Message:
          </label>
          <textarea
            id="message"
            name="message"
            rows={6}
            ref={messageTextInputRef}
            required
            className="block w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring focus:ring-wg-green focus:border-wg-green text-gray-900"
          />
        </div>
        <div className="flex text-center justify-end w-full">
          <button
            type="submit"
            className="bg-wg-green text-white py-2 px-4 mr-5 rounded-lg hover:bg-opacity-80 focus:outline-none focus:ring focus:ring-wg-green"
          >
            Submit
          </button>
        </div>
        <p className="text-gray-700">*All fields are required</p>
      </form>
      <ToastContainer />
    </div>
    </>
  );
};

export default Contact;
