
import { Id } from "@/../convex/_generated/dataModel";

export interface Task {
  _id: Id<"tasks">;
  title: string;
  description?: string;
  priority: "low" | "medium" | "high";
  dueDate?: string;
  completed: boolean;
  assignedTo?: Id<"users">;
  createdBy: Id<"users">;
  subtasks?: string[];
  createdAt: number;
  assignedToUser?: { name?: string; image?: string } | null;
  createdByUser?: { name?: string; image?: string } | null;
}
