"use client";

import { useState } from "react";
import { TaskList } from "./components/TaskList";
import { FilterBar } from "./components/FilterBar";
import { TaskForm } from "./components/TaskForm";
import { Button } from "@/components/ui/button";

export const TaskBoard = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="space-y-4 p-4 max-w-3xl mx-auto">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Task Board</h2>
        <Button
          onClick={() => setShowForm(!showForm)}
          aria-label={showForm ? "Cancel new task form" : "Create new task"}
        >
          {showForm ? "Cancel" : "New Task"}
        </Button>
      </div>

      {showForm && <TaskForm onSuccess={() => setShowForm(false)} />}
      
      <FilterBar />
      <TaskList />
    </div>
  );
};
