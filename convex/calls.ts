import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

// ----------------------
// Call Creation / Join / End
// ----------------------

export const createRoom = mutation({
  args: {
    workspaceId: v.id("workspaces"),
    channelId: v.optional(v.id("channels")),
    conversationId: v.optional(v.id("conversations")),
    type: v.union(v.literal("voice"), v.literal("video")),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Unauthorized");

    const member = await ctx.db
      .query("members")
      .withIndex("by_workspace_id_user_id", (q) =>
        q.eq("workspaceId", args.workspaceId).eq("userId", userId)
      )
      .unique();

    if (!member) throw new Error("Unauthorized");

    const callId = await ctx.db.insert("calls", {
      workspaceId: args.workspaceId,
      channelId: args.channelId,
      conversationId: args.conversationId,
      initiatorId: member._id,
      type: args.type,
      status: "waiting",
      participants: [member._id],
      createdAt: Date.now(),
    });

    return callId;
  },
});

export const joinCall = mutation({
  args: {
    callId: v.id("calls"),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Unauthorized");

    const call = await ctx.db.get(args.callId);
    if (!call) throw new Error("Call not found");

    const member = await ctx.db
      .query("members")
      .withIndex("by_workspace_id_user_id", (q) =>
        q.eq("workspaceId", call.workspaceId).eq("userId", userId)
      )
      .unique();

    if (!member) throw new Error("Unauthorized");

    if (!call.participants.includes(member._id)) {
      await ctx.db.patch(args.callId, {
        participants: [...call.participants, member._id],
        status: "active",
      });
    }

    return call;
  },
});

export const endCall = mutation({
  args: {
    callId: v.id("calls"),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Unauthorized");

    const call = await ctx.db.get(args.callId);
    if (!call) throw new Error("Call not found");

    await ctx.db.patch(args.callId, {
      status: "ended",
      endedAt: Date.now(),
    });

    return call;
  },
});

// ----------------------
// Active / Incoming Calls
// ----------------------

export const getActiveCall = query({
  args: {
    workspaceId: v.id("workspaces"),
    channelId: v.optional(v.id("channels")),
    conversationId: v.optional(v.id("conversations")),
  },
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

    let queryActive = ctx.db
      .query("calls")
      .withIndex("by_workspace_id", (q) => q.eq("workspaceId", args.workspaceId))
      .filter((q) => q.neq(q.field("status"), "ended"));

    if (args.channelId) {
      queryActive = queryActive.filter((q) => q.eq(q.field("channelId"), args.channelId));
    }

    if (args.conversationId) {
      queryActive = queryActive.filter((q) =>
        q.eq(q.field("conversationId"), args.conversationId)
      );
    }

    return await queryActive.first();
  },
});

export const getIncomingCalls = query({
  args: {
    workspaceId: v.id("workspaces"),
  },
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

    const expiredTime = Date.now() - 120000;

    const incomingCalls = await ctx.db
      .query("calls")
      .withIndex("by_workspace_id", (q) => q.eq("workspaceId", args.workspaceId))
      .filter((q) =>
        q.and(
          q.eq(q.field("status"), "waiting"),
          q.neq(q.field("initiatorId"), member._id),
          q.gt(q.field("createdAt"), expiredTime)
        )
      )
      .collect();

    return incomingCalls;
  },
});

// ----------------------
// Cleanup
// ----------------------

export const cleanupExpiredCalls = mutation({
  args: {
    workspaceId: v.id("workspaces"),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Unauthorized");

    const expiredTime = Date.now() - 120000;

    const expiredCalls = await ctx.db
      .query("calls")
      .withIndex("by_workspace_id", (q) => q.eq("workspaceId", args.workspaceId))
      .filter((q) =>
        q.and(
          q.eq(q.field("status"), "waiting"),
          q.lt(q.field("createdAt"), expiredTime)
        )
      )
      .collect();

    for (const expiredCall of expiredCalls) {
      await ctx.db.patch(expiredCall._id, {
        status: "ended",
        endedAt: Date.now(),
      });
    }

    return { cleanedCount: expiredCalls.length };
  },
});

export const cleanupOldCalls = mutation({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Unauthorized");

    const fiveMinutesAgo = Date.now() - 5 * 60 * 1000;

    const oldCalls = await ctx.db
      .query("calls")
      .filter((q) =>
        q.and(
          q.eq(q.field("status"), "waiting"),
          q.lt(q.field("createdAt"), fiveMinutesAgo)
        )
      )
      .collect();

    for (const call of oldCalls) {
      await ctx.db.patch(call._id, {
        status: "ended",
        endedAt: Date.now(),
      });
    }

    return { cleaned: oldCalls.length };
  },
});

// ----------------------
// Call Presence Logic ✅
// ----------------------

export const updateCallPresence = mutation({
  args: {
    callId: v.id("calls"),
    memberId: v.id("members"),
    userId: v.id("users"),
    audioOn: v.boolean(),
    videoOn: v.boolean(),
  },
  handler: async (ctx, args) => {
    let row = await ctx.db
      .query("callPresence")
      .withIndex("by_callId", (q) => q.eq("callId", args.callId))
      .filter((q) => q.eq(q.field("memberId"), args.memberId))
      .unique();

    if (!row) {
      await ctx.db.insert("callPresence", {
        ...args,
        joinedAt: Date.now(),
        leftAt: undefined,
      });
    } else {
      await ctx.db.patch(row._id, {
        audioOn: args.audioOn,
        videoOn: args.videoOn,
        leftAt: undefined,
      });
    }

    return true;
  },
});

export const leaveCallPresence = mutation({
  args: {
    callId: v.id("calls"),
    memberId: v.id("members"),
  },
  handler: async (ctx, args) => {
    let row = await ctx.db
      .query("callPresence")
      .withIndex("by_callId", (q) => q.eq("callId", args.callId))
      .filter((q) => q.eq(q.field("memberId"), args.memberId))
      .unique();

    if (row) {
      await ctx.db.patch(row._id, { leftAt: Date.now() });
    }

    return true;
  },
});

export const getCallParticipants = query({
  args: { callId: v.id("calls") },
  handler: async (ctx, { callId }) => {
    return await ctx.db
      .query("callPresence")
      .withIndex("by_callId", (q) => q.eq("callId", callId))
      .filter((q) =>
        q.or(
          q.eq(q.field("leftAt"), null),
          q.eq(q.field("leftAt"), undefined)
        )
      )
      .collect();
  },
});
