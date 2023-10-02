import { useRouter } from "next/router";
import { blogs } from "../../test-data/test-blogs";
import React, { useState, useEffect } from "react";
import { Blog } from "../../interfaces/blog-interface";
import { BlogProps } from "../../interfaces/blog-props-interface";
import { imageArray } from "../../utilities/image-array";
import Image from "next/image";

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
  const width: number = winWidth * 0.2;
  const height: number = winHeight * 0.1;
  const router = useRouter();

  // grab blog id from database
  const blogId = router.query.blogId;

  useEffect(() => {
    const foundBlog = props.blogs.find((x) => x.id === blogId);
    const initialDateString = foundBlog ? foundBlog.date.toString() : "";
    const formattedDate = foundBlog ? formatDate(initialDateString) : "";
    const htmlContent = foundBlog ? foundBlog.content : "Content not found...";

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
  }, [blogId, props.blogs, winHeight, winWidth]);

  return (
    <div className="flex flex-col bg-white items-center p-10">
      <div className="w-full m-5">
        <h1 className="text-gray-900 text-6xl font-bold text-center">
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
      <div className="w-1/2">
      <p className="text-gray-900 break-words m-10" dangerouslySetInnerHTML={{ __html: contentBody }}></p>
      </div>
    </div>
  );
};

// specify the paths that should be generated at build time
export async function getStaticPaths() {
  const paths = blogs.map((blog) => ({
    params: { blogId: blog.id },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps() {
  // make api call and populate blogs variable here
  const blogList = blogs;
  return {
    props: {
      blogs: blogList,
    },
  };
}

export default BlogsPage;
