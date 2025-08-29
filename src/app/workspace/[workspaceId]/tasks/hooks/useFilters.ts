"use client";

import { useState } from "react";

export const useFilters = () => {
  const [selectedPriority, setSelectedPriority] = useState<"All" | "high" | "medium" | "low">("All");

  return {
    selectedPriority,
    setSelectedPriority,
  };
};
