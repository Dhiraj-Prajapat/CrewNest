"use client";

import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { useTasks } from "./hooks/useTasks";
import { Task } from "./types/task";

export const TaskCalendar = () => {
  const { tasks } = useTasks();

  const events = tasks
    .filter((task: Task) => task.dueDate)
    .map((task: Task) => ({
      title: task.title,
      date: task.dueDate,
      backgroundColor:
        task.priority === "high"
          ? "#ef4444" // red
          : task.priority === "medium"
          ? "#facc15" // yellow
          : "#22c55e", // green
      borderColor: "transparent",
    }));

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">📅 Task Calendar</h2>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={events}
        height="auto"
      />
    </div>
  );
};
