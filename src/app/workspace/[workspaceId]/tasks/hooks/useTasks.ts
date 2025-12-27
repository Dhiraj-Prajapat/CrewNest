import { useQuery } from "convex/react";
import { useFilters } from "./useFilters";
import { useParams } from "next/navigation";
<<<<<<< HEAD
import { api } from "../../../../../../convex/_generated/api";
import type { Task } from "../types/task";
=======
import type { Task } from "../types/task";
import { api } from "../../../../../../convex/_generated/api";
import { Id } from "../../../../../../convex/_generated/dataModel";

>>>>>>> 98ce06dff3c1969d0a6a99826e3efe4921540848

export const useTasks = (): { tasks: Task[] } => {
  const params = useParams();
  const { selectedPriority } = useFilters();

<<<<<<< HEAD
  const tasks = useQuery(api.tasks.get, {
    workspaceId: params.workspaceId as string,
  });
=======
 const tasks = useQuery(api.tasks.getFiltered, {
  workspaceId: params.workspaceId as Id<"workspaces">,
  priority: selectedPriority === "All" ? undefined : selectedPriority,
});
>>>>>>> 98ce06dff3c1969d0a6a99826e3efe4921540848

  const filteredTasks = tasks?.filter((task: Task) => {
    if (selectedPriority === "All") return true;
    return task.priority === selectedPriority;
  });

  return {
    tasks: filteredTasks || [],
  };
};
