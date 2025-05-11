import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './Calendar.css';

const CalendarComponent = ({ todos, onAddTodo, onDeleteTodo, onEditTodo, onClearTodos }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [newTodo, setNewTodo] = useState('');
  const [editingTodo, setEditingTodo] = useState(null);

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      onAddTodo({
        id: Date.now(),
        text: newTodo,
        date: selectedDate,
        completed: false
      });
      setNewTodo('');
    }
  };

  const handleEditTodo = (todo) => {
    setEditingTodo(todo);
    setNewTodo(todo.text);
  };

  const handleUpdateTodo = () => {
    if (editingTodo && newTodo.trim()) {
      onEditTodo({
        ...editingTodo,
        text: newTodo
      });
      setEditingTodo(null);
      setNewTodo('');
    }
  };

  const getTodosForDate = (date) => {
    return todos.filter(todo => 
      new Date(todo.date).toDateString() === date.toDateString()
    );
  };

  return (
    <div className="calendar-container">
      <div className="calendar-section">
        <Calendar
          onChange={handleDateClick}
          value={selectedDate}
          className="calendar"
        />
      </div>
      
      <div className="todo-section">
        <h3>Todos for {selectedDate.toDateString()}</h3>
        <div className="todo-input">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add a new todo"
          />
          {editingTodo ? (
            <button onClick={handleUpdateTodo}>Update</button>
          ) : (
            <button onClick={handleAddTodo}>Add</button>
          )}
        </div>
        
        <div className="todo-list">
          {getTodosForDate(selectedDate).map(todo => (
            <div key={todo.id} className="todo-item">
              <span>{todo.text}</span>
              <div className="todo-actions">
                <button onClick={() => handleEditTodo(todo)}>Edit</button>
                <button onClick={() => onDeleteTodo(todo.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
        
        {getTodosForDate(selectedDate).length > 0 && (
          <button 
            className="clear-button"
            onClick={() => onClearTodos(selectedDate)}
          >
            Clear All
          </button>
        )}
      </div>
    </div>
  );
};

export default CalendarComponent; 