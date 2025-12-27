import { getAuthUserId } from "@convex-dev/auth/server";
import { v } from "convex/values";

import type { Id } from "./_generated/dataModel";
import { type QueryCtx, mutation, query } from "./_generated/server";

const populateUser = (ctx: QueryCtx, id: Id<"users">) => {
  return ctx.db.get(id);
};

export const getById = query({
  args: {
    id: v.id("members"),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return null;

    const member = await ctx.db.get(args.id);
    if (!member) return null;

    const currentMember = await ctx.db
      .query("members")
      .withIndex("by_workspace_id_user_id", (q) =>
        q.eq("workspaceId", member.workspaceId).eq("userId", userId)
      )
      .unique();

    if (!currentMember) return null;

    const user = await populateUser(ctx, member.userId);
    if (!user) return null;

    return {
      ...member,
      user,
    };
  },
});

export const get = query({
  args: { workspaceId: v.id("workspaces") },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return [];

    const member = await ctx.db
      .query("members")
      .withIndex("by_workspace_id_user_id", (q) =>
        q.eq("workspaceId", args.workspaceId).eq("userId", userId)
      )
      .unique();

    if (!member) return [];

    const data = await ctx.db
      .query("members")
      .withIndex("by_workspace_id", (q) =>
        q.eq("workspaceId", args.workspaceId)
      )
      .collect();

    const members = [];

    for (const member of data) {
      const user = await populateUser(ctx, member.userId);
      if (user) {
        members.push({
          ...member,
          user,
        });
      }
    }

    return members;
  },
});

export const current = query({
  args: { workspaceId: v.id("workspaces") },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return null;

    const member = await ctx.db
      .query("members")
      .withIndex("by_workspace_id_user_id", (q) =>
        q.eq("workspaceId", args.workspaceId).eq("userId", userId)
      )
      .unique();

    if (!member) return null;

    const user = await populateUser(ctx, member.userId);

    return {
      ...member,
      user,
    };
  },
});

export const update = mutation({
  args: {
    id: v.id("members"),
    role: v.union(v.literal("admin"), v.literal("member")),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Unauthorized.");

    const member = await ctx.db.get(args.id);
    if (!member) throw new Error("Member not found.");

    const currentMember = await ctx.db
      .query("members")
      .withIndex("by_workspace_id_user_id", (q) =>
        q.eq("workspaceId", member.workspaceId).eq("userId", userId)
      )
      .unique();

    if (!currentMember || currentMember.role !== "admin")
      throw new Error("Unauthorized.");

    await ctx.db.patch(args.id, {
      role: args.role,
    });

    return args.id;
  },
});

export const remove = mutation({
  args: {
    id: v.id("members"),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Unauthorized.");

    const member = await ctx.db.get(args.id);
    if (!member) throw new Error("Member not found.");

    const currentMember = await ctx.db
      .query("members")
      .withIndex("by_workspace_id_user_id", (q) =>
        q.eq("workspaceId", member.workspaceId).eq("userId", userId)
      )
      .unique();

    if (!currentMember) throw new Error("Unauthorized.");
    if (member.role === "admin")
      throw new Error("Admin cannot be removed.");
    if (
      currentMember._id === args.id &&
      currentMember.role === "admin"
    )
      throw new Error("Cannot remove if self is an admin.");

    const [messages, reactions, conversations] = await Promise.all([
      ctx.db
        .query("messages")
        .withIndex("by_member_id", (q) => q.eq("memberId", member._id))
        .collect(),
      ctx.db
        .query("reactions")
        .withIndex("by_member_id", (q) => q.eq("memberId", member._id))
        .collect(),
      ctx.db
        .query("conversations")
        .filter((q) =>
          q.or(
            q.eq(q.field("memberOneId"), member._id),
            q.eq(q.field("memberTwoId"), member._id)
          )
        )
        .collect(),
    ]);

    for (const message of messages) await ctx.db.delete(message._id);
    for (const reaction of reactions) await ctx.db.delete(reaction._id);
    for (const conversation of conversations)
      await ctx.db.delete(conversation._id);

    await ctx.db.delete(args.id);

    return args.id;
  },
});

/* -------------------- NEW API FOR TASK ASSIGNMENT -------------------- */

// Minimal list for dropdowns
export const listAssignable = query({
  args: { workspaceId: v.id("workspaces") },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return [];

    // Ensure requester is in workspace
    const currentMember = await ctx.db
      .query("members")
      .withIndex("by_workspace_id_user_id", (q) =>
        q.eq("workspaceId", args.workspaceId).eq("userId", userId)
      )
      .unique();

    if (!currentMember) return [];

    const members = await ctx.db
      .query("members")
      .withIndex("by_workspace_id", (q) =>
        q.eq("workspaceId", args.workspaceId)
      )
      .collect();

    const result = [];
    for (const member of members) {
      const user = await populateUser(ctx, member.userId);
      if (user) {
        result.push({
          _id: member._id,
          role: member.role,
          name: user.name || "Unnamed User",
          email: user.email || null,
        });
      }
    }
    return result;
  },
});

// Validate if a member exists in workspace (before assigning a task)
export const validateMemberForWorkspace = query({
  args: {
    workspaceId: v.id("workspaces"),
    memberId: v.id("members"),
  },
  handler: async (ctx, args) => {
    const member = await ctx.db.get(args.memberId);
    if (!member) return false;
    return member.workspaceId === args.workspaceId;
  },
});

export const getWorkspaceMembers = query({
  args: { workspaceId: v.id("workspaces") },
  handler: async (ctx, args) => {
    const members = await ctx.db
      .query("members")
      .filter((q) => q.eq(q.field("workspaceId"), args.workspaceId))
      .collect();

    const userIds = members.map((m) => m.userId);
    // const users = await ctx.db.getMany(userIds);
    const users = await Promise.all(userIds.map((id) => ctx.db.get(id)));


    return members.map((m) => {
      const user = users.find((u) => u?._id === m.userId);
      return {
        id: m.userId,
        email: user?.email ?? "",
        name: user?.name ?? user?.email ?? "",
      };
    });
  },
});








//task wala test kar raha hu upper

// import { getAuthUserId } from '@convex-dev/auth/server';
// import { v } from 'convex/values';

// import type { Id } from './_generated/dataModel';
// import { type QueryCtx, mutation, query } from './_generated/server';

// const populateUser = (ctx: QueryCtx, id: Id<'users'>) => {
//   return ctx.db.get(id);
// };

// export const getById = query({
//   args: {
//     id: v.id('members'),
//   },
//   handler: async (ctx, args) => {
//     const userId = await getAuthUserId(ctx);

//     if (!userId) return null;

//     const member = await ctx.db.get(args.id);

//     if (!member) return null;

//     const currentMember = await ctx.db
//       .query('members')
//       .withIndex('by_workspace_id_user_id', (q) => q.eq('workspaceId', member.workspaceId).eq('userId', userId))
//       .unique();

//     if (!currentMember) return null;

//     const user = await populateUser(ctx, member.userId);

//     if (!user) return null;

//     return {
//       ...member,
//       user,
//     };
//   },
// });

// export const get = query({
//   args: { workspaceId: v.id('workspaces') },
//   handler: async (ctx, args) => {
//     const userId = await getAuthUserId(ctx);

//     if (!userId) return [];

//     const member = await ctx.db
//       .query('members')
//       .withIndex('by_workspace_id_user_id', (q) => q.eq('workspaceId', args.workspaceId).eq('userId', userId))
//       .unique();

//     if (!member) return [];

//     const data = await ctx.db
//       .query('members')
//       .withIndex('by_workspace_id', (q) => q.eq('workspaceId', args.workspaceId))
//       .collect();

//     const members = [];

//     for (const member of data) {
//       const user = await populateUser(ctx, member.userId);

//       if (user) {
//         members.push({
//           ...member,
//           user,
//         });
//       }
//     }

//     return members;
//   },
// });

// export const current = query({
//   args: { workspaceId: v.id('workspaces') },
//   handler: async (ctx, args) => {
//     const userId = await getAuthUserId(ctx);

//     if (!userId) return null;

//     const member = await ctx.db
//       .query('members')
//       .withIndex('by_workspace_id_user_id', (q) => q.eq('workspaceId', args.workspaceId).eq('userId', userId))
//       .unique();

//     if (!member) return null;

//     return member;
//   },
// });

// export const update = mutation({
//   args: {
//     id: v.id('members'),
//     role: v.union(v.literal('admin'), v.literal('member')),
//   },
//   handler: async (ctx, args) => {
//     const userId = await getAuthUserId(ctx);

//     if (!userId) throw new Error('Unauthorized.');

//     const member = await ctx.db.get(args.id);

//     if (!member) throw new Error('Member not found.');

//     const currentMember = await ctx.db
//       .query('members')
//       .withIndex('by_workspace_id_user_id', (q) => q.eq('workspaceId', member.workspaceId).eq('userId', userId))
//       .unique();

//     if (!currentMember || currentMember.role !== 'admin') throw new Error('Unauthorized.');

//     await ctx.db.patch(args.id, {
//       role: args.role,
//     });

//     return args.id;
//   },
// });

// export const remove = mutation({
//   args: {
//     id: v.id('members'),
//   },
//   handler: async (ctx, args) => {
//     const userId = await getAuthUserId(ctx);

//     if (!userId) throw new Error('Unauthorized.');

//     const member = await ctx.db.get(args.id);

//     if (!member) throw new Error('Member not found.');

//     const currentMember = await ctx.db
//       .query('members')
//       .withIndex('by_workspace_id_user_id', (q) => q.eq('workspaceId', member.workspaceId).eq('userId', userId))
//       .unique();

//     if (!currentMember) throw new Error('Unauthorized.');

//     if (member.role === 'admin') throw new Error('Admin cannot be removed.');

//     if (currentMember._id === args.id && currentMember.role === 'admin') throw new Error('Cannot remove if self is an admin.');

//     const [messages, reactions, conversations] = await Promise.all([
//       ctx.db
//         .query('messages')
//         .withIndex('by_member_id', (q) => q.eq('memberId', member._id))
//         .collect(),
//       ctx.db
//         .query('reactions')
//         .withIndex('by_member_id', (q) => q.eq('memberId', member._id))
//         .collect(),
//       ctx.db
//         .query('conversations')
//         .filter((q) => q.or(q.eq(q.field('memberOneId'), member._id), q.eq(q.field('memberTwoId'), member._id)))
//         .collect(),
//     ]);

//     for (const message of messages) await ctx.db.delete(message._id);

//     for (const reaction of reactions) await ctx.db.delete(reaction._id);

//     for (const conversation of conversations) await ctx.db.delete(conversation._id);

//     await ctx.db.delete(args.id);

//     return args.id;
//   },
// });