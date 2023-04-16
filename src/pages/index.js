import { useRouter } from "next/router";
import { useAuth, SignIn } from "@clerk/nextjs";
// import styles from "../styles/Home.module.css";

export default function Home() {
  const { isLoaded, userId, sessioinId, getToken } = useAuth();

  const router = useRouter();

  if (!isLoaded || !userId) {
    return (
      <div className="main">
        <span>Welcome to Brazil. Here's a to-do app with minimal CSS.</span>
        <SignIn />
      </div>
    );
  } else {
    router.push("/todos");
  }
}
