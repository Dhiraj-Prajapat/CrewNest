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

        return await Promise.all(
            tasks.map(async (task) => {
                let assignedToUser = null;
                let createdByUser = null;

                if (task.assignedTo) {
                    assignedToUser = await ctx.db.get(task.assignedTo);
                }
                if (task.createdBy) {
                    createdByUser = await ctx.db.get(task.createdBy);
                }

                return {
                    ...task,
                    assignedToUser: assignedToUser ? { name: assignedToUser.name, image: assignedToUser.image } : null,
                    createdByUser: createdByUser ? { name: createdByUser.name, image: createdByUser.image } : null,
                };
            })
        );
    },
});

export const getFiltered = get;
export const getAll = get;

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

        if (args.assignedTo) {
            const membership = await ctx.db
                .query("members")
                .withIndex("by_workspace_id_user_id", (q) =>
                    q.eq("workspaceId", args.workspaceId).eq("userId", args.assignedTo!)
                )
                .first();
            if (!membership) throw new Error("Assigned user is not a member of this workspace");
        }

        const taskId = await ctx.db.insert("tasks", {
            ...args,
            completed: false,
            createdBy: userId,
            createdAt: Date.now(),
        });

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
        dueDate: v.optional(v.string()),
        assignedTo: v.optional(v.id("users")),
        subtasks: v.optional(v.array(v.string())),
        completed: v.optional(v.boolean()),
    },
    handler: async (ctx, args) => {
        const userId = await getAuthUserId(ctx);
        if (!userId) throw new Error("Unauthorized");

        const { id, ...updates } = args;
        const task = await ctx.db.get(id);
        if (!task) throw new Error("Task not found");

        if (updates.assignedTo && updates.assignedTo !== task.assignedTo) {
            const membership = await ctx.db
                .query("members")
                .withIndex("by_workspace_id_user_id", (q) =>
                    q.eq("workspaceId", task.workspaceId).eq("userId", updates.assignedTo!)
                )
                .first();
            if (!membership) throw new Error("Assigned user is not a member of this workspace");
        }

        await ctx.db.patch(id, updates);

        if (updates.assignedTo && updates.assignedTo !== userId && updates.assignedTo !== task.assignedTo) {
            await ctx.db.insert("notifications", {
                userId: updates.assignedTo,
                workspaceId: task.workspaceId,
                type: "task",
                itemId: id,
                title: "Task Updated",
                body: `You have been assigned to or updated on: ${updates.title || task.title}`,
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
