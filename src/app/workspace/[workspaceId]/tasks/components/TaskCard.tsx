"use client";

import React from "react";
import { Task } from "../types/task";
import { formatDate } from "../utils/formatDate";
import { cn } from "@/lib/utils";
<<<<<<< HEAD
import { Check, MoreHorizontal, Trash, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { useMutation } from "convex/react";
import { api } from "@/../convex/_generated/api";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useCurrentUser } from "@/features/auth/api/use-current-user";
=======
>>>>>>> 98ce06dff3c1969d0a6a99826e3efe4921540848

interface TaskCardProps {
  task: Task;
  onClick?: () => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task, onClick }) => {
<<<<<<< HEAD
  const updateTask = useMutation(api.tasks.update);
  const removeTask = useMutation(api.tasks.remove);

  const { data: currentUser } = useCurrentUser();
  const isCreator = currentUser?._id === task.createdBy;

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await removeTask({ id: task._id });
      toast.success("Task deleted");
    } catch (error) {
      toast.error("Failed to delete task");
    }
  };

  const handleToggleComplete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await updateTask({ id: task._id, completed: !task.completed });
      toast.success(task.completed ? "Task marked active" : "Task completed");
    } catch (error) {
      toast.error("Failed to update task");
    }
  };

  const handleChangePriority = async (newPriority: "low" | "medium" | "high") => {
    try {
      await updateTask({ id: task._id, priority: newPriority });
      toast.success("Priority updated");
    } catch (error) {
      toast.error("Failed to update priority");
    }
  };

=======
>>>>>>> 98ce06dff3c1969d0a6a99826e3efe4921540848
  const dueDateText = task.dueDate
    ? formatDate(new Date(task.dueDate))
    : "No due date";

  return (
    <div
      className={cn(
<<<<<<< HEAD
        "border rounded-lg p-4 bg-card hover:bg-accent/50 transition-colors cursor-pointer space-y-3 relative group",
        task.completed && "opacity-60 bg-muted/50",
        task.priority === "high"
          ? "border-l-4 border-l-red-500"
          : task.priority === "medium"
            ? "border-l-4 border-l-yellow-500"
            : "border-l-4 border-l-green-500"
      )}
      onClick={onClick}
    >
      {/* Header */}
      <div className="flex justify-between items-start gap-2">
        <div className="flex items-center gap-2">
          <button
            onClick={handleToggleComplete}
            className={cn(
              "h-5 w-5 rounded-full border flex items-center justify-center transition-colors",
              task.completed ? "bg-primary border-primary text-primary-foreground" : "border-muted-foreground hover:bg-muted"
            )}
          >
            {task.completed && <Check className="h-3 w-3" />}
          </button>
          <h3 className={cn("font-semibold leading-none", task.completed && "line-through text-muted-foreground")}>
            {task.title}
          </h3>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
            <Button variant="ghost" size="icon" className="h-6 w-6 -mt-1 -mr-1">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={handleToggleComplete}>
              {task.completed ? "Mark Active" : "Mark Complete"}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuLabel>Priority</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => handleChangePriority("high")}>
              Set High
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleChangePriority("medium")}>
              Set Medium
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleChangePriority("low")}>
              Set Low
            </DropdownMenuItem>

            {isCreator && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleDelete} className="text-destructive">
                  <Trash className="h-4 w-4 mr-2" />
                  Delete
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Description */}
      {task.description && (
        <p className="text-sm text-muted-foreground line-clamp-2 pl-7">{task.description}</p>
      )}

      {/* Subtasks Preview */}
      {task.subtasks && task.subtasks.length > 0 && (
        <div className="pl-7">
          <div className="text-xs text-muted-foreground">
            {task.subtasks.length} subtask{task.subtasks.length !== 1 ? 's' : ''}
          </div>
        </div>
      )}

      {/* Footer Info */}
      <div className="flex items-center justify-between pt-2 pl-7 text-xs text-muted-foreground">
        <div className="flex items-center gap-2">
          <span>{dueDateText}</span>
        </div>

        {task.assignedToUser && (
          <div className="flex items-center gap-1.5" title={`Assigned to ${task.assignedToUser.name}`}>
            <Avatar className="h-5 w-5">
              <AvatarImage src={task.assignedToUser.image} />
              <AvatarFallback>{task.assignedToUser.name?.charAt(0)}</AvatarFallback>
            </Avatar>
            <span>{task.assignedToUser.name}</span>
          </div>
        )}
      </div>
=======
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
>>>>>>> 98ce06dff3c1969d0a6a99826e3efe4921540848
    </div>
  );
};
