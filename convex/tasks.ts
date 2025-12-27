<<<<<<< HEAD

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
=======
import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { Id, Doc } from "./_generated/dataModel";

/**
 * =========================
 * QUERY: getFiltered
 * =========================
 * Fetches tasks for a workspace and optionally filters them by priority.
 * It also enriches each task with assigned user details (if any).
 */
export const getFiltered = query({
  args: {
    workspaceId: v.id("workspaces"),
    priority: v.optional(
      v.union(v.literal("low"), v.literal("medium"), v.literal("high"))
    ),
  },
  handler: async (ctx, args) => {
    // Fetch all tasks for the given workspace
    const tasks = await ctx.db
      .query("tasks")
      .filter((q) => q.eq(q.field("workspaceId"), args.workspaceId))
      .collect();

    // Apply priority filter if provided
    let filtered = tasks;
    if (args.priority) {
      filtered = tasks.filter((t) => t.priority === args.priority);
    }

    // Collect all assigned user IDs from the filtered tasks
    const userIds = filtered
      .map((t) => t.assignedTo)
      .filter(Boolean) as Id<"users">[];

    // Fetch assigned users (replace old `getMany` with Promise.all)
    const assignedUsers = await Promise.all(
      userIds.map((id) => ctx.db.get(id))
    );

    // Map tasks with assigned user details
    return filtered.map((task) => {
      const assignedUser = assignedUsers.find(
        (u): u is Doc<"users"> => u?._id === task.assignedTo
      );

      return {
        ...task,
        assignedUser: assignedUser
          ? {
              id: assignedUser._id,
              email: assignedUser.email,
              name: assignedUser.name || assignedUser.email,
            }
          : null,
      };
>>>>>>> 98ce06dff3c1969d0a6a99826e3efe4921540848
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

<<<<<<< HEAD
export const update = mutation({
  args: {
    id: v.id("tasks"),
    title: v.optional(v.string()),
    description: v.optional(v.string()),
    priority: v.optional(v.union(v.literal("low"), v.literal("medium"), v.literal("high"))),
    completed: v.optional(v.boolean()),
=======
/**
 * =========================
 * MUTATION: create
 * =========================
 * Creates a new task inside a workspace.
 * - Validates if the assigned user (if any) is a member of the workspace.
 * - Ensures authentication is required to create a task.
 */
export const create = mutation({
  args: {
    workspaceId: v.id("workspaces"),
    title: v.string(),
    description: v.optional(v.string()),
    priority: v.union(v.literal("low"), v.literal("medium"), v.literal("high")),
>>>>>>> 98ce06dff3c1969d0a6a99826e3efe4921540848
    dueDate: v.optional(v.string()),
    assignedTo: v.optional(v.id("users")),
    subtasks: v.optional(v.array(v.string())),
  },
  handler: async (ctx, args) => {
<<<<<<< HEAD
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
=======
    // If task has an assignee, validate they are part of the workspace
    if (args.assignedTo) {
      const membership = await ctx.db
        .query("members")
        .filter((q) =>
          q.and(
            q.eq(q.field("workspaceId"), args.workspaceId),
            q.eq(q.field("userId"), args.assignedTo)
          )
        )
        .first();

      if (!membership) {
        throw new Error("Assigned user is not a member of this workspace");
      }
    }

    // Get the authenticated user identity
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("You must be logged in to create a task");
    }

    // Look up the corresponding user document in the `users` table
    const user = await ctx.db
      .query("users")
      // .withIndex("by_token", (q) =>
      //   q.eq("tokenIdentifier", identity.tokenIdentifier)
      // )
      .unique();

    if (!user) {
      throw new Error("User not found in database");
    }

    // Insert new task document
    await ctx.db.insert("tasks", {
      workspaceId: args.workspaceId,
      title: args.title,
      description: args.description,
      priority: args.priority,
      dueDate: args.dueDate,
      assignedTo: args.assignedTo,
      subtasks: args.subtasks ?? [],
      createdAt: Date.now(),
      completed: false, // Default new tasks to incomplete
      createdBy: user._id, // Track who created the task
    });
  },
});

/**
 * =========================
 * MUTATION: update
 * =========================
 * Updates a task (including reassignment).
 * - Validates that assigned user is a member of the workspace.
 * - Applies partial updates (only provided fields are changed).
 */
export const update = mutation({
  args: {
    taskId: v.id("tasks"),
    title: v.optional(v.string()),
    description: v.optional(v.string()),
    priority: v.optional(
      v.union(v.literal("low"), v.literal("medium"), v.literal("high"))
    ),
    dueDate: v.optional(v.string()),
    assignedTo: v.optional(v.id("users")),
    subtasks: v.optional(v.array(v.string())),
  },
  handler: async (ctx, args) => {
    // Fetch the task to update
    const task = await ctx.db.get(args.taskId);
    if (!task) throw new Error("Task not found");

    // If task is reassigned, validate user membership
    if (args.assignedTo) {
      const membership = await ctx.db
        .query("members")
        .filter((q) =>
          q.and(
            q.eq(q.field("workspaceId"), task.workspaceId),
            q.eq(q.field("userId"), args.assignedTo)
          )
        )
        .first();

      if (!membership) {
        throw new Error("Assigned user is not a member of this workspace");
      }
    }

    // Patch task with updated fields
    await ctx.db.patch(args.taskId, {
      title: args.title ?? task.title,
      description: args.description ?? task.description,
      priority: args.priority ?? task.priority,
      dueDate: args.dueDate ?? task.dueDate,
      assignedTo: args.assignedTo ?? task.assignedTo,
      subtasks: args.subtasks ?? task.subtasks,
    });
>>>>>>> 98ce06dff3c1969d0a6a99826e3efe4921540848
  },
});
