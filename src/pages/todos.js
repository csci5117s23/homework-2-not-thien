import Link from "next/link";
import AddTodo from "./AddTodo.js";
import TodoList from "./TodoList.js";
import { useState, useEffect } from "react";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useAuth,
} from "@clerk/nextjs";

export default function Todos() {
  // const todoItems = [{id: 0, task: "task 1"},{id: 1, task: "task 2"}, {id: 2, task: "task 3"}];
  const [todoItems, setTodoItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isLoaded, userId, sessionId, getToken } = useAuth();
  const backend_base = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

  const postTodo = async (description) => {
    const JSONdata = { task: description };
    const token = await getToken({ template: "codehooks" });
    // const API_KEY = "9c1a133c-ef43-43e4-aa40-3055e9c139e4";
    // const API_ENDPOINT = "https://5117hw2-03kx.api.codehooks.io/dev/todoItem";

    // Send the form data to our forms API on Vercel and get a response.
    const response = await fetch(backend_base + "/todoItem", {
      'method': "POST",
      'headers': { 'Authorization': "Bearer " + token,
      'Content-Type': 'application/json'},
      'body': JSON.stringify(JSONdata),
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

  // Get todo items on mount & logged in
  useEffect(() => {
    const getTodos = async () => {
      if (userId) {
        const token = await getToken({ template: "codehooks" });
        const result = await fetch(backend_base + "/todoItem", {
          'method': "GET",
          'headers': { 'Authorization': "Bearer " + token }, // use the token.
        });
        const data = await result.json();
        setTodoItems(data);
        setLoading(false);
      }
    };
    getTodos();
  }, [isLoaded]);

  return (
    <>
      <UserButton />
      <h1>To Do List</h1>
      <h2>
        <Link href="/done">Go to done</Link>
      </h2>
      <AddTodo onAdd={postTodo} />
      {loading && <p>Loading...</p>}
      {!loading && <TodoList tasks={todoItems} />}
    </>
  );
}
