import { useQuery } from "convex/react";
import { useFilters } from "./useFilters";
import { useParams } from "next/navigation";
import type { Task } from "../types/task";
import { api } from "../../../../../../convex/_generated/api";
import { Id } from "../../../../../../convex/_generated/dataModel";

export const useTasks = (): { tasks: Task[] } => {
  const params = useParams();
  const { selectedPriority } = useFilters();

  const tasks = useQuery(api.tasks.getFiltered, {
    workspaceId: params.workspaceId as Id<"workspaces">,
    priority: selectedPriority === "All" ? undefined : selectedPriority,
  });

  const filteredTasks = tasks?.filter((task: Task) => {
    if (selectedPriority === "All") return true;
    return task.priority === selectedPriority;
  });

  return {
    tasks: filteredTasks || [],
  };
};
