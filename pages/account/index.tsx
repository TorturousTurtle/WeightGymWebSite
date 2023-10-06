import { UserContext } from "@/store/user-context";
import Head from "next/head";
import { useContext } from "react";
const Account = () => {
  const {userData} = useContext(UserContext);
    return (
      <>
      <Head>
        <title>Weight Gym! - Account Page</title>
        <meta
          name="description"
          content="Track your workouts, see your progress, and get ready to get shreddy!"
        />
      </Head>
      <h1>The Account Page coming soon!</h1>
      </>
    )
  }
  
  export default Account;