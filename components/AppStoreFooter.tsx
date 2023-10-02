import Image from "next/image";

const AppStoreFooter = () => {
  return (
    <div className="flex justify-center items-center w-full">
        <h1 className="text-white text-2xl m-10">Download our app on the App Store!</h1>
        <a
          target="_blank"
          href="https://apps.apple.com/us/app/weight-gym/id1616243681?platform=iphone"
          rel="noopener noreferrer"
        >
          <Image
            src="/app_store_dl_logo"
            alt="App Store Button"
            width={200}
            height={130}
          />
        </a>
    </div>
  );
};

export default AppStoreFooter;
