import React from "react";
import Image from "next/image";

type ProductImage = {
    url: string,
    src: string,
    alt: string,
    title: string,
    description: string
}

const imageStyle = {
  borderRadius: "2%",
  border: "1px solid",
};

const Card: React.FC<ProductImage> = (props) => {
  return (
    <div className="flex flex-col w-full items-center">
      <a target="_blank" href={props.url} rel="noopener noreferrer">
        <Image
          src={props.src}
          alt={props.alt}
          width={400}
          height={100}
          style={imageStyle}
        />
      </a>
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-3 text-center">
          {props.title}
        </h1>
        <p className="text-gray-900 max-w-95 break-words m-5">
          {props.description}
        </p>
      </div>
    </div>
  );
};

export default Card;
