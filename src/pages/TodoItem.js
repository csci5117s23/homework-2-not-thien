import React, { useState } from "react";
import Link from "next/link";

export default function TodoItem({ todo, key, taskDone }) {
  const [isChecked, setIsChecked] = useState(false);

  const task = todo.task;
  const id = todo._id;
  const done = todo.done;

  function handleCheck(event) {
    event.preventDefault();
    setIsChecked(true);
    taskDone(id);
  }

  return (
    <div className="card">
      <h2>{task}</h2>
      <div>
        {taskDone && (
          <>
            <input
              name="checkDone"
              id="checkDone"
              type="checkbox"
              checked={isChecked}
              onChange={handleCheck}
            />
            <label htmlFor="checkDone">Completed?</label>
            <div>
              <span>
                <Link href={`/todo/${id}`} className="hover">
                  Click me to edit
                </Link>
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
