'use client';

import React from 'react';
import { Todo } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateTodoStatus, deleteTodo } from '@/lib/api';

interface TodoItemProps {
  todo: Todo;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const queryClient = useQueryClient();

  const updateTodoMutation = useMutation({
    mutationFn: (newCompleted: boolean) => updateTodoStatus(todo.id, newCompleted),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
    onError: (error: Error) => {
      alert(`상태 업데이트 실패: ${error.message}`);
    },
  });

  const deleteTodoMutation = useMutation({
    mutationFn: () => deleteTodo(todo.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
    onError: (error: Error) => {
      alert(`삭제 실패: ${error.message}`);
    },
  });

  const handleToggleCompleted = () => {
    updateTodoMutation.mutate(!todo.completed);
  };

  const handleDelete = () => {
    if (confirm('정말로 이 투두를 삭제하시겠습니까?')) {
      deleteTodoMutation.mutate();
    }
  };

  return (
    <li
      className={`
        flex items-center justify-between p-4 bg-white rounded-lg shadow-sm mb-3 transition-all duration-200
        ${todo.completed ? 'opacity-70 line-through text-gray-500' : 'opacity-100 text-gray-800'}
        ${updateTodoMutation.isPending || deleteTodoMutation.isPending ? 'animate-pulse' : ''}
      `}
    >
      <div className="flex items-center flex-grow mr-4">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={handleToggleCompleted}
          className="form-checkbox h-5 w-5 text-blue-600 rounded-md focus:ring-blue-500 cursor-pointer mr-3"
          disabled={updateTodoMutation.isPending || deleteTodoMutation.isPending}
          aria-label={`${todo.title} 완료 여부`}
        />
        <span className="text-lg break-all">
          {todo.title}
        </span>
      </div>
      <button
        onClick={handleDelete}
        className="text-red-500 hover:text-red-700 p-2 rounded-full transition-colors duration-200
                   disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={deleteTodoMutation.isPending || updateTodoMutation.isPending}
        aria-label={`${todo.title} 삭제`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.147-2.006-2.201L14.772 4H9.258C8.118 4 7 4.939 7 6.061v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
          />
        </svg>
      </button>
    </li>
  );
};

export default TodoItem;
