"use client";

import dynamic from "next/dynamic";

const TodoList = dynamic(
  () => import("@/components/TodoList").then((mod) => mod.TodoList),
  {
    ssr: false,
    loading: () => (
      <div style={{ textAlign: "center", padding: "40px", color: "#6b7280" }}>
        Loading...
      </div>
    ),
  }
);

export function TodoListWrapper() {
  return <TodoList />;
}
