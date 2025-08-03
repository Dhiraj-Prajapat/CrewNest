import { auth } from "./auth";
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// ✅ Sync authenticated user to `users` table
export const syncUser = mutation(async ({ auth, db }) => {
  const identity = await auth.getUserIdentity();
  if (!identity) return null;

  const existing = await db
    .query("users")
    // .withIndex("by_email", (q) => q.eq("email", identity.email!))
    .unique();

  if (existing) return existing._id;

  return db.insert("users", {
    name: identity.name ?? "",
    email: identity.email!,
    // avatarUrl: String(identity.picture ?? ""),
    emailVerificationTime: Date.now(), // optional
  });
});

// ✅ Query the current user
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

// ✅ Mark onboarding tour as seen
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




// import { auth } from "./auth";
// import { mutation, query } from "./_generated/server";
// import { v } from "convex/values";

// export const current = query({
//   args: {},
//   handler: async (ctx) => {
//     // ye aagar use me nahi aaya to hata dena--------------------

//     const current = query({
//       args: {},
//       handler: async (ctx) => {
//         const userId = await auth.getUserId(ctx);
//         if (!userId) return null;

//         const identity = await ctx.auth.getUserIdentity();
//         return {
//           id: userId,
//           name: identity?.name ?? '',
//           email: identity?.email ?? '',
//         };
//       },
//     });
//     //---------------------------------------------------

//     const userId = await auth.getUserId(ctx);
//     if (!userId) return null;

//     const authUser = await ctx.db.get(userId);
//     const meta = await ctx.db
//       .query("userMetadata")
//       .withIndex("by_userId", (q) => q.eq("userId", userId))
//       .unique();

//     return {
//       ...authUser,
//       _id: userId,
//       hasSeenTour: meta?.tourSeen ?? false,
//     };
//   },
// });

// export const markTourSeen = mutation({
//   args: { userId: v.id("users") },
//   handler: async (ctx, { userId }) => {
//     const existing = await ctx.db
//       .query("userMetadata")
//       .withIndex("by_userId", (q) => q.eq("userId", userId))
//       .unique();

//     if (existing) {
//       await ctx.db.patch(existing._id, { tourSeen: true });
//     } else {
//       await ctx.db.insert("userMetadata", {
//         userId,
//         isNewUser: false,
//         tourSeen: true,
//       });
//     }
//   },
// });