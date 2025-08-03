"use client";

import { motion } from "framer-motion";
import { TaskBoard } from "./components/task-board";

export default function TasksPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 12 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="h-full"
    >
      <TaskBoard />
    </motion.div>
  );
}
