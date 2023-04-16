import Link from "next/link";
import AddTodo from "./AddTodo.js";
import TodoList from "./TodoList.js";
import { useState, useEffect } from "react";
import { UserButton, useAuth } from "@clerk/nextjs";

export default function Todos() {
  const [todoItems, setTodoItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [changed, setChanged] = useState(false);
  const { isLoaded, userId, sessionId, getToken } = useAuth();
  const backend_base = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

  const getTodos = async () => {
    if (userId) {
      const token = await getToken({ template: "codehooks" });
      const result = await fetch(backend_base + "/todoItem", {
        method: "GET",
        headers: { Authorization: "Bearer " + token }, // use the token.
      });
      const data = await result.json();

      // will need to filter out the done tasks here
      const filteredData = data.filter((item) => item.done === false);

      setTodoItems(filteredData);
      setLoading(false);
    }
  };

  const postTodo = async (description) => {
    const JSONdata = { task: description };
    const token = await getToken({ template: "codehooks" });

    // Send the form data to our forms API on Vercel and get a response.
    const response = await fetch(backend_base + "/todoItem", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(JSONdata),
    });
    const data = await response.json();
    const newID = data["_id"];

    var newItems = [...todoItems];
    const newItem = {
      id: newID,
      task: description,
    };
    newItems.push(newItem);
    setTodoItems(newItems);
  };

  const taskDone = async (taskId) => {
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
    setChanged(true);
  };

  // Get todo items on mount & logged in, or when checkbox ix checked
  // React says this is unnecessary, but I'm not sure how to trigger code reload when "done" is set to true
  useEffect(() => {
    getTodos();
    setChanged(false);
  }, [isLoaded, changed]);

  return (
    <>
      <UserButton />
      <div>
        <div className="center">
          <h1>To Do List</h1>
        </div>
        <div className="center">
          <Link href="/done" className="hover">
            <h2>Go to done</h2>
          </Link>
        </div>
        <div className="center">
          <AddTodo onAdd={postTodo} />
        </div>
        {loading && (
          <div className="center">
            <p>Loading...</p>
          </div>
        )}
        {!loading && (
          <>
            <div className="center grid">
              <TodoList tasks={todoItems} handleCheck={taskDone} />
            </div>
          </>
        )}
      </div>
    </>
  );
}
