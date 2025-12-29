import { TodoListWrapper } from "@/components/TodoListWrapper";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>TODO App</h1>
      <TodoListWrapper />
    </main>
  );
}
