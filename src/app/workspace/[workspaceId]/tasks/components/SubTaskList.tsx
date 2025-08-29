"use client";

import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";

interface SubtaskListProps {
  subtasks: string[];
}

export const SubtaskList: React.FC<SubtaskListProps> = ({ subtasks }) => {
  const [checkedStates, setCheckedStates] = useState(
    subtasks.map(() => false)
  );

  const toggleChecked = (index: number) => {
    const newStates = [...checkedStates];
    newStates[index] = !newStates[index];
    setCheckedStates(newStates);
  };

  return (
    <div className="mt-3 space-y-2">
      <h4 className="text-sm font-medium text-muted-foreground">Subtasks</h4>
      {subtasks.map((subtask, index) => (
        <div
          key={index}
          className="flex items-center gap-2 text-sm text-muted-foreground"
        >
          <Checkbox
            checked={checkedStates[index]}
            onCheckedChange={() => toggleChecked(index)}
          />
          <span className={checkedStates[index] ? "line-through" : ""}>
            {subtask}
          </span>
        </div>
      ))}
    </div>
  );
};
