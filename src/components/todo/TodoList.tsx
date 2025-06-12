'use client';

import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getTodos } from '@/lib/api';
import { Todo, TodoFilter } from '@/types';
import TodoItem from './TodoItem';
import FilterTabs from './FilterTabs';

const TodoList: React.FC = () => {
  const [filter, setFilter] = useState<TodoFilter>(TodoFilter.ALL);

  const { data: todos, isLoading, isError, error } = useQuery<Todo[], Error>({
    queryKey: ['todos', filter],
    queryFn: () => getTodos(filter),
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-48">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <p className="ml-4 text-lg text-gray-600">투두 목록 로딩 중...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center p-8 bg-red-100 border border-red-400 text-red-700 rounded-lg">
        <p className="font-semibold text-xl mb-2">오류 발생!</p>
        <p>투두 목록을 불러오는 데 실패했습니다: {error?.message || '알 수 없는 오류'}</p>
        <p className="mt-2 text-sm">잠시 후 다시 시도해 주세요.</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <FilterTabs currentFilter={filter} onFilterChange={setFilter} />
      {todos && todos.length > 0 ? (
        <ul className="space-y-3">
          {todos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </ul>
      ) : (
        <p className="text-center text-lg text-gray-500 mt-8">
          {filter === TodoFilter.ALL && '아직 투두가 없네요! 새 투두를 추가해보세요.'}
          {filter === TodoFilter.ACTIVE && '모든 진행 중인 투두를 완료했어요! 🎉'}
          {filter === TodoFilter.COMPLETED && '완료된 투두가 없습니다.'}
        </p>
      )}
    </div>
  );
};

export default TodoList;
