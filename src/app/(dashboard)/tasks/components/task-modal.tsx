"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMutation } from "convex/react";
import { api } from "@/../convex/_generated/api";

import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { DatePicker } from "@/components/ui/date-picker";

export function TaskModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState<"low" | "medium" | "high">("medium");
  const [dueDate, setDueDate] = useState<Date | null>(null);

  const createTask = useMutation(api.tasks.createTask);

  const handleSubmit = async () => {
    if (!title.trim()) return;

    await createTask({
      title,
      status: "todo",
      priority,
      dueDate: dueDate?.toISOString() || undefined,
    });

    setTitle("");
    setPriority("medium");
    setDueDate(null);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Task</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Input
            placeholder="Task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <Select onValueChange={(value) => setPriority(value as "low" | "medium" | "high")} defaultValue="medium">
            <SelectTrigger>
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
            </SelectContent>
          </Select>

          <DatePicker
            selected={dueDate}
            onChange={setDueDate}
            placeholderText="Select due date"
          />

          <Button onClick={handleSubmit}>Create</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}





// "use client";

// import { useState } from "react";
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { useMutation } from "convex/react";
// import { api } from "@/../convex/_generated/api";

// export function TaskModal({ open, onClose }: { open: boolean; onClose: () => void }) {
//   const [title, setTitle] = useState("");
//   const createTask = useMutation(api.tasks.createTask);

//   const handleSubmit = async () => {
//     if (!title.trim()) return;

//     await createTask({ title, status: "todo" });
//     setTitle("");
//     onClose();
//   };

//   return (
//     <Dialog open={open} onOpenChange={onClose}>
//       <DialogContent>
//         <DialogHeader>
//           <DialogTitle>Create Task</DialogTitle>
//         </DialogHeader>
//         <div className="space-y-4">
//           <Input
//             placeholder="Task title"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//           />
//           <Button onClick={handleSubmit}>Create</Button>
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// }

