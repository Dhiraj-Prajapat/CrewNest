import { useQuery } from "convex/react";
import { useFilters } from "./useFilters";
import { useParams } from "next/navigation";
import { api } from "../../../../../../convex/_generated/api";
import type { Task } from "../types/task";

export const useTasks = (): { tasks: Task[] } => {
  const params = useParams();
  const { selectedPriority } = useFilters();

  const tasks = useQuery(api.tasks.get, {
    workspaceId: params.workspaceId as string,
  });

  const filteredTasks = tasks?.filter((task: Task) => {
    if (selectedPriority === "All") return true;
    return task.priority === selectedPriority;
  });

  return {
    tasks: filteredTasks || [],
  };
};
