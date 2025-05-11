import React, { useState } from 'react';
import './App.css';
import CalendarComponent from './Calendar';
import Todo from './Todo/Todo';

function App() {
  const [todos, setTodos] = useState([]);

  const handleAddTodo = (todo) => {
    setTodos([...todos, todo]);
  };

  const handleDeleteTodo = (todoId) => {
    setTodos(todos.filter(todo => todo.id !== todoId));
  };

  const handleEditTodo = (updatedTodo) => {
    setTodos(todos.map(todo => 
      todo.id === updatedTodo.id ? updatedTodo : todo
    ));
  };

  const handleClearTodos = (date) => {
    setTodos(todos.filter(todo => 
      new Date(todo.date).toDateString() !== date.toDateString()
    ));
  };

  return (
    <div className="App">
      <h1>Todo Calendar</h1>
      <div className="app-container">
        <CalendarComponent 
          todos={todos}
          onAddTodo={handleAddTodo}
          onDeleteTodo={handleDeleteTodo}
          onEditTodo={handleEditTodo}
          onClearTodos={handleClearTodos}
        />
      </div>
    </div>
  );
}

export default App; 