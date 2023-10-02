import Link from "next/link";

const FAQ = () => {
  return (
    <div className="flex flex-col bg-white items-center h-screen">
      <br />
      <h1 className="text-xl text-gray-900">The FAQ Page</h1>
      <p className="text-gray-900">Coming soon...</p>
      <Link href={"/tos"}>
        <p className="text-blue-900">Terms & Conditions</p>
      </Link>
      <Link href={"/privacypolicy"}>
        <p className="text-blue-900">Privacy Policy</p>
      </Link>
    </div>
  );
};

export default FAQ;
