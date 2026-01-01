import { v } from "convex/values";
import { mutation } from "../_generated/server";

export default mutation({
  args: {
    taskId: v.id("tasks"),
    title: v.optional(v.string()),
    description: v.optional(v.string()),
    priority: v.optional(v.union(
      v.literal("low"),
      v.literal("medium"),
      v.literal("high")
    )),
    dueDate: v.optional(v.string()),
    completed: v.optional(v.boolean()),
    assignedTo: v.optional(v.id("users")),
    subtasks: v.optional(v.array(v.string())),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db.get(args.taskId);
    if (!existing) throw new Error("Task not found");

    await ctx.db.patch(args.taskId, {
      title: args.title ?? existing.title,
      description: args.description ?? existing.description,
      priority: args.priority ?? existing.priority,
      dueDate: args.dueDate ?? existing.dueDate,
      completed: args.completed ?? existing.completed,
      assignedTo: args.assignedTo ?? existing.assignedTo,
      subtasks: args.subtasks ?? existing.subtasks,
    });
  }
});
