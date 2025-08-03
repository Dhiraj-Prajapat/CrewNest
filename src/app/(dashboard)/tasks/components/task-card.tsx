import { useDraggable } from "@dnd-kit/core";
import { cn } from "@/lib/utils";

type Task = {
  _id: string;
  title: string;
  status: string;
  priority?: "low" | "medium" | "high";
  dueDate?: string;
};

function isOverdue(dueDate: string): boolean {
  return new Date(dueDate).getTime() < Date.now();
}

function formatCountdown(dueDate: string): string {
  const now = new Date();
  const due = new Date(dueDate);
  const diff = due.getTime() - now.getTime();
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
  return `${days} day${days !== 1 ? "s" : ""} left`;
}

export function TaskCard({ task }: { task: Task }) {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: task._id,
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className="bg-white dark:bg-secondary p-3 rounded-xl shadow cursor-grab space-y-1"
    >
      <h3 className="text-sm font-medium">{task.title}</h3>

      {task.priority && (
        <span
          className={cn("text-xs px-2 py-0.5 rounded-full", {
            "bg-green-200 text-green-800": task.priority === "low",
            "bg-yellow-200 text-yellow-800": task.priority === "medium",
            "bg-red-200 text-red-800": task.priority === "high",
          })}
        >
          {task.priority}
        </span>
      )}

      {task.dueDate && (
        <span className="text-xs text-muted-foreground">
          {isOverdue(task.dueDate)
            ? "Overdue"
            : formatCountdown(task.dueDate)}
        </span>
      )}
    </div>
  );
}



// import { useDraggable } from "@dnd-kit/core";

// type Task = {
//   _id: string;
//   title: string;
//   status: string;
// };

// export function TaskCard({ task }: { task: Task }) {
//   const { attributes, listeners, setNodeRef } = useDraggable({
//     id: task._id,
//   });

//   return (
//     <div
//       ref={setNodeRef}
//       {...listeners}
//       {...attributes}
//       className="bg-white dark:bg-secondary p-3 rounded-xl shadow cursor-grab"
//     >
//       <h3 className="text-sm font-medium">{task.title}</h3>
//     </div>
//   );
// }
