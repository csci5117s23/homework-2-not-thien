import Link from 'next/link';
import AddTodo from './AddTodo.js';
import TodoList from './TodoList.js';

export default function Todos() {
    const todoItems = [{id: 0, task: "task 1"},{id: 1, task: "task 2"}, {id: 2, task: "task 3"}];
  return (
    <>
      <h1>To Do List</h1>
      <h2>
        <Link href="/done">Go to done</Link>
      </h2>
      <AddTodo />
      <TodoList tasks={todoItems} />
      
    </>
  );
}