import React, { useState } from "react";

export default function AddToDo({ onAdd }) {
  const [inputValue, setInputValue] = useState("");

  function handleInputChange(event) {
    setInputValue(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (inputValue.trim()) {
      onAdd(inputValue);
      setInputValue("");
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <textarea
          type="text"
          placeholder="Enter a new to-do item"
          value={inputValue}
          onChange={handleInputChange}
          className="textarea"
        />
        <div>
          <button type="submit">Add</button>
        </div>
      </form>
    </div>
  );
}
