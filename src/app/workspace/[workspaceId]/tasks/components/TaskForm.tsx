"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { api } from "../../../../../../convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import type { Id } from "../../../../../../convex/_generated/dataModel";
import type { Task } from "../types/task";

export function TaskForm({task}: {task?: Task}) {
  const params = useParams();
  const [title, setTitle] = useState(task?.title || "");
  const [priority, setPriority] = useState<"low" | "medium" | "high">(task?.priority || "medium");
  const [dueDate, setDueDate] = useState(task?.dueDate || "");
  const [assignedTo, setAssignedTo] = useState<Id<"profiles"> | "">(task?.assignedTo || "");

  const members = useQuery(api.members.getByWorkspace, {
    workspaceId: params.workspaceId as Id<"workspaces">
  });

  const createTask = useMutation(api.tasks.create);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createTask({
      workspaceId: params.workspaceId as Id<"workspaces">,
      title,
      priority,
      dueDate,
      assignedTo: assignedTo || undefined
    });
    setTitle("");
    setPriority("low");
    setDueDate("");
    setAssignedTo("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Title */}
      <div>
        <Label>Task Title</Label>
        <Input value={title} onChange={(e) => setTitle(e.target.value)} required />
      </div>

      {/* Priority */}
      <div>
        <Label>Priority</Label>
        <Select value={priority} onValueChange={(v: "low" | "medium" | "high") => setPriority(v)}>
          <SelectTrigger>
            <SelectValue placeholder="Select priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="low">Low</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="high">High</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Due Date */}
      <div>
        <Label>Due Date</Label>
        <Input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
      </div>

      {/* Assigned To */}
      <div>
        <Label>Assign To</Label>
        <Select value={assignedTo} onValueChange={(v) => setAssignedTo(v as Id<"profiles">)}>
          <SelectTrigger>
            <SelectValue placeholder="Select member" />
          </SelectTrigger>
          <SelectContent>
            {members?.map((m) => (
              <SelectItem key={m.id} value={m.profileId}>
                {m.name} ({m.email})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Button type="submit">Create Task</Button>
    </form>
  );
}









// "use client";

// import React, { useState } from "react";
// import { useMutation } from "convex/react";
// import { useParams } from "next/navigation";
// import { Id } from "@/../convex/_generated/dataModel";
// import { api } from "../../../../../../convex/_generated/api";

// import { Task } from "../types/task";
// import { useCurrentUser } from "@/features/auth/api/use-current-user";

// interface TaskFormProps {
//   task?: Task;
//   onSuccess?: () => void;
// }

// export const TaskForm: React.FC<TaskFormProps> = ({ task, onSuccess }) => {
//   const params = useParams();
//   const workspaceId = params?.workspaceId as string | undefined;

//   const currentUser = useCurrentUser();

//   const [title, setTitle] = useState(task?.title || "");
//   const [description, setDescription] = useState(task?.description || "");
//   const [priority, setPriority] = useState<"low" | "medium" | "high">(
//     task?.priority || "medium"
//   );
//   const [dueDate, setDueDate] = useState(task?.dueDate || "");
//   const [assignedTo, setAssignedTo] = useState<Id<"users"> | "">(
//     task?.assignedTo || ""
//   );

//   const [subtasks, setSubtasks] = useState<string[]>(task?.subtasks || []);
//   const [newSubtask, setNewSubtask] = useState("");

//   const createTask = useMutation(api.tasks.create);
//   const updateTask = useMutation(api.tasks.update);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!title.trim()) return;
//     if (!workspaceId) {
//       console.error("Missing workspaceId from URL");
//       return;
//     }
//     if (!currentUser?._id) {
//       console.error("User is not logged in");
//       return;
//     }

//     const data = {
//       title,
//       description,
//       priority,
//       dueDate,
//       assignedTo: assignedTo || undefined,
//       subtasks,
//       workspaceId: workspaceId as Id<"workspaces">,
//       createdBy: currentUser._id as Id<"users">,
//     };

//     if (task?._id) {
//       await updateTask({ id: task._id, ...data });
//     } else {
//       await createTask(data);
//     }

//     onSuccess?.();
//   };

//   const isLoading = !workspaceId || !currentUser;

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="bg-muted p-4 rounded-xl space-y-4 border shadow-sm"
//     >
//       {isLoading && (
//         <p className="text-sm text-gray-500">Loading task form...</p>
//       )}

//       {!isLoading && (
//         <>
//           <div>
//             <label className="block text-sm font-medium">Title</label>
//             <input
//               type="text"
//               className="w-full border rounded-md p-2 text-sm"
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium">Description</label>
//             <textarea
//               className="w-full border rounded-md p-2 text-sm"
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//             />
//           </div>

//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium">Priority</label>
//               <select
//                 className="w-full border rounded-md p-2 text-sm"
//                 value={priority}
//                 onChange={(e) =>
//                   setPriority(e.target.value as "low" | "medium" | "high")
//                 }
//               >
//                 <option value="low">Low</option>
//                 <option value="medium">Medium</option>
//                 <option value="high">High</option>
//               </select>
//             </div>

//             <div>
//               <label className="block text-sm font-medium">Due Date</label>
//               <input
//                 type="date"
//                 className="w-full border rounded-md p-2 text-sm"
//                 value={dueDate}
//                 onChange={(e) => setDueDate(e.target.value)}
//               />
//             </div>
//           </div>

//           <div>
//             <label className="block text-sm font-medium">Assigned To</label>
//             <input
//               type="text"
//               className="w-full border rounded-md p-2 text-sm"
//               value={assignedTo}
//               onChange={(e) => setAssignedTo(e.target.value as Id<"users">)}
//               placeholder="User ID"
//             />
//           </div>

//           {/* Subtasks */}
//           <div className="space-y-2">
//             <label className="block text-sm font-medium">Subtasks</label>

//             <div className="flex gap-2">
//               <input
//                 type="text"
//                 className="flex-1 border rounded-md p-2 text-sm"
//                 value={newSubtask}
//                 onChange={(e) => setNewSubtask(e.target.value)}
//                 placeholder="Add a subtask"
//               />
//               <button
//                 type="button"
//                 className="text-sm bg-primary text-white px-3 py-1 rounded-md"
//                 onClick={() => {
//                   if (newSubtask.trim()) {
//                     setSubtasks([...subtasks, newSubtask.trim()]);
//                     setNewSubtask("");
//                   }
//                 }}
//               >
//                 Add
//               </button>
//             </div>

//             {subtasks.length > 0 && (
//               <ul className="list-disc list-inside space-y-1">
//                 {subtasks.map((subtask, index) => (
//                   <li
//                     key={index}
//                     className="flex justify-between items-center text-sm"
//                   >
//                     {subtask}
//                     <button
//                       type="button"
//                       className="text-red-500 hover:underline text-xs"
//                       onClick={() =>
//                         setSubtasks(subtasks.filter((_, i) => i !== index))
//                       }
//                     >
//                       Remove
//                     </button>
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </div>

//           <button
//             type="submit"
//             className="bg-primary text-white px-4 py-2 rounded-md text-sm"
//           >
//             {task ? "Update Task" : "Create Task"}
//           </button>
//         </>
//       )}
//     </form>
//   );
// };
