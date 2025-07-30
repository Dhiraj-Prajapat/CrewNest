import { auth } from "./auth";
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const current = query({
  args: {},
  handler: async (ctx) => {
    const userId = await auth.getUserId(ctx);
    if (!userId) return null;

    const authUser = await ctx.db.get(userId);
    const meta = await ctx.db
      .query("userMetadata")
      .withIndex("by_userId", (q) => q.eq("userId", userId))
      .unique();

    return {
      ...authUser,
      _id: userId,
      hasSeenTour: meta?.tourSeen ?? false,
    };
  },
});

export const markTourSeen = mutation({
  args: { userId: v.id("users") },
  handler: async (ctx, { userId }) => {
    const existing = await ctx.db
      .query("userMetadata")
      .withIndex("by_userId", (q) => q.eq("userId", userId))
      .unique();

    if (existing) {
      await ctx.db.patch(existing._id, { tourSeen: true });
    } else {
      await ctx.db.insert("userMetadata", {
        userId,
        isNewUser: false,
        tourSeen: true,
      });
    }
  },
});