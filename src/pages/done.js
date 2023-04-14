import Link from "next/link";
import TodoList from "./TodoList.js";
import { useState, useEffect } from "react";
import {
  useAuth,
} from "@clerk/nextjs";

export default function done() {
  const { isLoaded, userId, sessionId, getToken } = useAuth();
  const [loading, setLoading] = useState(true);
  const [doneTasks, setDoneTasks] = useState([]);
  const backend_base = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

  const getTodos = async () => {
    if (userId) {
      const token = await getToken({ template: "codehooks" });
      const result = await fetch(backend_base + "/todoItem", {
        'method': "GET",
        'headers': { 'Authorization': "Bearer " + token }, // use the token.
      });
      const data = await result.json();
      console.log("🚀 ~ file: done.js:22 ~ getTodos ~ data:", data)

      // will need to filter out the done tasks here
      const filteredData = data.filter(item => item.done === true);
      console.log("🚀 ~ file: done.js:26 ~ getTodos ~ filteredData:", filteredData)
      setDoneTasks(filteredData);
      setLoading(false);
    }
  };

  useEffect(() => {
    getTodos();
  }, [isLoaded]);

  return (
    <div>
    <h2>
        <Link href="/todos">Go to todos</Link>
      </h2>
      {loading && <p>Loading...</p>}
      {!loading && <TodoList tasks={doneTasks} />}
    </div>
  )
}
