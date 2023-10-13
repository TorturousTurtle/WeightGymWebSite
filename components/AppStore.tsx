import Image from "next/image";

const AppStore = () => {
  return (
    <div className="bg-[url('/app_store_bg.jpg')] bg-cover min-h-1/3 flex flex-col items-center w-full">
      <h1 className="text-white text-4xl m-10">Now available on the App Store!</h1>
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
      <div className="w-full sm:w-1/2 m-10">
        <p className="text-white break-words">
          Weight Gym is for people that want a no-frills way to track their workouts. Create custom workouts on the fly or schedule them ahead of time for specific days. Choose from hundreds of exercises or add your own. Track your personal stats to always know what you need to beat. We believe you shouldn&apos;t be spending most of the time trying to record your stats, so we created an app to make it as easy as possible so that you can do Less Thinkin&apos; and More Healthin!
        </p>
      </div>
      <span aria-label="Image by kjpargeter on Freepik" />
    </div>
  );
};

export default AppStore;


