import Link from 'next/link';
import AddTodo from './AddTodo.js';
import TodoList from './TodoList.js';
import { useState } from 'react';

export default function Todos() {
    // const todoItems = [{id: 0, task: "task 1"},{id: 1, task: "task 2"}, {id: 2, task: "task 3"}];
    const [todoItems, setTodoItems] = useState([]);
    const postTodo = async (description) => {
      const JSONdata = {"task": description};
      const API_KEY = "9c1a133c-ef43-43e4-aa40-3055e9c139e4";
      const API_ENDPOINT = "https://5117hw2-03kx.api.codehooks.io/dev/todoItem";

      // Send the form data to our forms API on Vercel and get a response.
      const response = await fetch(API_ENDPOINT, {
        'method':'POST',
        'headers': {'x-apikey': API_KEY,
                    'Content-Type': 'application/json'},
        'body': JSON.stringify(JSONdata)
      })
      const data = await response.json()
      const newID = data['_id'];

      var newItems = [...todoItems];
      const newItem = {
        id: newID,
        task: description
      };
      newItems.push(newItem);
      setTodoItems(newItems);
    }    

  return (
    <>
      <h1>To Do List</h1>
      <h2>
        <Link href="/done">Go to done</Link>
      </h2>
      <AddTodo onAdd={postTodo} />
      <TodoList tasks={todoItems} />
      
    </>
  );
}