import React from "react";
import { useRef, useContext } from "react";
import { useRouter } from "next/router";
import { v4 as uuidv4 } from "uuid";
import { ToastContainer, toast } from "react-toastify";
import AddBlog from "@/components/blog/AddBlog";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { UserContext } from "@/store/user-context";
import "react-toastify/dist/ReactToastify.css";
import Head from "next/head";
import axios from "axios";

const NewBlog = () => {
  const titleTextInputRef = useRef<HTMLInputElement>(null);
  const messageTextInputRef = useRef<HTMLTextAreaElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const { userAuth } = useContext(UserContext);
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

    axios
      .post("/api/add-blog", {
        id: id,
        title: title,
        date: date,
        image: image,
        content: content,
        user: userAuth,
      })
      .then((res) => {
        if (res.status === 200) {
          toast.success("Blog successfully added!");
          setTimeout(() => {
            router.push("/blog");
          }, 2500);
        } else {
          toast.error("Error uploading blog to database!");
        }
      })
      .catch((err) => {
        console.error("Error uploading blog to database:", err);
      });
  };

  return (
    <>
      <Head>
        <title>Weight Gym! - Add Blog</title>
        <meta name="description" content="Add new blog here" />
      </Head>
      <div className="flex flex-col h-screen items-center pb-10">
        <h1 className="text-6xl font-monoton text-wg-green text-center m-8">
          New&nbsp;&nbsp;Blog&nbsp;&nbsp;Entry
        </h1>
        <AddBlog
          titleTextInputRef={titleTextInputRef}
          messageTextInputRef={messageTextInputRef}
          imageInputRef={imageInputRef}
          handleSubmit={handleSubmit}
        />
        <ToastContainer />
      </div>
    </>
  );
};

export default NewBlog;
