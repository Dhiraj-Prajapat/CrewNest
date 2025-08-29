import { v } from "convex/values";
import { mutation } from "../_generated/server";

export const create = mutation({
  args: {
    title: v.string(),
    description: v.optional(v.string()),
    priority: v.union(v.literal("low"), v.literal("medium"), v.literal("high")),
    dueDate: v.optional(v.string()),
    assignedTo: v.optional(v.id("users")),
    subtasks: v.optional(v.array(v.string())),
    workspaceId: v.id("workspaces"),   // ✅ add this
    createdBy: v.id("users"),          // ✅ add this
  },
  handler: async (ctx, args) => {
    const taskId = await ctx.db.insert("tasks", {
      title: args.title,
      description: args.description,
      priority: args.priority,
      dueDate: args.dueDate,
      assignedTo: args.assignedTo,
      subtasks: args.subtasks ?? [],
      completed: false,
      workspaceId: args.workspaceId,  // ✅ required
      createdBy: args.createdBy,      // ✅ required
      createdAt: Date.now(),
    });

    return taskId;
  },
});
