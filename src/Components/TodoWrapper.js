import React, { useState } from 'react';
import TodoForm from './TodoForm';
import { v4 as uuidv4 } from "uuid";
import EditTodoForm from './EditTodoForm';
import Todo from './Todo';

function TodoWrapper() {
    const [todos, setTodos] = useState(JSON.parse(localStorage.getItem('todos')) || []);

    // Add Todo
    const addTodo = (todo) => {
        const newTodo = { id: uuidv4(), task: todo, completed: false, isEditing: false };
        setTodos([...todos, newTodo]);
        updateLocalStorage([...todos, newTodo]);
    }

    // Delete Todo
    const deleteTodo = (id) => {
        const updatedTodos = todos.filter(todo => todo.id !== id);
        setTodos(updatedTodos);
        updateLocalStorage(updatedTodos);
    }

    // Toggle Complete Todo
    const toggleComplete = (id) => {
        const updatedTodos = todos.map(todo => {
            if (todo.id === id) {
                return { ...todo, completed: !todo.completed };
            }
            return todo;
        });
        setTodos(updatedTodos);
        updateLocalStorage(updatedTodos);
    }

    // Edit Todo
    const editTodo = (id) => {
        const updatedTodos = todos.map(todo => {
            if (todo.id === id) {
                return { ...todo, isEditing: !todo.isEditing };
            }
            return todo;
        });
        setTodos(updatedTodos);
        updateLocalStorage(updatedTodos);
    }

    // Edit Task Todo
    const editTask = (task, id) => {
        const updatedTodos = todos.map(todo => {
            if (todo.id === id) {
                return { ...todo, task, isEditing: !todo.isEditing };
            }
            return todo;
        });
        setTodos(updatedTodos);
        updateLocalStorage(updatedTodos);
    }

    // Update local storage
    const updateLocalStorage = (todos) => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    return (
        <div className="TodoWrapper">
            <h1>Tasks for today!</h1>
            <TodoForm addTodo={addTodo} />

            {/* Display Todos */}
            {todos.map(todo => todo.isEditing ? (
                <EditTodoForm key={todo.id} editTodo={editTask} task={todo} />
            ) : (
                <Todo
                    key={todo.id}
                    task={todo}
                    deleteTodo={deleteTodo}
                    editTodo={editTodo}
                    toggleComplete={toggleComplete}
                />
            ))}
        </div>
    )
}

export default TodoWrapper;
