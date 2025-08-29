import { TaskBoard } from "./TaskBoard";
import { TaskCalendar } from "./TaskCalender";

export default function TaskPage() {
  return (
    <div className="space-y-6">
      <TaskBoard />
      <TaskCalendar />
    </div>
  );
}
