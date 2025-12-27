"use client";

import React, { useState } from "react";
import { useMutation } from "convex/react";
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
  const { workspaceId } = useParams();
  const currentUser = useCurrentUser();

  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");
  const [priority, setPriority] = useState<"Low" | "Medium" | "High">(task?.priority || "Medium");
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
      workspaceId: workspaceId as Id<"workspaces">,
      createdBy: currentUser._id as Id<"users">,
    };

    if (task?._id) {
      await updateTask({ id: task._id, ...data });
    } else {
      await createTask(data);
    }

    onSuccess?.();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-muted p-4 rounded-xl space-y-4 border shadow-sm"
    >
      <div>
        <label className="block text-sm font-medium">Title</label>
        <input
          type="text"
          className="w-full border rounded-md p-2 text-sm"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Description</label>
        <textarea
          className="w-full border rounded-md p-2 text-sm"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Priority</label>
        <select
          className="w-full border rounded-md p-2 text-sm"
          value={priority}
          onChange={(e) => setPriority(e.target.value as "Low" | "Medium" | "High")}
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium">Due Date</label>
        <input
          type="date"
          className="w-full border rounded-md p-2 text-sm"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Assigned To</label>
        <input
          type="text"
          className="w-full border rounded-md p-2 text-sm"
          value={assignedTo}
          onChange={(e) => setAssignedTo(e.target.value as Id<"users">)}
          placeholder="User ID"
        />
      </div>

      {/* ✅ Subtasks */}
      <div className="space-y-2">
        <label className="block text-sm font-medium">Subtasks</label>

        <div className="flex gap-2">
          <input
            type="text"
            className="flex-1 border rounded-md p-2 text-sm"
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
                {subtask}
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
        className="bg-primary text-white px-4 py-2 rounded-md text-sm"
      >
        {task ? "Update Task" : "Create Task"}
      </button>
    </form>
  );
};
