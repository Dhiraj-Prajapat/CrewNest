import { v } from "convex/values";
<<<<<<< HEAD

import { query } from "../_generated/server";


=======
import { query } from "../_generated/server";

>>>>>>> 98ce06dff3c1969d0a6a99826e3efe4921540848
export const get = query({
  args: {
    workspaceId: v.id("workspaces"),
  },
  handler: async (ctx, { workspaceId }) => {
<<<<<<< HEAD
    const tasks = await ctx.db
      .query("tasks")
      .withIndex("by_workspace", (q) => q.eq("workspaceId", workspaceId))
      .collect();

    return tasks;
  },
});

=======
    return await ctx.db
      .query("tasks")
      .withIndex("by_workspace", (q) => q.eq("workspaceId", workspaceId))
      .collect();
  },
});
>>>>>>> 98ce06dff3c1969d0a6a99826e3efe4921540848
