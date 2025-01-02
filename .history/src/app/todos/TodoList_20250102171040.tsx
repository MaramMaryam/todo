export default function TodoList() {
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
