// import { v } from "convex/values";
// import { mutation, query } from "./_generated/server";
// import { Id } from "./_generated/dataModel";
// import { getAuthUserId } from "@convex-dev/auth/server";

// // Helper to populate user details
// const populateUser = async (ctx: any, userId: Id<"users">) => {
//   return await ctx.db.get(userId);
// };

// export const get = query({
//   args: {
//     workspaceId: v.id("workspaces"),
//   },
//   handler: async (ctx, args) => {
//     const userId = await getAuthUserId(ctx);
//     if (!userId) return [];

//     const tasks = await ctx.db
//       .query("tasks")
//       .withIndex("by_workspace", (q) => q.eq("workspaceId", args.workspaceId))
//       .collect();

//     const populatedTasks = await Promise.all(
//       tasks.map(async (task) => {
//         let assignedToUser = null;
//         let createdByUser = null;

//         if (task.assignedTo) {
//           assignedToUser = await ctx.db.get(task.assignedTo);
//         }

//         if (task.createdBy) {
//           createdByUser = await ctx.db.get(task.createdBy);
//         }

//         return {
//           ...task,
//           assignedToUser,
//           createdByUser
//         };
//       })
//     );

//     return populatedTasks;
//   },
// });

// export const getFiltered = query({
//   args: {
//     workspaceId: v.id("workspaces"),
//     priority: v.optional(
//       v.union(v.literal("low"), v.literal("medium"), v.literal("high"))
//     ),
//   },
//   handler: async (ctx, args) => {
//     const userId = await getAuthUserId(ctx);
//     if (!userId) return [];

//     let query = ctx.db
//       .query("tasks")
//       .withIndex("by_workspace", (q) => q.eq("workspaceId", args.workspaceId));

//     if (args.priority) {
//       query = ctx.db
//         .query("tasks")
//         .withIndex("by_workspace_priority", (q) =>
//           q.eq("workspaceId", args.workspaceId).eq("priority", args.priority!)
//         );
//     }

//     const tasks = await query.collect();

//     const populatedTasks = await Promise.all(
//       tasks.map(async (task) => {
//         let assignedToUser = null;
//         let createdByUser = null;

//         if (task.assignedTo) {
//           assignedToUser = await ctx.db.get(task.assignedTo);
//         }

//         if (task.createdBy) {
//           createdByUser = await ctx.db.get(task.createdBy);
//         }

//         return {
//           ...task,
//           assignedToUser,
//           createdByUser
//         };
//       })
//     );

//     return populatedTasks;
//   },
// });

// export const create = mutation({
//   args: {
//     workspaceId: v.id("workspaces"),
//     title: v.string(),
//     description: v.optional(v.string()),
//     priority: v.union(v.literal("low"), v.literal("medium"), v.literal("high")),
//     dueDate: v.optional(v.string()),
//     assignedTo: v.optional(v.id("users")),
//     subtasks: v.optional(v.array(v.string())),
//   },
//   handler: async (ctx, args) => {
//     const userId = await getAuthUserId(ctx);
//     if (!userId) throw new Error("Unauthorized");

//     // Validate membership if assigned
//     if (args.assignedTo) {
//       // We need to check if the assigned user is in the workspace.
//       const membership = await ctx.db
//         .query("members")
//         .withIndex("by_workspace_id_user_id", (q) =>
//           q.eq("workspaceId", args.workspaceId).eq("userId", args.assignedTo!)
//         )
//         .unique();

//       if (!membership) {
//         throw new Error("Assigned user is not a member of this workspace");
//       }
//     }

//     const taskId = await ctx.db.insert("tasks", {
//       workspaceId: args.workspaceId,
//       title: args.title,
//       description: args.description,
//       priority: args.priority,
//       dueDate: args.dueDate,
//       assignedTo: args.assignedTo,
//       subtasks: args.subtasks || [],
//       completed: false,
//       createdBy: userId,
//       createdAt: Date.now(),
//     });

//     // Notification Logic
//     if (args.assignedTo && args.assignedTo !== userId) {
//       await ctx.db.insert("notifications", {
//         userId: args.assignedTo,
//         workspaceId: args.workspaceId,
//         type: "task",
//         itemId: taskId,
//         title: "New Task Assigned",
//         body: `You have been assigned to: ${args.title}`,
//         isRead: false,
//         fromUserId: userId
//       });
//     }

//     return taskId;
//   },
// });

// export const update = mutation({
//   args: {
//     id: v.id("tasks"), // Standardizing on id
//     title: v.optional(v.string()),
//     description: v.optional(v.string()),
//     priority: v.optional(v.union(v.literal("low"), v.literal("medium"), v.literal("high"))),
//     completed: v.optional(v.boolean()),
//     dueDate: v.optional(v.string()),
//     assignedTo: v.optional(v.id("users")),
//     subtasks: v.optional(v.array(v.string())),
//   },
//   handler: async (ctx, args) => {
//     const userId = await getAuthUserId(ctx);
//     if (!userId) throw new Error("Unauthorized");

//     const { id, ...updates } = args;
//     const task = await ctx.db.get(id);
//     if (!task) throw new Error("Task not found");

//     if (updates.assignedTo) {
//       const membership = await ctx.db
//         .query("members")
//         .withIndex("by_workspace_id_user_id", (q) =>
//           q.eq("workspaceId", task.workspaceId).eq("userId", updates.assignedTo!)
//         )
//         .unique();
//       if (!membership) throw new Error("Assigned user is not a member of this workspace");
//     }

//     await ctx.db.patch(id, updates);

//     // Notification: If assignedTo changed and is not self
//     if (updates.assignedTo && updates.assignedTo !== userId && updates.assignedTo !== task.assignedTo) {
//       await ctx.db.insert("notifications", {
//         userId: updates.assignedTo,
//         workspaceId: task.workspaceId,
//         type: "task",
//         itemId: id,
//         title: "Task Assigned",
//         body: `You have been assigned to: ${updates.title || task.title || "a task"}`,
//         isRead: false,
//         fromUserId: userId
//       });
//     }
//   },
// });

// export const remove = mutation({
//   args: {
//     id: v.id("tasks"),
//   },
//   handler: async (ctx, args) => {
//     const userId = await getAuthUserId(ctx);
//     if (!userId) throw new Error("Unauthorized");

//     // Optional: Check if creator or admin
//     // For now allow deletion as per basic reqs or creator only
//     // const task = await ctx.db.get(args.id);
//     // if (task && task.createdBy !== userId) {
//     // Check if admin?
//     // throw new Error("Unauthorized"); 
//     // }

//     await ctx.db.delete(args.id);
//   },
// });
