// Todos.tsx
"use client";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Todo } from "./type";
import TodoList from "./TodoList";
import TodoInput from "./TodoInput";
import Header from "./Header";
import Loading from "./Loading";

export default function Todos() {
  const [isLoading, setLoading] = useState(true);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodoText, setNewTodoText] = useState<string>("");
  const [editTodo, setEditTodo] = useState<Todo | any>();
  const [filter, setFilter] = useState<string>("All");

  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "loading") return; // Wait for loading state
    if (!session) {
      redirect("/login"); // Redirect to login if not authenticated
    }

    // Fetch todos when session is available
    fetch("/api/todo")
      .then((res) => res.json())
      .then((data) => {
        setTodos(data);
        setLoading(false);
      });
  }, [session, status]);

  const getFilteredTodos = () => {
    switch (filter) {
      case "Completed":
        return todos.filter((todo) => todo.completed);
      case "Active":
        return todos.filter((todo) => !todo.completed);
      default:
        // return todos; // Show all todos
    }
  };

  const addTodo = async () => {
    if (!newTodoText) return;

    const response = await fetch("/api/todo", {
      method: "POST",
      body: JSON.stringify({ text: newTodoText }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    setTodos([...todos, data]);
    setNewTodoText("");
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
        todos.map((todo) =>
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
      setTodos(todos.filter((todo) => todo._id !== id));
    }
  };

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
        todos.map((todo) =>
          todo._id === id ? { ...todo, completed: !completed } : todo
        )
      );
    }
  };

  return (
    <>
      <Header email={session?.user?.email} />

      <div className="grid place-items-center w-full lg:place-items-start text-purple-500 min-h-screen">
        <div className="flex lg:flex-row flex-col gap-5 lg:justify-start justify-center lg:items-start items-center w-full mx-auto">
          <div className="sm:w-9/12 lg:w-6/12 w-full px-4 lg:m-auto flex flex-col justify-center items-center">
            <h1 className="text-4xl py-1 lg:px-auto lg:m-auto">My Tasks</h1>
            <h1 className="text-3xl py-4 lg:px-auto lg:m-auto">To Do List</h1>

            {/* Input for adding/editing todos */}
            <TodoInput
              newTodoText={newTodoText}
              setNewTodoText={setNewTodoText}
              editTodo={editTodo}
              setEditTodo={setEditTodo}
              addTodo={addTodo}
              handleSave={handleSave}
            />
          </div>

          {/* List of Todos */}
          <div className="sm:w-9/12 lg:w-5/12 w-full px-4 flex flex-col justify-center items-center my-5 py-5">
            {isLoading && (
              <Loading />
            )}
            {!isLoading && todos && (
              <>
                {" "}
                <div className="flex justify-between gap-x-4 mt-0">
                  <button onClick={() => setFilter("All")}>All</button>
                  <button onClick={() => setFilter("Active")}>Active</button>
                  <button onClick={() => setFilter("Completed")}>
                    Completed
                  </button>
                </div>
                <TodoList
                  todos={getFilteredTodos()}
                  onToggle={toggleTodo}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
