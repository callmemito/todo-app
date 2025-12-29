import { TodoList } from "@/components/TodoList";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>TODO App</h1>
      <TodoList />
    </main>
  );
}
