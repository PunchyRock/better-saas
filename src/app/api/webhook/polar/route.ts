import { Webhooks } from "@polar-sh/nextjs";

export const POST = Webhooks({
  webhookSecret: process.env.POLAR_WEBHOOK_SECRET!,
  onPayload: async (payload) => {
    // Handle all webhook events
    console.log("Polar webhook received:", payload.type);
  },
  onSubscriptionCreated: async (payload) => {
    console.log("Subscription created:", payload.data.id);
    // TODO: Update Convex - create subscription record, set user plan to "pro"
    // You would call a Convex action here to sync the subscription
  },
  onSubscriptionActive: async (payload) => {
    console.log("Subscription active:", payload.data.id);
  },
  onSubscriptionCanceled: async (payload) => {
    console.log("Subscription canceled:", payload.data.id);
    // TODO: Update Convex - mark subscription as canceled, revert to "free" plan
  },
  onSubscriptionRevoked: async (payload) => {
    console.log("Subscription revoked:", payload.data.id);
  },
  onOrderCreated: async (payload) => {
    console.log("Order created:", payload.data.id);
  },
});
