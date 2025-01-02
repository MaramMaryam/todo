// app/login/page.js
"use client"; // This component should be a client component
import { signIn, useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { json } from "stream/consumers";

type Todo = {
  _id: string;
  text: string | null;
  completed: boolean;
};

export default function Todo() {
  const [isLoading, setLoading] = useState(true);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodoText, setNewTodoText] = useState<string>("");
  const [editTodo, setEditTodo] = useState<Todo | null>(null);

  // const cookieStore = await cookies(); // Get all cookies
  // const token = cookieStore.get("next-auth.session-token")?.value;
  // // const tokens = await getToken(); // Retrieve the auth token

  // if (!token) {
  //   redirect("/login"); // Redirect to login if token is invalid or not present
  // }
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
  // const verifiedToken = await verifyToken(token); // Verify the JWT

  // // Check if verification was successful
  // if (!verifiedToken) {
  //   router.push("/login"); // Redirect if token is invalid
  // }
  // || !(await verifyToken(token))

  // if (!token || !(await verifyToken(token))) {
  //   redirect('/login'); // Redirect to login if token is invalid or not present
  // useEffect(() => {
  //   if (!isAuthenticated()) {
  //     router.push('/login'); // Redirect to login if not authenticated
  //   }
  // }, []);

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
    console.log("data", data);
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
  const toggleTodo = async (id: string, completed: boolean) => {
    const response = await fetch("/api/todo", {
      method: "PUT",
      body: JSON.stringify({ id, completed: !completed }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status === 200) {
      setTodos(
        todos.map((todo: Todo) =>
          todo._id === id ? { ...todo, completed: !completed } : todo
        )
      );
    }
  };
  return (
    <>
      <div className="grid place-items-center w-full lg:place-items-start text-purple-500 min-h-screen">
        <div className="flex lg:flex-row flex-col gap-5 lg:justify-start justify-center lg:items-start items-center w-full mx-auto">
          <div className="sm:w-9/12 lg:w-6/12 w-full px-4 lg:my-10 flex flex-col justify-center items-center">
            <h1 className="text-4xl py-8 lg:py-0 lg:pt-4 text-purple-500">
              My Tasks
            </h1>
            <h1 className="text-3xl py-8 lg:py-0 lg:pt-4 lg:pb-14 text-orange-500">
              To Do List
            </h1>
            {/***********edit todo */}
            {editTodo ? (
              <>
                <input
                  className="w-full lg:w-8/12 border bg-gray-900 border-orange-300 py-4 text-lg rounded-lg text-purple-300"
                  type="text"
                  value={editTodo.text!}
                  onChange={(e) =>
                    setEditTodo({ ...editTodo, text: e.currentTarget.value })
                  }
                />
                <button
                  onClick={handleSave}
                  className="bg-slate-800 border px-5 py-2 rounded-lg my-8 text-green-400 text-lg font-semibold"
                >
                  save
                </button>
              </>
            ) : (
              // {/***********add todo */}
              <>
                <input
                  className="w-full lg:w-8/12 border bg-gray-900 border-purple-300 px-2 py-4 text-lg rounded-lg text-purple-300"
                  type="text"
                  placeholder="write here ..."
                  value={newTodoText}
                  onChange={(e) => setNewTodoText(e.currentTarget.value)}
                />
                <button
                  onClick={addTodo}
                  className="bg-slate-800 border px-5 py-2 rounded-lg my-8 text-green-400 text-lg font-semibold"
                >
                  Add Todo
                </button>
              </>
            )}
          </div>
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
                          onChange={() => toggleTodo(todo._id, todo.completed)}
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
        </div>
      </div>
    </>
  );
}
