"use client";

import { useState } from "react";

export const useFilters = () => {
<<<<<<< HEAD
  const [selectedPriority, setSelectedPriority] = useState<"All" | "High" | "Medium" | "Low">("All");
=======
  const [selectedPriority, setSelectedPriority] = useState<"All" | "high" | "medium" | "low">("All");
>>>>>>> 98ce06dff3c1969d0a6a99826e3efe4921540848

  return {
    selectedPriority,
    setSelectedPriority,
  };
};
