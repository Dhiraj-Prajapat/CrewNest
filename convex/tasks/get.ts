import { v } from "convex/values";
import { query } from "../_generated/server";

export const get = query({
  args: {
    workspaceId: v.id("workspaces"),
  },
  handler: async (ctx, { workspaceId }) => {
    return await ctx.db
      .query("tasks")
      .withIndex("by_workspace", (q) => q.eq("workspaceId", workspaceId))
      .collect();
  },
});
