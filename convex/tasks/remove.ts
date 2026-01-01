import { v } from "convex/values";
import { mutation } from "../_generated/server";

export default mutation({
    args: {
        taskId: v.id("tasks"),
    },
    handler: async (ctx, args) => {
        const existing = await ctx.db.get(args.taskId);
        if (!existing) {
            throw new Error("Task not found");
        }

        await ctx.db.delete(args.taskId);
    },
});
