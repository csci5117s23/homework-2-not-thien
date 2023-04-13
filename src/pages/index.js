import { useRouter } from "next/router";
import { useAuth, SignIn } from "@clerk/nextjs";
import styles from "@/styles/Home.module.css";
import { useEffect, useState } from "react";

export default function Home() {
  const { isLoaded, userId, sessioinId, getToken } = useAuth();

  const router = useRouter();

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const response = await fetch(API_ENDPOINT, {
  //       method: "GET",
  //       headers: { "x-apikey": API_KEY },
  //     });
  //     const data = await response.json();
  //     // update state -- configured earlier.
  //     setPosts(data);
  //     setLoading(false);
  //   };
  //   fetchData();
  // }, []);

  // useEffect(() => {
  //   if (!loading) {
  //     router.push("/todos");
  //   }
  // }, [loading]);

  if (!isLoaded || !userId) {
    return (
      <>
        <span>Welcome to Brazil.</span>
        <SignIn />
      </>
    );
  } else {
    router.push("/todos");
  }
}
