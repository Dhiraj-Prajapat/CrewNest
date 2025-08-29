"use client";

import React from "react";
import { Task } from "../types/task";
import { formatDate } from "../utils/formatDate";
import { cn } from "@/lib/utils";

interface TaskCardProps {
  task: Task;
  onClick?: () => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task, onClick }) => {
  const dueDateText = task.dueDate
    ? formatDate(new Date(task.dueDate))
    : "No due date";

  return (
    <div
      className={cn(
        "border rounded-lg p-4 cursor-pointer space-y-2",
        task.priority === "High"
          ? "border-red-500"
          : task.priority === "Medium"
          ? "border-yellow-500"
          : "border-green-500"
      )}
      onClick={onClick}
    >
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">{task.title}</h3>
        <span className="text-xs text-muted-foreground">
          {task.priority} Priority
        </span>
      </div>

      {task.description && (
        <p className="text-sm text-muted-foreground">{task.description}</p>
      )}

      <div className="text-xs text-muted-foreground">
        Due: {dueDateText}
      </div>

      {task.assignedTo && (
        <div className="text-xs text-muted-foreground">
          Assigned to: {task.assignedTo}
        </div>
      )}

      {/* ✅ Subtasks */}
      {task.subtasks && task.subtasks.length > 0 && (
        <div className="pt-2">
          <p className="text-xs font-medium text-muted-foreground mb-1">
            Subtasks:
          </p>
          <ul className="list-disc list-inside space-y-1 text-sm">
            {task.subtasks.map((subtask, index) => (
              <li key={index}>{subtask}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
