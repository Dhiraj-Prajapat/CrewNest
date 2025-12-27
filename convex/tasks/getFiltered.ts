import { v } from "convex/values";
import { query } from "../_generated/server";

export const getFiltered = query({
  args: {
    workspaceId: v.id("workspaces"),
    priority: v.optional(
      v.union(v.literal("low"), v.literal("medium"), v.literal("high"))
    ),
  },
  handler: async (ctx, args) => {
    if (args.priority) {
      return await ctx.db
        .query("tasks")
        .withIndex("by_workspace_priority", (q) =>
          q.eq("workspaceId", args.workspaceId).eq("priority", args.priority!)
        )
        .collect();
    }

    return await ctx.db
      .query("tasks")
      .withIndex("by_workspace", (q) =>
        q.eq("workspaceId", args.workspaceId)
      )
      .collect();
  },
});
