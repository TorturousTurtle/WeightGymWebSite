import Card from "./Card";

const Latest = () => {
  return (
    <div className="bg-white w-full items-center mt-5">
      <h1 className="text-black text-5xl text-center pt-5 font-bold">
        Our Latest and Greatest
      </h1>
      <div className="container mx-auto flex flex-col md:space-y-0 md:flex-row md:justify-center md:space-x-5 my-20">
        <Card
          src="/Weight_Gym_OG_Tee.png"
          alt="Weight Gym! OG Tee T-Shirt"
          title="Weight Gym! OG Tee T-Shirt"
          description="Our original Tee! Take your workouts seriously, not yourself!"
          url="https://www.teepublic.com/t-shirt/2159198-weight-gym-og-tee?store_id=142346"
        />
        <Card
          src="/Weight_Gym_MusclePotomas.png"
          alt="Weight Gym! Musclepotomas Tee"
          title="Weight Gym! Musclepotomas Tee"
          description="Unlock your inner hippo of mass destruction!"
          url="https://www.teepublic.com/t-shirt/24831141-musclepotomas-weight-gym?store_id=142346"
        />
        <Card
          src="/Weight Gym! Logo T-Shirt.png"
          alt="Weight Gym! Logo T-Shirt"
          title="Weight Gym! Logo T-Shirt"
          description="Weight Gym! products are for people who love the gym, love grunting and sweating and being loud, and love to just have fun. It&apos;s for those who look at the gym as a time of less thinkin&apos;, and more healthin&apos;!"
          url="https://www.teepublic.com/t-shirt/2203074-weight-gym-logo?store_id=142346"
        />
      </div>
    </div>
  );
};

export default Latest;
