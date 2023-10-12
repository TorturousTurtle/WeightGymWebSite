import Head from 'next/head';
import AppStore from "../components/AppStore";
import Latest from "../components/Latest";
import Origins from "../components/Origins";

const Home = () => {
  return (
    <div className='min-w-screen min-h-screen'>
    <Head>
      <title>Weight Gym! - Home</title>
      <meta name="description" content='Humorous workout clothes and advice to help you think less and health more, thats the Weight Gym! way' />
    </Head>
    <AppStore />
    <Latest />
    <Origins />
    </div>
  );
};

export default Home;
