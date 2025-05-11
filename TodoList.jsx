import React, { useState } from "react";
import "./TodoList.css";

function TodoInput() {
  const [todos, setTodos] = useState([]);
  const [todoName, setTodoName] = useState("");
  const [todoDescription, setTodoDescription] = useState(""); //
  const [idCounter, setIdCounter] = useState(0); //

  const handleTodoName = (e) => {
    setTodoName(e.target.value);
  };

  const handleTodoDescription = (e) => {
    setTodoDescription(e.target.value); // 
  };

  const saveTodo = (e) => {
    e.preventDefault();
    const newTodo = {
      id: idCounter,
      todoName,
      todoDescription,
      done: false, // Initialize todo as not done
    };
    setTodos((prevTodos) => [...prevTodos, newTodo]);
    setIdCounter(idCounter + 1); //
    setTodoName(""); // Clear input after saving todo
    setTodoDescription(""); // Clear textarea after saving todo
  };

  const deleteTodo = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const editTodo = (id, newTodoName) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, todoName: newTodoName };
        }
        return todo;
      })
    );
  };

  const toggleDone = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, done: !todo.done };
        }
        return todo;
      })
    );
  };

  return (
    <div>
      <form>
        <label htmlFor="">Todo Name</label>
        <input
          type="text"
          name="todoName"
          value={todoName}
          onChange={handleTodoName}
        />
        <label htmlFor="">Todo Description</label>
        <textarea
          name="description"
          value={todoDescription}
          onChange={handleTodoDescription}
        ></textarea>{" "}
        <button onClick={saveTodo}>Add Todo</button>
      </form>
      <h1>List of ToDos</h1>
      <ul>
        {todos.map((todo) => (
          <li
            key={todo.id}
            style={{ textDecoration: todo.done ? "line-through" : "none" }}
          >
            {todo.todoName}
            <button onClick={() => deleteTodo(todo.id)}>DELETE</button>
            <button
              onClick={() =>
                editTodo(todo.id, prompt("Enter edited todo name:"))
              }
            >
              EDIT
            </button>
            <button onClick={() => toggleDone(todo.id)}>
              {todo.done ? "UNDONE" : "DONE"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoInput;
