'use client';

import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createTodo } from '@/lib/api';
import { Input } from "@/components/ui/input"; // Shadcn Input
import { Button } from "@/components/ui/button"; // Shadcn Button

const TodoForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const queryClient = useQueryClient();

  const createTodoMutation = useMutation({
    mutationFn: createTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      setTitle('');
    },
    onError: (error: Error) => {
      alert(`투두 생성 실패: ${error.message}`);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      createTodoMutation.mutate(title);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 mb-6 w-full">
      <Input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="새로운 투두를 입력하세요..."
        className="flex-grow p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-base"
        disabled={createTodoMutation.isPending}
      />
      <Button
        type="submit"
        className="px-5 py-3 rounded-lg font-semibold shadow-md text-base
                   disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={createTodoMutation.isPending}
      >
        {createTodoMutation.isPending ? '추가 중...' : '투두 추가'}
      </Button>
    </form>
  );
};

export default TodoForm;
