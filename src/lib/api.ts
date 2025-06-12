"use server";

import { Todo, TodoFilter } from "@/types";

const JSON_SERVER_BASE_URL = "http://localhost:3000/todos";

export async function getTodos(
  filter: TodoFilter = TodoFilter.ALL
): Promise<Todo[]> {
  let url = JSON_SERVER_BASE_URL;
  if (filter === TodoFilter.ACTIVE) {
    url += "?completed=false";
  } else if (filter === TodoFilter.COMPLETED) {
    url += "?completed=true";
  }

  const response = await fetch(url, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch todos: ${response.statusText}`);
  }
  const todos: Todo[] = await response.json();
  return todos.sort((a, b) => b.createdAt - a.createdAt);
}

export async function createTodo(title: string): Promise<Todo> {
  if (!title.trim()) {
    throw new Error("투두 내용은 비워둘 수 없습니다.");
  }

  const newTodo: Omit<Todo, "id"> = {
    title,
    completed: false,
    createdAt: Date.now(),
  };

  const response = await fetch(JSON_SERVER_BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newTodo),
  });

  if (!response.ok) {
    throw new Error(`Failed to create todo: ${response.statusText}`);
  }
  return response.json();
}

export async function updateTodoStatus(
  id: string,
  completed: boolean
): Promise<Todo> {
  const response = await fetch(`${JSON_SERVER_BASE_URL}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ completed }),
  });

  if (!response.ok) {
    throw new Error(`Failed to update todo status: ${response.statusText}`);
  }
  return response.json();
}

export async function deleteTodo(id: string): Promise<void> {
  const response = await fetch(`${JSON_SERVER_BASE_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error(`Failed to delete todo: ${response.statusText}`);
  }
}
