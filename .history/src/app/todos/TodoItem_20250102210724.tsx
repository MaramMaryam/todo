// TodoItem.tsx
import React from 'react';
import { Todo } from './type';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string, completed: boolean, text: string) => void;
  onEdit: (todo: Todo) => void;
  onDelete: (id: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onEdit, onDelete }) => {
  return (
    <li className="bg-slate-900 p-6 rounded-lg my-2 hover:text-green-400 w-full text-lg flex justify-between items-start">
      <div className="flex justify-start items-start w-8/12">
        <input
          checked={todo.completed}
          onChange={() => onToggle(todo._id, todo.completed, todo.text!)}
          type="checkbox"
          className="w-5 h-5 cursor-pointer mt-1"
        />
        <span className={`${todo.completed ? "line-through" : "list-none"} px-2 w-full text-orange-400`}>
          {todo.text}
        </span>
      </div>
      <div className="w-4/12 md:w-3/12">
        <button onClick={() => onEdit(todo)} className="text-sky-400 md:text-base text-sm px-2">
        <i className="fas fa-plus text-blue-500" />sasdEdit</button>
        <button onClick={() => onDelete(todo._id)} className="text-pink-400 md:text-base text-sm px-2">Del</button>
      </div>
    </li>
  );
};

export default TodoItem;
