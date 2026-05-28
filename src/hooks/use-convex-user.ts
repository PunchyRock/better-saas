"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useEffect, useState } from "react";

/**
 * Hook to get or sync the current user's Convex record.
 * Calls /api/sync-user on mount to ensure user exists in Convex,
 * then returns real-time Convex data.
 */
export function useConvexUser(authUserId: string | undefined) {
  const [synced, setSynced] = useState(false);

  // Sync user to Convex on mount
  useEffect(() => {
    if (!authUserId || synced) return;
    fetch("/api/sync-user", { method: "POST" })
      .then(() => setSynced(true))
      .catch(console.error);
  }, [authUserId, synced]);

  // Query user from Convex (real-time)
  const user = useQuery(
    api.users.getByAuthUserId,
    authUserId ? { authUserId } : "skip"
  );

  return { user, synced };
}

/**
 * Hook to get real-time notifications for a user.
 */
export function useNotifications(userId: string | undefined) {
  return useQuery(
    api.notifications.getByUserId,
    userId ? { userId: userId as any } : "skip"
  );
}

/**
 * Hook to get unread notification count (real-time).
 */
export function useUnreadCount(userId: string | undefined) {
  return useQuery(
    api.notifications.getUnreadCount,
    userId ? { userId: userId as any } : "skip"
  );
}
