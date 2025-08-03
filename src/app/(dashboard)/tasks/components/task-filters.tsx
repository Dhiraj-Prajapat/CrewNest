"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

type Props = {
  onFilterChange: (filters: { search: string; status: string }) => void;
};

export function TaskFilters({ onFilterChange }: Props) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    onFilterChange({ search: e.target.value, status });
  };

  const handleStatusClick = (value: string) => {
    const newStatus = status === value ? "" : value;
    setStatus(newStatus);
    onFilterChange({ search, status: newStatus });
  };

  return (
    <div className="flex items-center gap-3 mb-4">
      <Input
        placeholder="Search tasks..."
        value={search}
        onChange={handleSearchChange}
        className="w-64"
      />
      <div className="flex gap-2">
        {["todo", "in_progress", "done"].map((s) => (
          <Button
            key={s}
            variant={status === s ? "default" : "outline"}
            onClick={() => handleStatusClick(s)}
          >
            {s.replace("_", " ")}
          </Button>
        ))}
      </div>
    </div>
  );
}
