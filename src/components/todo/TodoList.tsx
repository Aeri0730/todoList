"use client";

import React, { useState } from "react";
import { Todo, TodoFilter } from "@/types";
import TodoItem from "./TodoItem";
import FilterTabs from "./FilterTabs";

const TodoList: React.FC = () => {
  const [filter, setFilter] = useState<TodoFilter>(TodoFilter.ALL);
  const dummyTodos: Todo[] = [
    {
      id: "ui-1",
      title: "UI만 확인하기",
      completed: false,
      createdAt: Date.now(),
    },
    {
      id: "ui-2",
      title: "디자인 레이아웃 보기",
      completed: true,
      createdAt: Date.now() - 1000,
    },
    {
      id: "ui-3",
      title: "반응형 확인",
      completed: false,
      createdAt: Date.now() - 2000,
    },
  ];

  return (
    <div className="w-full" >
      <FilterTabs currentFilter={filter} onFilterChange={setFilter} />
      {dummyTodos && dummyTodos.length > 0 ? (
        <ul className="space-y-3" >
          {dummyTodos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </ul>
      ) : (
        <p className="text-center text-lg text-gray-500 mt-8">
          {filter === TodoFilter.ALL &&
            "아직 투두가 없네요! 새 투두를 추가해보세요."}
          {filter === TodoFilter.ACTIVE &&
            "모든 진행 중인 투두를 완료했어요! 🎉"}
          {filter === TodoFilter.COMPLETED && "완료된 투두가 없습니다."}
        </p>
      )}
    </div>
  );
};

export default TodoList;
