"use client";

import { useState } from "react";

export const useFilters = () => {
  const [selectedPriority, setSelectedPriority] = useState<"All" | "High" | "Medium" | "Low">("All");

  return {
    selectedPriority,
    setSelectedPriority,
  };
};
