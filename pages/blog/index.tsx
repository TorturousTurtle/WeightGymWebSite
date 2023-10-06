import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../../store/user-context";
import { useRouter } from "next/router";
import { db } from "@/firebase/firebaseConfig";
import { collection, query, getDocs, orderBy, limit } from "firebase/firestore";
import { FaPlus } from "react-icons/fa";
import { Blog } from "../../interfaces/blog-interface";
import { BlogProps } from "../../interfaces/blog-props-interface";
import BlogCard from "../../components/blog/BlogCard";
import Head from "next/head";

const Blog: React.FC<BlogProps> = (props) => {
  const [blogList, setBlogList] = useState<Blog[] | undefined>(undefined);
  const { isLoggedIn, userData } = useContext(UserContext);
  const router = useRouter();

  const handleNewBlogClick = () => {
    router.push("blog/new-blog");
  };

  useEffect(() => {
    setBlogList(props.blogs);
  }, [props.blogs]);

  return (
    <>
    <Head>
      <title>Weight Gym! - Blogs</title>
      <meta name="description" content='Check out Weight Gyms! blog page to get advice on how to keep your workouts effective but still fun' />
    </Head>
    <div className="flex flex-col p-10">
      <h1 className="font-monoton text-6xl text-wg-green text-center">
        The&nbsp;&nbsp;Blog&nbsp;&nbsp;Page
      </h1>
      <div className="flex flex-wrap justify-center items-center">
        {blogList?.map((blog, index) => (
          <div
            className={`w-full ${
              index === 0 ? "md:w-full" : "md:w-1/5"
            }  mt-10 mx-16 flex justify-center`}
            key={blog.id}
          >
            <BlogCard
              title={blog.title}
              image={blog.image}
              id={blog.id}
              date={blog.date}
              content={blog.content}
              index={index}
            />
          </div>
        ))}
      </div>
      {/* TODO: - change isLoggedIn to userData.role === "Administrator" */}
      {isLoggedIn && (
        <button
          onClick={handleNewBlogClick}
          className="fixed top-60 right-20 p-4 bg-wg-green text-white rounded-full hover:bg-wg-blue transition duration-300"
        >
          <FaPlus className="text-4xl" />
        </button>
      )}
    </div>
    </>
  );
};

// function that runs before page is rendered for retrieving blogs from database. any code in this function will not get
// run on the client side.
export async function getStaticProps() {
  // TODO: make call to images storage bucket and map to each blog
  const q = query(collection(db, "blogs"), orderBy("date", "desc"), limit(10));
  const querySnapshot = await getDocs(q);
  let blogList: Blog[] = [];

  querySnapshot.forEach((doc) => {
    const userData = doc.data() as Blog;
    blogList.push(userData);
  });
  return {
    props: {
      blogs: blogList,
    },
  };
} 

export default Blog;
