<<<<<<< HEAD
import { Id } from "@/../convex/_generated/dataModel";

export interface Task {
  _id: Id<"tasks">;
=======
export interface Task {
  _id: string; // or `Id<"tasks">` if you're typing from Convex
>>>>>>> 98ce06dff3c1969d0a6a99826e3efe4921540848
  title: string;
  description?: string;
  priority: "low" | "medium" | "high";
  dueDate?: string;
<<<<<<< HEAD
  completed: boolean;
  assignedTo?: Id<"users">;
  createdBy: Id<"users">;
  subtasks?: string[];
  workspaceId: Id<"workspaces">;
  createdAt: number;
  assignedToUser?: { name?: string; image?: string };
  createdByUser?: { name?: string; image?: string };
=======
  assignedTo?: string;
  subtasks?: string[];
>>>>>>> 98ce06dff3c1969d0a6a99826e3efe4921540848
}
