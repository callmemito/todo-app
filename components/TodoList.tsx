"use client";

import { useState } from "react";
import { Todo } from "@/types/todo";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { TodoItem } from "./TodoItem";
import styles from "./TodoList.module.css";

export function TodoList() {
  const [todos, setTodos, isLoaded] = useLocalStorage<Todo[]>("todos", []);
  const [newTodoText, setNewTodoText] = useState("");

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodoText.trim()) return;

    const newTodo: Todo = {
      id: crypto.randomUUID(),
      text: newTodoText.trim(),
      completed: false,
      createdAt: Date.now(),
    };

    setTodos([...todos, newTodo]);
    setNewTodoText("");
  };

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const completedCount = todos.filter((todo) => todo.completed).length;
  const totalCount = todos.length;

  if (!isLoaded) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <form onSubmit={addTodo} className={styles.form}>
        <input
          type="text"
          value={newTodoText}
          onChange={(e) => setNewTodoText(e.target.value)}
          placeholder="Add a new todo..."
          className={styles.input}
        />
        <button type="submit" className={styles.addButton}>
          Add
        </button>
      </form>

      {todos.length > 0 && (
        <div className={styles.stats}>
          {completedCount} / {totalCount} completed
        </div>
      )}

      <ul className={styles.list}>
        {todos.length === 0 ? (
          <p className={styles.empty}>No todos yet. Add one above!</p>
        ) : (
          todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
            />
          ))
        )}
      </ul>
    </div>
  );
}
