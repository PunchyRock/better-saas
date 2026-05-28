"use client";

import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { NotificationPanel } from "@/components/features/notification-panel";
import { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

interface DashboardHeaderProps {
  userId?: string;
}

export function DashboardHeader({ userId }: DashboardHeaderProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const unreadCount = useQuery(
    api.notifications.getUnreadCount,
    userId ? { userId: userId as any } : "skip"
  );

  return (
    <header className="border-b px-6 py-3 flex items-center justify-between">
      <h1 className="text-lg font-semibold">Dashboard</h1>

      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="relative"
          onClick={() => setShowNotifications(!showNotifications)}
        >
          <Bell className="h-5 w-5" />
          {unreadCount && unreadCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
            >
              {unreadCount}
            </Badge>
          )}
        </Button>
      </div>

      {showNotifications && (
        <NotificationPanel
          userId={userId}
          onClose={() => setShowNotifications(false)}
        />
      )}
    </header>
  );
}
