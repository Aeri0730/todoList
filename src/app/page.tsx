import React from "react";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { getTodos } from "@/lib/api";
import { TodoFilter } from "@/types";
import TodoForm from "@/components/todo/TodoForm";
import TodoList from "@/components/todo/TodoList";


export default async function HomePage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["todos", TodoFilter.ALL],
    queryFn: () => getTodos(TodoFilter.ALL),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <div className="w-full max-w-2xl bg-white p-6 sm:p-8 rounded-xl shadow-2xl">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-center text-blue-800 mb-8 tracking-tight">
          나의 투두 리스트 📝
        </h1>
        <TodoForm />
        <TodoList />
      </div>
    </HydrationBoundary>
  );
}
