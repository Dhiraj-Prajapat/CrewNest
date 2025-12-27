
import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";
import { Id } from "./_generated/dataModel";

export const get = query({
  args: {
    workspaceId: v.id("workspaces"),
    priority: v.optional(v.union(v.literal("low"), v.literal("medium"), v.literal("high"))),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return [];

    let tasks;

    if (args.priority) {
      tasks = await ctx.db
        .query("tasks")
        .withIndex("by_workspace_priority", (q) =>
          q.eq("workspaceId", args.workspaceId).eq("priority", args.priority!)
        )
        .order("desc")
        .collect();
    } else {
      tasks = await ctx.db
        .query("tasks")
        .withIndex("by_workspace", (q) => q.eq("workspaceId", args.workspaceId))
        .order("desc")
        .collect();
    }

    // Populate user/member details
    const populatedTasks = await Promise.all(
      tasks.map(async (task) => {
        let assignedToUser = null;
        let createdByUser = null;

        if (task.assignedTo) {
          const member = await ctx.db
            .query("members")
            .withIndex("by_user_id", (q) => q.eq("userId", task.assignedTo as Id<"users">))
            .first(); // Assuming finding member by userId is enough to get name via user table lookup or member table if cached?
          // Actually, better to fetch User directly if we just need name/avatar.
          assignedToUser = await ctx.db.get(task.assignedTo);
        }

        if (task.createdBy) {
          createdByUser = await ctx.db.get(task.createdBy);
        }

        return {
          ...task,
          assignedToUser,
          createdByUser
        };
      })
    );

    return populatedTasks;
  },
});

export const create = mutation({
  args: {
    workspaceId: v.id("workspaces"),
    title: v.string(),
    description: v.optional(v.string()),
    priority: v.union(v.literal("low"), v.literal("medium"), v.literal("high")),
    dueDate: v.optional(v.string()),
    assignedTo: v.optional(v.id("users")),
    subtasks: v.optional(v.array(v.string())),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Unauthorized");

    const taskId = await ctx.db.insert("tasks", {
      ...args,
      completed: false,
      createdBy: userId,
      createdAt: Date.now(),
    });

    // Notification Logic
    if (args.assignedTo && args.assignedTo !== userId) {
      await ctx.db.insert("notifications", {
        userId: args.assignedTo,
        workspaceId: args.workspaceId,
        type: "task",
        itemId: taskId,
        title: "New Task Assigned",
        body: `You have been assigned to: ${args.title}`,
        isRead: false,
        fromUserId: userId
      });
    }

    return taskId;
  },
});

export const update = mutation({
  args: {
    id: v.id("tasks"),
    title: v.optional(v.string()),
    description: v.optional(v.string()),
    priority: v.optional(v.union(v.literal("low"), v.literal("medium"), v.literal("high"))),
    completed: v.optional(v.boolean()),
    dueDate: v.optional(v.string()),
    assignedTo: v.optional(v.id("users")),
    subtasks: v.optional(v.array(v.string())),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Unauthorized");

    const { id, ...updates } = args;
    const task = await ctx.db.get(id); // Fetch existing to check previous assignment

    await ctx.db.patch(id, updates);

    // Notification: If assignedTo changed and is not self
    if (updates.assignedTo && updates.assignedTo !== userId && updates.assignedTo !== task?.assignedTo) {
      await ctx.db.insert("notifications", {
        userId: updates.assignedTo,
        workspaceId: task!.workspaceId, // Non-null assertion safe because we found task
        type: "task",
        itemId: id,
        title: "Task Assigned",
        body: `You have been assigned to: ${updates.title || task?.title || "a task"}`,
        isRead: false,
        fromUserId: userId
      });
    }
  },
});

export const remove = mutation({
  args: {
    id: v.id("tasks"),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Unauthorized");

    await ctx.db.delete(args.id);
  },
});
