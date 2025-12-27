// File: src/app/tasks/page.tsx

import { TaskBoard } from "./TaskBoard";

export default function TasksPage() {
  return <TaskBoard />;
}



// "use client";

// import { useState } from "react";
// import { useMutation, useQuery } from "convex/react";
// import { api } from "@/../convex/_generated/api";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Textarea } from "@/components/ui/textarea";
// import { Card } from "@/components/ui/card";

// export default function TasksPage({ params }: { params: { workspaceId: string } }) {
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");

//   const createTask = useMutation(api.tasks.create);
//   const tasks = useQuery(api.tasks.getAll, { workspaceId: params.workspaceId });

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     await createTask({
//       title,
//       description,
//       workspaceId: params.workspaceId,
//     });
//     setTitle("");
//     setDescription("");
//   };

//   return (
//     <div className="p-4 space-y-6">
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <Input
//           placeholder="Task title"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//         />
//         <Textarea
//           placeholder="Task description"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//         />
//         <Button type="submit">Add Task</Button>
//       </form>

//       <div className="space-y-4">
//         {tasks?.map((task) => (
//           <Card key={task._id} className="p-4 shadow-sm">
//             <h2 className="font-semibold text-lg">{task.title}</h2>
//             <p className="text-muted-foreground">{task.description}</p>
//           </Card>
//         ))}
//       </div>
//     </div>
//   );
// }
