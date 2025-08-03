// "use client";

// import { useQuery } from "convex/react";
// import { api } from "@/../convex/_generated/api";
// import { TaskCard } from "./task-card";
// import { TaskModal } from "./task-modal";
// import { Button } from "@/components/ui/button";
// import { useState } from "react";

// export function TaskBoard() {
//   const tasks = useQuery(api.tasks.getTasks);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const statuses = ["todo", "in_progress", "done"] as const;

//   return (
//     <div className="flex gap-4">
//       {statuses.map((status) => (
//         <div key={status} className="w-1/3 bg-muted p-4 rounded-xl">
//           <h2 className="font-bold capitalize mb-2">
//             {status.replace("_", " ")}
//           </h2>
//           <div className="space-y-2">
//             {tasks
//               ?.filter((task) => task.status === status)
//               .map((task) => (
//                 <TaskCard key={task._id} task={task} />
//               ))}
//           </div>
//         </div>
//       ))}
//       <TaskModal open={isModalOpen} onClose={() => setIsModalOpen(false)} />
//       <Button className="fixed bottom-6 right-6" onClick={() => setIsModalOpen(true)}>
//         + Add Task
//       </Button>
//     </div>
//   );
// }




"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "@/../convex/_generated/api";
import { TaskCard } from "./task-card";
import { TaskModal } from "./task-modal";
import { TaskFilters } from "./task-filters";
import { Button } from "@/components/ui/button";
import { useState } from "react";

import {
  DndContext,
  closestCenter,
  DragEndEvent,
} from "@dnd-kit/core";

export function TaskBoard() {
  const tasks = useQuery(api.tasks.getTasks);
  const updateStatus = useMutation(api.tasks.updateTaskStatus);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [filters, setFilters] = useState({ search: "", status: "" });

  const statuses = ["todo", "in_progress", "done"] as const;

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const taskId = active.id.toString();
    const newStatus = over.id.toString();
    await updateStatus({ id: taskId, status: newStatus });
  };

  const filteredTasks = tasks?.filter((task) => {
    const matchesSearch = task.title
      .toLowerCase()
      .includes(filters.search.toLowerCase());
    const matchesStatus = !filters.status || task.status === filters.status;
    return matchesSearch && matchesStatus;
  });

  return (
    <>
      <TaskFilters onFilterChange={setFilters} />

      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <div className="flex gap-4">
          {statuses.map((status) => (
            <div
              key={status}
              id={status}
              className="w-1/3 bg-muted p-4 rounded-xl min-h-[60vh]"
            >
              <h2 className="font-bold capitalize mb-2">
                {status.replace("_", " ")}
              </h2>
              <div className="space-y-2">
                {filteredTasks
                  ?.filter((task) => task.status === status)
                  .map((task) => (
                    <TaskCard key={task._id} task={task} />
                  ))}
              </div>
            </div>
          ))}
        </div>
      </DndContext>

      <TaskModal open={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <Button className="fixed bottom-6 right-6" onClick={() => setIsModalOpen(true)}>
        + Add Task
      </Button>
    </>
  );
}
