"use client";

import React, { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/../convex/_generated/api";
import { Task } from "../types/task";
import { useParams } from "next/navigation";
import { Id } from "@/../convex/_generated/dataModel";
import { useCurrentUser } from "@/features/auth/api/use-current-user";

interface TaskFormProps {
  task?: Task;
  onSuccess?: () => void;
}

export const TaskForm: React.FC<TaskFormProps> = ({ task, onSuccess }) => {
  const params = useParams();
  const workspaceId = params.workspaceId as Id<"workspaces">;
  const { data: currentUser } = useCurrentUser();

  // Fetch workspace members for assignment
  // const members = useQuery(api.members.get, { workspaceId: workspaceId as Id<"workspaces"> });
  const members = useQuery(api.members.get, { workspaceId });

  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");
  const [priority, setPriority] = useState<"low" | "medium" | "high">(task?.priority || "medium");
  const [dueDate, setDueDate] = useState(task?.dueDate || "");
  const [assignedTo, setAssignedTo] = useState<Id<"users"> | "">(task?.assignedTo || "");
  const [subtasks, setSubtasks] = useState<string[]>(task?.subtasks || []);
  const [newSubtask, setNewSubtask] = useState("");

  const createTask = useMutation(api.tasks.create);
  const updateTask = useMutation(api.tasks.update);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) return;
    if (!workspaceId || !currentUser?._id) {
      console.error("Missing workspaceId or user ID");
      return;
    }

    const data = {
      title,
      description,
      priority,
      dueDate,
      assignedTo: assignedTo || undefined,
      subtasks,
      workspaceId,
    };

    if (task?._id) {
      await updateTask({ id: task._id, ...data });
    } else {
      await createTask(data);
    }

    onSuccess?.();
    setTitle("");
    setDescription("");
    setSubtasks([]);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-muted p-6 px-10 rounded-xl space-y-4 border shadow-sm"
    >
      <div>
        <label className="block text-sm font-medium">Title</label>
        <input
          type="text"
          className="w-full border rounded-md p-2 text-sm bg-background"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Description</label>
        <textarea
          className="w-full border rounded-md p-2 text-sm bg-background"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium">Priority</label>
          <select
            className="w-full border rounded-md p-2 text-sm bg-background"
            value={priority}
            onChange={(e) => setPriority(e.target.value as "low" | "medium" | "high")}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">Assigned To</label>
          <select
            className="w-full border rounded-md p-2 text-sm bg-background"
            value={assignedTo}
            onChange={(e) => setAssignedTo(e.target.value as Id<"users">)}
          >
            <option value="">Unassigned</option>
            {members?.map((member) => (
              <option key={member._id} value={member.userId}>
                {member.user?.name || member.user?.email || "Unknown Member"}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">Due Date</label>
          <input
            type="date"
            className="w-full border rounded-md p-2 text-sm bg-background"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium">Subtasks</label>
        <div className="flex gap-2">
          <input
            type="text"
            className="flex-1 border rounded-md p-2 text-sm bg-background"
            value={newSubtask}
            onChange={(e) => setNewSubtask(e.target.value)}
            placeholder="Add a subtask"
          />
          <button
            type="button"
            className="text-sm bg-primary text-primary-foreground px-4 py-1 rounded-md"
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
          <ul className="space-y-1">
            {subtasks.map((subtask, index) => (
              <li
                key={index}
                className="flex justify-between items-center text-sm bg-background/50 p-2 rounded border"
              >
                <span>{subtask}</span>
                <button
                  type="button"
                  className="text-red-500 hover:text-red-700 text-xs font-medium"
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

      <div className="flex justify-center w-full">
        <button
          type="submit"
          className="w-full max-w-lg mx-auto bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md text-sm font-medium transition-colors"
        >
          {task ? "Update Task" : "Create Task"}
        </button>
      </div>
    </form>
  );
};
