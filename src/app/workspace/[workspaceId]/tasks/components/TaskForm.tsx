"use client";

import React, { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { useParams } from "next/navigation";
import { Id } from "@/../convex/_generated/dataModel";
import { api } from "@/../convex/_generated/api";

import { Task } from "../types/task";
import { toast } from "sonner";
import { useCurrentUser } from "@/features/auth/api/useCurrentUser";

interface TaskFormProps {
  task?: Task;
  onSuccess?: () => void;
}

export const TaskForm: React.FC<TaskFormProps> = ({ task, onSuccess }) => {
  const params = useParams();
  const workspaceId = params?.workspaceId as string | undefined;

  const { data: user, isLoading: isUserLoading } = useCurrentUser();

  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");
  const [priority, setPriority] = useState<"low" | "medium" | "high">(
    task?.priority || "medium"
  );
  const [dueDate, setDueDate] = useState(task?.dueDate || "");
  const [assignedTo, setAssignedTo] = useState<Id<"users"> | "">(
    task?.assignedTo || ""
  );

  const [subtasks, setSubtasks] = useState<string[]>(task?.subtasks || []);
  const [newSubtask, setNewSubtask] = useState("");

  const createTask = useMutation(api.tasks.create);
  const updateTask = useMutation(api.tasks.update);

  // Fetch members safely
  const members = useQuery(api.members.get, workspaceId ? { workspaceId: workspaceId as Id<"workspaces"> } : "skip");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) return;
    if (!workspaceId) {
      console.error("Missing workspaceId from URL");
      return;
    }
    if (!user?._id) {
      console.error("User is not logged in");
      return;
    }

    try {
      if (task?._id) {
        await updateTask({
          id: task._id as Id<"tasks">,
          title,
          description,
          priority,
          dueDate,
          assignedTo: assignedTo || undefined,
          subtasks,
        });
        toast.success("Task updated");
      } else {
        await createTask({
          title,
          description,
          priority,
          dueDate,
          assignedTo: assignedTo || undefined,
          subtasks,
          workspaceId: workspaceId as Id<"workspaces">,
        });
        toast.success("Task created");
      }

      onSuccess?.();
    } catch (error) {
      console.error("Task action failed:", error);
      toast.error("Failed to save task. Please check if the assigned user is a member of this workspace.");
    }
  };

  const isLoading = !workspaceId || isUserLoading;

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-card p-4 rounded-xl space-y-4 border shadow-sm"
    >
      {isLoading && (
        <p className="text-sm text-gray-500">Loading task form...</p>
      )}

      {!isLoading && (
        <>
          <div>
            <label className="block text-sm font-medium">Title</label>
            <input
              type="text"
              className="w-full border rounded-md p-2 text-sm bg-background text-foreground"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Description</label>
            <textarea
              className="w-full border rounded-md p-2 text-sm bg-background text-foreground"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">Priority</label>
              <select
                className="w-full border rounded-md p-2 text-sm bg-background text-foreground"
                value={priority}
                onChange={(e) =>
                  setPriority(e.target.value as "low" | "medium" | "high")
                }
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium">Due Date</label>
              <input
                type="date"
                className="w-full border rounded-md p-2 text-sm bg-background text-foreground"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium">Assigned To</label>
            <select
              className="w-full border rounded-md p-2 text-sm bg-background text-foreground"
              value={assignedTo}
              onChange={(e) => setAssignedTo(e.target.value as Id<"users"> | "")}
            >
              <option value="">Unassigned</option>
              {members?.map((m: any) => (
                <option key={m._id} value={m.user?._id}>
                  {m.user?.name || m.user?.email || "Unknown Member"}
                </option>
              ))}
            </select>
          </div>

          {/* Subtasks */}
          <div className="space-y-2">
            <label className="block text-sm font-medium">Subtasks</label>

            <div className="flex gap-2">
              <input
                type="text"
                className="flex-1 border rounded-md p-2 text-sm bg-background text-foreground"
                value={newSubtask}
                onChange={(e) => setNewSubtask(e.target.value)}
                placeholder="Add a subtask"
              />
              <button
                type="button"
                className="text-sm bg-primary text-white px-3 py-1 rounded-md"
                onClick={() => {
                  if (newSubtask.trim()) {
                    setSubtasks([...subtasks, newSubtask.trim()]);
                    setNewSubtask("");
                  }
                }}
              >
                Add
              </button>
            </div>

            {subtasks.length > 0 && (
              <ul className="list-disc list-inside space-y-1">
                {subtasks.map((subtask, index) => (
                  <li
                    key={index}
                    className="flex justify-between items-center text-sm"
                  >
                    <span>{subtask}</span>
                    <button
                      type="button"
                      className="text-red-500 hover:underline text-xs"
                      onClick={() =>
                        setSubtasks(subtasks.filter((_, i) => i !== index))
                      }
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <button
            type="submit"
            className="bg-primary text-white px-4 py-2 rounded-md text-sm w-full"
          >
            {task ? "Update Task" : "Create Task"}
          </button>
        </>
      )}
    </form>
  );
};
