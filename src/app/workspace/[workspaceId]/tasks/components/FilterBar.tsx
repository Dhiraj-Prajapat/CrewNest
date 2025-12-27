"use client";

import { Button } from "@/components/ui/button";
import { useFilters } from "../hooks/useFilters";

<<<<<<< HEAD
const priorities = ["All", "High", "Medium", "Low"] as const;
=======
const priorities = ["All", "high", "medium", "low"] as const;
>>>>>>> 98ce06dff3c1969d0a6a99826e3efe4921540848

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
