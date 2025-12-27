"use client";

import React, { useState } from "react";
import { useTasks } from "../hooks/useTasks";
import { TaskCard } from "./TaskCard";
import { TaskForm } from "./TaskForm";
import type { Task } from "../types/task";

export const TaskList = () => {
  const { tasks } = useTasks();
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  if (!tasks.length) {
    return (
      <div className="text-center text-muted-foreground py-10">
        No tasks to display.
      </div>
    );
  }

  return (
    <div className="space-y-3 px-2">
      {tasks.map((task) => (
        <TaskCard
          key={task._id}
          task={task}
          onClick={() => setSelectedTask(task)}
        />
      ))}

      {selectedTask && (
        <TaskForm task={selectedTask} onSuccess={() => setSelectedTask(null)} />
      )}
    </div>
  );
};
