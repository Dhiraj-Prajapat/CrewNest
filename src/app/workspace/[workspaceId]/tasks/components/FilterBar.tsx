"use client";

import { Button } from "@/components/ui/button";
import { useFilters } from "../hooks/useFilters";

const priorities = [
  { value: "All", label: "All" },
  { value: "high", label: "High" },
  { value: "medium", label: "Medium" },
  { value: "low", label: "Low" },
] as const;

export const FilterBar = () => {
  const { selectedPriority, setSelectedPriority } = useFilters();

  return (
    <div className="flex gap-2 flex-wrap p-2">
      {priorities.map((priority) => (
        <Button
          key={priority.value}
          variant={selectedPriority === priority.value ? "default" : "outline"}
          onClick={() => setSelectedPriority(priority.value)}
          className="capitalize"
        >
          {priority.label}
        </Button>
      ))}
    </div>
  );
};
