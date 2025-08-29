// "use client";

// import { useQuery } from "convex/react";
// import { api } from "@/../convex/_generated/api";
// import type { Id } from "@/../convex/_generated/dataModel";

// export const useIncomingCalls = (workspaceId: Id<"workspaces">) => {
//   const data = useQuery(
//     api.calls.getIncomingCalls,
//     workspaceId ? { workspaceId } : "skip"
//   );

//   const isLoading = data === undefined;

//   return { data, isLoading };
// };

// updated code

"use client";

import { useQuery } from "convex/react";
import { api } from "@/../convex/_generated/api";
import type { Id } from "@/../convex/_generated/dataModel";

export const useIncomingCalls = (workspaceId: Id<"workspaces"> | "skip") => {
  const data = useQuery(
    api.calls.getIncomingCalls,
    workspaceId && workspaceId !== "skip" ? { workspaceId } : "skip"
  );

  const isLoading = data === undefined;

  return { data: data || [], isLoading };
};
