import React from "react";
import { useRef, useState } from "react";
import { useRouter } from "next/router";
import { v4 as uuidv4 } from "uuid";
import { ToastContainer, toast } from "react-toastify";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db } from "@/firebase/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import "react-toastify/dist/ReactToastify.css";

const NewBlog = () => {
  const titleTextInputRef = useRef<HTMLInputElement>(null);
  const messageTextInputRef = useRef<HTMLTextAreaElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const storage = getStorage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const title = titleTextInputRef.current?.value || "";
    const content = messageTextInputRef.current?.value || "";
    const date = new Date().toString();
    const id = uuidv4().toString();
    let image = null;

    // Check if an image file is selected
    if (imageInputRef.current?.files && imageInputRef.current.files[0]) {
      const imageFile = imageInputRef.current.files[0];
      const imageRef = ref(storage, `blogs/${id}/${imageFile.name}`);

      try {
        const snapshot = await uploadBytes(imageRef, imageFile);
        image = await getDownloadURL(snapshot.ref);
      } catch (error) {
        console.error("Error uploading image to Firebase Storage:", error);
      }
    }
    const newBlog = {
      id: id,
      title: title,
      date: date,
      image: image,
      content: content,
    };
    try {
      const blogsCollectionRef = collection(db, "blogs");
      await addDoc(blogsCollectionRef, newBlog);
      toast.success("Blog successfully added!");
      setTimeout(() => {
        router.push("/blog");
      }, 3000);
    } catch (error) {
      console.error("Error uploading blog to database:", error);
    }
  };

  return (
    <div className="flex flex-col h-screen items-center pb-10">
      <h1 className="text-6xl font-monoton text-wg-green text-center m-8">
        New&nbsp;&nbsp;Blog&nbsp;&nbsp;Entry
      </h1>
      <form
        className="bg-gray-200 p-6 mt-6 rounded-lg w-1/2"
        onSubmit={handleSubmit}
      >
        <div className="w-1/2 mb-4">
          <label htmlFor="f-title" className="text-gray-700">
            Blog Title:
          </label>
          <input
            id="f-title"
            type="text"
            name="title"
            ref={titleTextInputRef}
            required
            className="block w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring focus:ring-wg-green focus:border-wg-green text-gray-900"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="message" className="text-gray-700">
            Blog Body:
          </label>
          <textarea
            id="message"
            name="message"
            rows={20}
            ref={messageTextInputRef}
            required
            className="block w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring focus:ring-wg-green focus:border-wg-green text-gray-900"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="image" className="text-gray-700">
            Upload Image (optional):
          </label>
          <input
            id="image"
            type="file"
            name="image"
            ref={imageInputRef}
            accept="image/*"
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
  );
};

export default NewBlog;
