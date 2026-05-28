"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Info, Check, AlertTriangle, XCircle, CheckCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const typeIcons = {
  info: Info,
  success: Check,
  warning: AlertTriangle,
  error: XCircle,
};

const typeColors = {
  info: "text-blue-500",
  success: "text-green-500",
  warning: "text-yellow-500",
  error: "text-red-500",
};

function timeAgo(timestamp: number): string {
  const seconds = Math.floor((Date.now() - timestamp) / 1000);
  if (seconds < 60) return "Just now";
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  return `${Math.floor(seconds / 86400)}d ago`;
}

interface NotificationPanelProps {
  userId?: string;
  onClose: () => void;
}

export function NotificationPanel({ userId, onClose }: NotificationPanelProps) {
  const notifications = useQuery(
    api.notifications.getByUserId,
    userId ? { userId: userId as any } : "skip"
  );
  const markAsRead = useMutation(api.notifications.markAsRead);
  const markAllAsRead = useMutation(api.notifications.markAllAsRead);

  const handleMarkAllRead = async () => {
    if (userId) {
      await markAllAsRead({ userId: userId as any });
    }
  };

  const handleMarkRead = async (notificationId: string) => {
    await markAsRead({ notificationId: notificationId as any });
  };

  return (
    <div className="fixed inset-0 z-50" onClick={onClose}>
      <div className="fixed right-4 top-14 w-96 z-50">
        <Card onClick={(e) => e.stopPropagation()}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg">Notifications</CardTitle>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={handleMarkAllRead}>
                <CheckCheck className="h-4 w-4 mr-1" />
                Mark all read
              </Button>
              <Button variant="ghost" size="sm" onClick={onClose}>
                ✕
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="max-h-96 overflow-y-auto">
              {!notifications ? (
                <div className="p-4 text-center text-sm text-muted-foreground">
                  Loading...
                </div>
              ) : notifications.length === 0 ? (
                <div className="p-4 text-center text-sm text-muted-foreground">
                  No notifications yet.
                </div>
              ) : (
                notifications.map((notification, i) => {
                  const Icon = typeIcons[notification.type];
                  return (
                    <div key={notification._id}>
                      <div
                        className={`flex gap-3 p-4 hover:bg-muted/50 cursor-pointer ${
                          !notification.read ? "bg-muted/30" : ""
                        }`}
                        onClick={() => !notification.read && handleMarkRead(notification._id)}
                      >
                        <Icon
                          className={`h-5 w-5 mt-0.5 ${typeColors[notification.type]}`}
                        />
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center gap-2">
                            <p className="text-sm font-medium">
                              {notification.title}
                            </p>
                            {!notification.read && (
                              <Badge
                                variant="secondary"
                                className="h-5 px-1.5 text-xs"
                              >
                                New
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {notification.message}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {timeAgo(notification.createdAt)}
                          </p>
                        </div>
                      </div>
                      {i < notifications.length - 1 && <Separator />}
                    </div>
                  );
                })
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
