import { action } from "./_generated/server";
import { v } from "convex/values";
import { api } from "./_generated/api";

/**
 * Syncs a Better Auth user into the Convex users table.
 * Called after sign-up or sign-in to ensure the user exists in Convex.
 */
export const syncUser = action({
  args: {
    authUserId: v.string(),
    email: v.string(),
    name: v.string(),
    image: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // Check if user already exists in Convex
    const existing = await ctx.runQuery(api.users.getByAuthUserId, {
      authUserId: args.authUserId,
    });

    if (existing) {
      // Update name/image if changed
      if (existing.name !== args.name || existing.image !== args.image) {
        await ctx.runMutation(api.users.updateProfile, {
          userId: existing._id,
          name: args.name,
        });
      }
      return { userId: existing._id, created: false };
    }

    // Create new user in Convex
    const userId = await ctx.runMutation(api.users.getOrCreate, {
      authUserId: args.authUserId,
      email: args.email,
      name: args.name,
      image: args.image,
    });

    // Create welcome notification
    await ctx.runMutation(api.notifications.create, {
      userId,
      title: "Welcome!",
      message: "Your account has been created. Explore your dashboard to get started.",
      type: "success",
    });

    return { userId, created: true };
  },
});
