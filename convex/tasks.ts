import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// export const createTask = mutation({
//   args: {
//     title: v.string(),
//     status: v.optional(
//       v.union(v.literal("todo"), v.literal("inProgress"), v.literal("done"))
//     ),
    
//     priority: v.optional(
//       v.union(v.literal("low"), v.literal("medium"), v.literal("high"))
//     ),
//     dueDate: v.optional(v.string()),
//     assignedTo: v.optional(v.id("users")),
//     subtasks: v.optional(
//       v.array(
//         v.object({
//           title: v.string(),
//           isDone: v.boolean(),
//         })
//       )
//     ),
//   },
//   handler: async (ctx, args) => {
//     const user = await ctx.auth.getUserIdentity();
//     if (!user) throw new Error("Not authenticated");

//     return await ctx.db.insert("tasks", {
//       title: args.title,
//       status: args.status ?? "todo",
//       priority: args.priority,
//       dueDate: args.dueDate,
//       assignedTo: args.assignedTo,
//       subtasks: args.subtasks ?? [],
//       createdBy: user.subject,
//       createdAt: Date.now(),
//     });
//   },
// });

// export const createTask = mutation({
//   args: {
//     title: v.string(),
//     description: v.optional(v.string()),
//     dueDate: v.optional(v.string()),
//     priority: v.optional(v.union(
//       v.literal("low"),
//       v.literal("medium"),
//       v.literal("high")
//     )),
//     status: v.optional(v.union(
//       v.literal("todo"),
//       v.literal("inProgress"),
//       v.literal("done")
//     )),
//     subtasks: v.optional(v.array(v.object({
//       title: v.string(),
//       isDone: v.boolean(),
//     }))),
//   },
//   handler: async (ctx, args) => {
//     const identity = await ctx.auth.getUserIdentity();
//     if (!identity) throw new Error("User not authenticated");

//     const user = await ctx.db
//       .query("users")
//       // .withIndex("by_email", (q) => q.eq("email", identity.email!))
//        .withIndex("email", (q) => q.eq("email", identity.email!))
//       .unique();

//     if (!user) throw new Error("User not found in users table");

//     await ctx.db.insert("tasks", {
//       title: args.title,
//       description: args.description,
//       dueDate: args.dueDate,
//       priority: args.priority,
//       status: args.status ?? "todo",
//       subtasks: args.subtasks ?? [],
//       createdBy: user._id,
//       createdAt: Date.now(),
//     });
//   },
// });


export const createTask = mutation({
  args: {
    title: v.string(),
    description: v.optional(v.string()),
    status: v.optional(v.union(v.literal("todo"), v.literal("inProgress"), v.literal("done"))),
    priority: v.optional(v.union(v.literal("low"), v.literal("medium"), v.literal("high"))),
    dueDate: v.optional(v.string()),
    assignedTo: v.optional(v.id("users")),
    subtasks: v.optional(
      v.array(
        v.object({
          title: v.string(),
          isDone: v.boolean(),
        })
      )
    ),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    await ctx.db.insert("tasks", {
      title: args.title,
      description: args.description ?? "",
      status: args.status ?? "todo",
      priority: args.priority ?? "medium",
      // dueDate: args.dueDate ?? null,
      // assignedTo: args.assignedTo ?? null,
      subtasks: args.subtasks ?? [],
      createdBy: identity.subject, 
      createdAt: Date.now(),
    });
  },
});

export const getTasks = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("tasks").order("desc").collect();
  },
});

export const updateTaskStatus = mutation({
  args: {
    id: v.id("tasks"),
    status: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, {
      // status: args.status,
      status: args.status as "todo" | "inProgress" | "done",
    });
  },
});
