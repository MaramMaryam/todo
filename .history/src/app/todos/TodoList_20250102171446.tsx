"use client";

import { useEffect, useState } from "react";
import { Todo } from "./type";
import { redirect, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";


export default function TodoList() {
      const [isLoading, setLoading] = useState(true);
      const [todos, setTodos] = useState<Todo[]>([]);
      const [newTodoText, setNewTodoText] = useState<string>("");
      const [editTodo, setEditTodo] = useState<Todo | null>(null);
      const { data: session, status } = useSession(); // Get session data
        const router = useRouter();
      
        useEffect(() => {
          if (status === "loading") return; // Wait for loading state
          if (!session) {
            redirect("/login"); // Redirect to login if not authenticated
          }
        }, [session, status, router]);
        useEffect(() => {
          fetch("/api/todo")
            .then((res) => res.json())
            .then((data) => {
              setTodos(data);
              setLoading(false);
            });
        }, []);
        const toggleTodo = async (id: string, completed: boolean, text: string) => {
            const response = await fetch("/api/todo", {
              method: "PUT",
              body: JSON.stringify({ id, completed: !completed, text }),
              headers: {
                "Content-Type": "application/json",
              },
            });
            if (response.status === 200) {
              setTodos(
                todos.map((todo: Todo) =>
                  todo._id === id
                    ? { ...todo, text: todo.text, completed: !completed }
                    : todo
                )
              );
            }
          };
          const handleEdit = (todo: Todo) => {
            setEditTodo(todo);
          };
        
          const handleSave = async () => {
            if (!editTodo) return;
            const response = await fetch("/api/todo", {
              method: "PUT",
              body: JSON.stringify({
                id: editTodo._id,
                text: editTodo.text,
                completed: editTodo.completed,
              }),
              headers: {
                "Content-Type": "application/json",
              },
            });
            if (response.status === 200) {
              setTodos(
                todos.map((todo: Todo) =>
                  todo._id === editTodo._id ? { ...todo, text: editTodo.text } : todo
                )
              );
              setEditTodo(null);
            }
          };
          const handleDelete = async (id: string) => {
            const response = await fetch("/api/todo", {
              method: "DELETE",
              body: JSON.stringify({ id }),
              headers: {
                "Content-Type": "application/json",
              },
            });
            if (response.status === 200) {
              setTodos(todos.filter((todo: Todo) => todo._id !== id));
            }
          };
  return (
    <>
      <ul className="sm:w-9/12 lg:w-5/12 w-full px-4 flex flex-col justify-center items-center my-5 py-5">
        {isLoading && (
          <p className="text-pink-500 text-xl italic my-6"> Loading...</p>
        )}
        {!isLoading && todos && todos.length == 0 ? (
          <div className="text-pink-500 text-xl italic my-6">
            {" "}
            There is No thing{" "}
          </div>
        ) : (
          <>
            {!isLoading &&
              todos &&
              todos.map((todo: Todo) => (
                <li
                  key={todo._id}
                  className="bg-slate-900 p-6 rounded-lg my-2 hover:text-green-400 w-full text-lg flex justify-between items-start"
                >
                  <div className="flex justify-start items-start w-8/12">
                    <input
                      checked={todo.completed}
                      onChange={() =>
                        toggleTodo(todo._id, todo.completed, todo.text!)
                      }
                      type="checkbox"
                      className="w-5 h-5 cursor-pointer mt-1"
                    />
                    <span
                      className={`${
                        todo.completed ? "line-through" : "list-none"
                      } px-2 w-full text-orange-400`}
                    >
                      {todo.text}
                    </span>
                  </div>
                  <div className="w-4/12 md:w-3/12">
                    <button
                      onClick={() => handleEdit(todo)}
                      className="text-sky-400 md:text-base text-sm px-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(todo._id)}
                      className="text-pink-400 md:text-base text-sm px-2"
                    >
                      Del
                    </button>
                  </div>
                </li>
              ))}
          </>
        )}
      </ul>
    </>
  );
}
