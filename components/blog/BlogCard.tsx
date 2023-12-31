import React, { useEffect, useState } from "react";
import { Blog } from "@/interfaces/blog-interface";
import { imageArray } from "../../utilities/image-array";
import Image from "next/image";
import Link from "next/link";

const BlogCard: React.FC<Blog> = (props) => {
  const url: string =
    props.index === 0
      ? "/Weight-Gym-Logo.webp"
      : props.image === null
      ? imageArray[Math.floor(Math.random() * imageArray.length)]
      : props.image;
  const date = new Date(props.date);

  return (
    <div className="bg-white rounded-md w-full h-[400px] p-5 flex flex-col overflow-hidden">
    <Link href={"/blog/" + props.id} className="flex flex-col justify-between h-full">
        <div className="flex justify-center mb-auto relative h-2/3 w-full">
            <Image
                src={url}
                alt={props.title}
                width={400} 
                height={400}
                className="rounded-md border-2 shadow-md object-cover object-center w-full h-auto p-4" 
            />
        </div>
        <div className="flex flex-col items-center mt-auto">
            <h1 className="text-gray-900 text-2xl md:text-3xl lg-text-4xl font-bold text-center">
                {props.title}
            </h1>
            <p className="text-gray-900  text-center">
                Published: {date.toLocaleDateString()}
            </p>
        </div>
    </Link>
</div>
  );
};

export default BlogCard;
