"use client";

import { useState } from "react";
import { TaskList } from "./components/TaskList";
import { FilterBar } from "./components/FilterBar";
import { TaskForm } from "./components/TaskForm";
import { Button } from "@/components/ui/button";

export const TaskBoard = () => {
  const [showForm, setShowForm] = useState(false);

  return (
<<<<<<< HEAD
    <div className="h-[calc(100vh-40px)] flex flex-col p-4 w-full mx-auto overflow-hidden">
      <div className="flex justify-between items-center mb-4 shrink-0">
=======
    <div className="space-y-4 p-4 max-w-full mx-auto">
      <div className="flex justify-between items-center">
>>>>>>> 98ce06dff3c1969d0a6a99826e3efe4921540848
        <h2 className="text-2xl font-bold">Task Board</h2>
        <Button
          onClick={() => setShowForm(!showForm)}
          aria-label={showForm ? "Cancel new task form" : "Create new task"}
        >
          {showForm ? "Cancel" : "New Task"}
        </Button>
      </div>

<<<<<<< HEAD
      <div className="flex-1 overflow-y-auto space-y-4 pr-2">
        {showForm && <div className="mb-4"><TaskForm onSuccess={() => setShowForm(false)} /></div>}

        <FilterBar />
        <TaskList />
      </div>
=======
      {showForm && <TaskForm />}
      
      <FilterBar />
      <TaskList />

>>>>>>> 98ce06dff3c1969d0a6a99826e3efe4921540848
    </div>
  );
};
