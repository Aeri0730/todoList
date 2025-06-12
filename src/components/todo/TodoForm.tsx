'use client'; 

import React from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';


const TodoForm: React.FC = () => {

  return (
    <form className="flex flex-col sm:flex-row gap-3 mb-6 w-full">
      <Input
        type="text"
        placeholder="새로운 투두를 입력하세요..."
        className="flex-grow p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-base"
      />
      <Button
        type="submit"
        className="bg-blue-600 text-white px-5 py-3 rounded-lg font-semibold shadow-md hover:bg-blue-700 transition-colors duration-200 text-base"
      >
        투두 추가
      </Button>
    </form>
  );
};

export default TodoForm;
