"use client";

import { Bell, Check, CheckCheck, Info, AlertTriangle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

// Mock notifications - in production, these would come from Convex real-time queries
const mockNotifications = [
  {
    id: "1",
    title: "Welcome!",
    message: "Your account has been created successfully.",
    type: "success" as const,
    read: false,
    createdAt: "Just now",
  },
  {
    id: "2",
    title: "New Feature",
    message: "Check out our new dashboard analytics.",
    type: "info" as const,
    read: false,
    createdAt: "1 hour ago",
  },
  {
    id: "3",
    title: "Subscription Active",
    message: "Your Pro plan is now active.",
    type: "success" as const,
    read: true,
    createdAt: "2 hours ago",
  },
];

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

interface NotificationPanelProps {
  onClose: () => void;
}

export function NotificationPanel({ onClose }: NotificationPanelProps) {
  return (
    <div className="fixed inset-0 z-50" onClick={onClose}>
      <div className="fixed right-4 top-14 w-96 z-50">
        <Card onClick={(e) => e.stopPropagation()}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg">Notifications</CardTitle>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm">
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
              {mockNotifications.map((notification, i) => {
                const Icon = typeIcons[notification.type];
                return (
                  <div key={notification.id}>
                    <div
                      className={`flex gap-3 p-4 hover:bg-muted/50 cursor-pointer ${
                        !notification.read ? "bg-muted/30" : ""
                      }`}
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
                          {notification.createdAt}
                        </p>
                      </div>
                    </div>
                    {i < mockNotifications.length - 1 && <Separator />}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
