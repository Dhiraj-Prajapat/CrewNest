import { v } from "convex/values";
import { query, QueryCtx } from "../_generated/server";

export default query({
  args: {
    workspaceId: v.id("workspaces"),
    priority: v.optional(
      v.union(v.literal("low"), v.literal("medium"), v.literal("high"))
    ),
  },
  handler: async (ctx: QueryCtx, args) => {
    if (args.priority) {
      // filter by workspace + priority
      return await ctx.db
        .query("tasks")
        .withIndex("by_workspace_priority", (q) =>
          q.eq("workspaceId", args.workspaceId).eq("priority", args.priority!)
        )
        .collect();
    }

    // filter only by workspace
    return await ctx.db
      .query("tasks")
      .withIndex("by_workspace", (q) =>
        q.eq("workspaceId", args.workspaceId)
      )
      .collect();
  },
});
