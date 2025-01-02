// TodoList.tsx
import React from 'react';
import { Todo } from './type';
import TodoItem from './TodoItem';

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: string, completed: boolean, text: string) => void;
  onEdit: (todo: Todo) => void;
  onDelete: (id: string) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, onToggle, onEdit, onDelete }) => {
  return (
    <ul className="sm:w-9/12  w-full px-4 flex flex-col justify-center items-center my-5 py-5">
      {todos.length === 0 ? (
        <div className="text-pink-500 text-xl italic my-6">There is Nothing</div>
      ) : (
        todos.map((todo) => (
          <TodoItem key={todo._id} todo={todo} onToggle={onToggle} onEdit={onEdit} onDelete={onDelete} />
        ))
      )}
    </ul>
  );
};

export default TodoList;
