"use client";

import { Button } from "@/components/ui/button";
import { useFilters } from "../hooks/useFilters";

const priorities = ["All", "high", "medium", "low"] as const;

export const FilterBar = () => {
  const { selectedPriority, setSelectedPriority } = useFilters();

  return (
    <div className="flex gap-2 flex-wrap p-2">
      {priorities.map((priority) => (
        <Button
          key={priority}
          variant={selectedPriority === priority ? "default" : "outline"}
          onClick={() => setSelectedPriority(priority)}
          className="capitalize"
        >
          {priority}
        </Button>
      ))}
    </div>
  );
};
