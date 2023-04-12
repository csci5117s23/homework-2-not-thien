import React from 'react'
import Link from 'next/link'

export default function TodoItem({ todo }) {
  const task = todo.task;
  const id = todo.id;
  const done = todo.done;

  return (
      <div>
        <p>{task}</p>
        <input name="checkDone" id="checkDone" type="checkbox" />
        <label htmlFor="checkDone">Completed?</label>
        <Link href={`/todo/${id}`}>here is the link</Link>
    </div>
  )
}
