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
    });
  },
});

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
    dueDate: v.optional(v.string()),
    assignedTo: v.optional(v.id("users")),
    subtasks: v.optional(v.array(v.string())),
  },
  handler: async (ctx, args) => {
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
  },
});
