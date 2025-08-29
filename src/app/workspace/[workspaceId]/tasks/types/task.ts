export interface Task {
  _id: string; // or `Id<"tasks">` if you're typing from Convex
  title: string;
  description?: string;
  priority: "low" | "medium" | "high";
  dueDate?: string;
  assignedTo?: string;
  subtasks?: string[];
}
