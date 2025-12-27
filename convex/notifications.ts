import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

export const get = query({
    args: {
        workspaceId: v.id("workspaces"),
    },
    handler: async (ctx, args) => {
        const userId = await getAuthUserId(ctx);
        if (!userId) return [];

        const notifications = await ctx.db
            .query("notifications")
            .withIndex("by_user_workspace", (q) =>
                q.eq("userId", userId).eq("workspaceId", args.workspaceId)
            )
            .filter((q) => q.eq(q.field("isRead"), false)) // Only show unread? Or show all and sort? Let's show all but highlight unread.
            // Wait, filter in query or in index?
            // Index contains "isRead". If we want ALL, then we just eq workspace.
            // If we want UNREAD count, we can filter.
            // Let's return ALL, but sorted by time? Scheme didn't have timestamp.
            // I forgot createdAt in schema.
            // Let's add createdAt or use _creationTime. _creationTime is built-in.
            .order("desc") // default order by _creationTime if not specified index sort
            .take(20);

        return notifications;
    },
});

export const count = query({
    args: {
        workspaceId: v.id("workspaces"),
    },
    handler: async (ctx, args) => {
        const userId = await getAuthUserId(ctx);
        if (!userId) return 0;

        const unread = await ctx.db
            .query("notifications")
            .withIndex("by_user_workspace", (q) =>
                q.eq("userId", userId).eq("workspaceId", args.workspaceId).eq("isRead", false)
            )
            .collect();

        return unread.length;
    }
});

export const markRead = mutation({
    args: {
        id: v.id("notifications"),
    },
    handler: async (ctx, args) => {
        const userId = await getAuthUserId(ctx);
        if (!userId) throw new Error("Unauthorized");

        // Verify ownership?
        const notification = await ctx.db.get(args.id);
        if (!notification || notification.userId !== userId) throw new Error("Unauthorized");

        await ctx.db.patch(args.id, { isRead: true });
    },
});

export const clearAll = mutation({
    args: {
        workspaceId: v.id("workspaces"),
    },
    handler: async (ctx, args) => {
        const userId = await getAuthUserId(ctx);
        if (!userId) throw new Error("Unauthorized");

        const notifications = await ctx.db
            .query("notifications")
            .withIndex("by_user_workspace", (q) =>
                q.eq("userId", userId).eq("workspaceId", args.workspaceId)
            )
            .collect();

        for (const notif of notifications) {
            await ctx.db.patch(notif._id, { isRead: true }); // Or delete? "Clear" usually means delete or mark read. Let's mark read for history, or maybe just delete if user wants "clean".
            // User said "notification system... show message notify". Typically cleared means gone from popup.
            // Let's DELETE them to keep it clean.
            await ctx.db.delete(notif._id);
        }
    },
});
