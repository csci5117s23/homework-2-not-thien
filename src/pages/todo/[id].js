import Link from "next/link";
import { useState, useEffect } from "react";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/router";

function ToDoItemPage() {
  const router = useRouter();
  const [task, setTask] = useState(null);
  const [isChecked, setIsChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [newTask, setNewTask] = useState("");
  const { id } = router.query;
  const { isLoaded, userId, sessionId, getToken } = useAuth();
  const backend_base = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

  const getTask = async (id) => {
    const token = await getToken({ template: "codehooks" });

    // Send the form data to our forms API on Vercel and get a response.
    const response = await fetch(backend_base + "/todoItem/" + id, {
      method: "GET",
      headers: { Authorization: "Bearer " + token },
    })
      .then((response) =>
        response.json().then((data) => {
          setTask(data);
          setNewTask(data.task);
        })
      )
      .catch((error) => console.log(error));
    setIsLoading(false);
  };

  useEffect(() => {
    getTask(id);
  }, [isLoaded]);

  function handleCheck(event) {
    console.log("🚀 ~ file: [id].js:35 ~ handleCheck ~ handleCheck hit!");
    event.preventDefault();
    setIsChecked(true);
    taskDone(id);
  }

  const taskDone = async (taskId) => {
    try {
      const JSONdata = { done: true };
      const token = await getToken({ template: "codehooks" });

      // Send the form data to our forms API on Vercel and get a response.
      const response = await fetch(backend_base + "/todoItem/" + taskId, {
        method: "PATCH",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(JSONdata),
      });
      const data = await response.json();
      console.log("🚀 ~ file: [id].js:54 ~ taskDone ~ data:", data);
    } catch (error) {
      console.log("🚀 ~ file: [id].js:57 ~ taskDone ~ error:", error);
    }
  };

  function handleButton(event) {
    console.log("🚀 ~ file: [id].js:61 ~ handleButton ~ event:", event);
    event.preventDefault();
    updateTask(id);
  }

  const updateTask = async (taskId) => {
    try {
      const JSONdata = { task: newTask };
      const token = await getToken({ template: "codehooks" });

      // Send the form data to our forms API on Vercel and get a response.
      const response = await fetch(backend_base + "/todoItem/" + taskId, {
        method: "PATCH",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(JSONdata),
      });
      const data = await response.json();
      console.log("🚀 ~ file: [id].js:80 ~ updateTask ~ data:", data);
    } catch (error) {
      console.log("🚀 ~ file: [id].js:81 ~ updateTask ~ error:", error);
    }
  };

  return (
    <>
      {isLoading && (
        <div className="center">
          <h1>Loading...</h1>
        </div>
      )}
      {!isLoading && (
        <>
          <div className="center">
            <Link href={`/todos/`} className="hover">
              Click here to go back!
            </Link>
          </div>
          <div className="center">
            <textarea
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              disabled={isChecked}
              className="textarea"
            />
          </div>
          <div className="center">
            <button onClick={handleButton} disabled={isChecked}>
              Save
            </button>
          </div>
          <div className="center">
            <input
              name="checkDone"
              id="checkDone"
              type="checkbox"
              checked={isChecked}
              disabled={isChecked}
              onChange={handleCheck}
            />
            <label htmlFor="checkDone">Completed?</label>
          </div>
        </>
      )}
    </>
  );
}

export default ToDoItemPage;
