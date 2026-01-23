import { useQuery } from "convex/react";
import { useFilters } from "./useFilters";
import { useParams } from "next/navigation";
import { api } from "../../../../../../convex/_generated/api";
import { Id } from "../../../../../../convex/_generated/dataModel";
import type { Task } from "../types/task";

export const useTasks = (): { tasks: Task[] } => {
  const params = useParams();
  const { selectedPriority } = useFilters();

  const tasks = useQuery(api.tasks.getFiltered, {
    workspaceId: params.workspaceId as Id<"workspaces">,
    priority: selectedPriority === "All" ? undefined : selectedPriority as "low" | "medium" | "high",
  });

  return {
    tasks: (tasks as Task[]) || [],
  };
};
