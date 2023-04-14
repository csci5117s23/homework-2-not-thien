import Link from "next/link";
import { useState, useEffect } from "react";
import {
  useAuth,
} from "@clerk/nextjs";
import { useRouter } from "next/router";

function ToDoItemPage() {
  const router = useRouter();
  const [task, setTask] = useState(null);
  const [isChecked, setIsChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const {id} = router.query;
  const { isLoaded, userId, sessionId, getToken } = useAuth();
  const backend_base = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

  const getTask = async (id) => {
    const token = await getToken({ template: "codehooks" });

    // Send the form data to our forms API on Vercel and get a response.
    const response = await fetch(backend_base + "/todoItem/" + id, {
      'method': "GET",
      'headers': { 'Authorization': "Bearer " + token},
    });
    const data = await response.json();

    setTask(data);
    setIsLoading(false);
  };

  useEffect(() => {
    getTask(id);
  }, [isLoaded]);

  function handleCheck(event) {
    console.log("🚀 ~ file: [id].js:35 ~ handleCheck ~ handleCheck hit!");
    event.preventDefault();
    // setIsChecked(true);
    // taskDone(id);
  }

    return (
      <div>
        {isLoading && <p>Loading...</p>}
        {!isLoading && <>
        <textarea value={task.task} />
        <input name="checkDone" id="checkDone" type="checkbox" checked={isChecked} onChange={handleCheck} />
        <button onclick="saveText()">Save</button>
        <label htmlFor="checkDone">Completed?</label>
        <Link href={`/todos/`}>Click here to go back!</Link>
        </>}
      </div>
    );
  }
  
 
  export default ToDoItemPage;
  