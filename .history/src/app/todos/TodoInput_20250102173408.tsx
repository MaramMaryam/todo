// TodoInput.tsx
import React from 'react';

interface TodoInputProps {
  newTodoText: string;
  setNewTodoText: (text: string) => void;
  editTodo: { text?: string } | null;
  setEditTodo: (todo: { text?: string } | null) => void;
  addTodo: () => Promise<void>;
  handleSave: () => Promise<void>;
}

const TodoInput: React.FC<TodoInputProps> = ({ newTodoText, setNewTodoText, editTodo, setEditTodo, addTodo, handleSave }) => {
  return (
    <>
      {editTodo ? (
        <>
          <input
            className="w-full lg:w-8/12 border bg-gray-900 border-orange-300 py-4 text-lg rounded-lg text-purple-300"
            type="text"
            value={editTodo.text!}
            onChange={(e) => setEditTodo({ ...editTodo, text: e.currentTarget.value })}
          />
          <button
            onClick={handleSave}
            className="bg-slate-800 border px-5 py-2 rounded-lg my-8 text-green-400 text-lg font-semibold"
          >
            Save
          </button>
        </>
      ) : (
        <>
          <Input
            className="w-full lg:w-8/12 border bg-gray-900 border-purple-300 px-2 py-4 text-lg rounded-lg text-purple-300"
            type="text"
            placeholder="Write here ..."
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
    </>
  );
};

export default TodoInput;
