import React, { useEffect, useState } from "react";
import { Blog } from "../../interfaces/blog-interface";
import { imageArray } from "../../utilities/image-array";
import Image from "next/image";
import Link from "next/link";

const BlogCard: React.FC<Blog> = (props) => {
  const [winWidth, setWindWidth] = useState<number>(800);
  const url: string =
    props.index === 0 && props.image === null
      ? "/Weight-Gym-Logo.webp"
      : props.image === null
      ? imageArray[Math.floor(Math.random() * imageArray.length)]
      : props.image;
  const width: number = props.index === 0 ? winWidth * 0.6 : winWidth * 0.4;

  useEffect(() => {
    setWindWidth(window.innerWidth);
  }, []);

  return (
    <div className="bg-white rounded-md p-5">
      <Link href={"/blog/" + props.id}>
        <div className="flex flex-col justify-center items-center">
          <Image
            src={url}
            height={400}
            width={width}
            alt={props.title}
            className="rounded-md border-2  shadow-md p-4"
          />
          <h1 className="text-gray-900 text-4xl font-bold text-center mt-10">
            {props.title}
          </h1>
        </div>
      </Link>
    </div>
  );
};

export default BlogCard;
