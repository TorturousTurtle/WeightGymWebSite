import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { Blog } from "../../interfaces/blog-interface";
import { BlogProps } from "../../interfaces/blog-props-interface";
import { imageArray } from "../../utilities/image-array";
import { db } from "@/firebase/firebaseConfig";
import { collection, query, getDocs, orderBy, limit, where } from "firebase/firestore";
import Image from "next/image";
import Head from "next/head";
import { GetServerSidePropsContext } from "next";

const formatDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", options);
};

const BlogsPage: React.FC<BlogProps> = (props) => {
  const [blog, setBlog] = useState<Blog | undefined>(undefined);
  const [createdAt, setCreatedAt] = useState<string>("");
  const [url, setUrl] = useState<string>(imageArray[Math.floor(Math.random() * imageArray.length)]);
  const [contentBody, setContentBody] = useState<string>("<p>Content not found...</p>");
  const [winWidth, setWindWidth] = useState<number>(800);
  const [winHeight, setWindHeight] = useState<number>(200);
  const width: number = winWidth > 700 ? winWidth * 0.2 : winWidth * 0.8;
  const height: number = winHeight * 0.1;
  const router = useRouter();

  // grab blog id from database
  const blogId = router.query.blogId;

  useEffect(() => {
    const foundBlog = props.blog;
    const initialDateString = foundBlog ? foundBlog.date.toString() : "";
    const formattedDate = foundBlog ? formatDate(initialDateString) : "";
    const plainTextContent = foundBlog ? foundBlog.content : "Content not found...";
    const htmlContent = plainTextContent.replace(/\n/g, "<br>");

    // Handle empty content or null image
    if (!foundBlog || !htmlContent) {
      setBlog(foundBlog);
      setCreatedAt(formattedDate);
      setContentBody("Content not found...");
      return;
    }
    if(foundBlog.image !== null) setUrl(foundBlog.image);
    setBlog(foundBlog);
    setCreatedAt(formattedDate);
    setContentBody(htmlContent);
    setWindWidth(window.innerWidth);
    setWindHeight(window.innerHeight);
  }, [blogId, props.blog, winHeight, winWidth]);

  return (
    <>
    <Head>
      <title>Weight Gym! - {blog ? blog.title : "Some Blog Here"}</title>
      <meta name="description" content='Weight Gym! blog entry' />
    </Head>
    <div className="flex flex-col bg-white items-center p-10">
      <div className="w-full m-5">
        <h1 className="text-gray-900 text-4xl md:text-6xl font-bold text-center">
          {blog ? blog.title : "Some Blog Here"}
        </h1>
        <h1 className="text-gray-900 text-xl text-center">{createdAt}</h1>
      </div>
      <Image
        src={url}
        alt="Blog Image"
        width={width}
        height={height}
      />
      <div className="w-full md:w-1/2 mt-10">
      <p className="text-gray-900 break-words m-0 md:m-10 text-justify" dangerouslySetInnerHTML={{ __html: contentBody }}></p>
      </div>
    </div>
    </>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { params } = context;

  if (!params || typeof params.blogId !== 'string') {
    return {
      notFound: true,
    };
  }

  const { blogId } = params;
  const blogQuery = query(collection(db, 'blogs'), where('id', '==', blogId));
  const querySnapshot = await getDocs(blogQuery);

  if (querySnapshot.empty) {
    return {
      notFound: true,
    };
  }

  const blogData = querySnapshot.docs[0].data() as Blog;
  
  return {
    props: {
      blog: blogData,
    },
  };
}

export default BlogsPage;