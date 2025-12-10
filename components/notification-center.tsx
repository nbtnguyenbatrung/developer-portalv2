"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Bell, CheckCheck, Info, AlertTriangle, Megaphone } from "lucide-react"
import { cn } from "@/lib/utils"

// Mock notification data
const mockNotifications = [
  {
    id: "notif_1",
    title: "API Rate Limit Warning",
    message: "You've reached 80% of your API rate limit for this month.",
    type: "warning",
    read: false,
    date: "2023-05-10T14:30:00Z",
  },
  {
    id: "notif_2",
    title: "New API Version Available",
    message: "Version 2.1 of the Payments API is now available with new features.",
    type: "info",
    read: false,
    date: "2023-05-09T10:15:00Z",
  },
  {
    id: "notif_3",
    title: "Scheduled Maintenance",
    message: "Scheduled maintenance on May 15, 2023, from 2:00 AM to 4:00 AM UTC.",
    type: "announcement",
    read: true,
    date: "2023-05-08T09:45:00Z",
  },
  {
    id: "notif_4",
    title: "API Key Rotation Reminder",
    message: "Your API key has not been rotated in 90 days. Consider rotating for security.",
    type: "warning",
    read: true,
    date: "2023-05-07T16:20:00Z",
  },
  {
    id: "notif_5",
    title: "Webhook Delivery Failed",
    message: "Webhook delivery to https://example.com/webhooks failed. Please check your endpoint.",
    type: "error",
    read: true,
    date: "2023-05-06T11:30:00Z",
  },
]

type NotificationType = "info" | "warning" | "error" | "announcement"

interface Notification {
  id: string
  title: string
  message: string
  type: NotificationType
  read: boolean
  date: string
}

export function NotificationCenter() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications)
  const [open, setOpen] = useState(false)

  const unreadCount = notifications.filter((n) => !n.read).length

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })))
  }

  const markAsRead = (id: string) => {
    setNotifications(notifications.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const getNotificationIcon = (type: NotificationType) => {
    switch (type) {
      case "info":
        return <Info className="h-4 w-4 text-blue-500" />
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-amber-500" />
      case "error":
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      case "announcement":
        return <Megaphone className="h-4 w-4 text-purple-500" />
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

    if (diffDays === 0) {
      const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
      if (diffHours === 0) {
        const diffMinutes = Math.floor(diffMs / (1000 * 60))
        return `${diffMinutes} minute${diffMinutes !== 1 ? "s" : ""} ago`
      }
      return `${diffHours} hour${diffHours !== 1 ? "s" : ""} ago`
    } else if (diffDays < 7) {
      return `${diffDays} day${diffDays !== 1 ? "s" : ""} ago`
    } else {
      return date.toLocaleDateString()
    }
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge
              className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center"
              variant="destructive"
            >
              {unreadCount}
            </Badge>
          )}
          <span className="sr-only">Notifications</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[380px] p-0" align="end">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="font-medium">Notifications</h3>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" onClick={markAllAsRead}>
              <CheckCheck className="mr-2 h-4 w-4" />
              Mark all as read
            </Button>
          )}
        </div>
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-3 p-0 h-auto">
            <TabsTrigger value="all" className="rounded-none data-[state=active]:bg-accent">
              All
            </TabsTrigger>
            <TabsTrigger value="unread" className="rounded-none data-[state=active]:bg-accent">
              Unread {unreadCount > 0 && `(${unreadCount})`}
            </TabsTrigger>
            <TabsTrigger value="alerts" className="rounded-none data-[state=active]:bg-accent">
              Alerts
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="max-h-[400px] overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8">
                <Bell className="h-8 w-8 text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground">No notifications</p>
              </div>
            ) : (
              <div>
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={cn(
                      "p-4 border-b last:border-b-0 cursor-pointer hover:bg-accent/50 transition-colors",
                      !notification.read && "bg-accent/20",
                    )}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <div className="flex gap-3">
                      <div className="mt-0.5">{getNotificationIcon(notification.type)}</div>
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <h4 className={cn("text-sm font-medium", !notification.read && "font-semibold")}>
                            {notification.title}
                          </h4>
                          <span className="text-xs text-muted-foreground">{formatDate(notification.date)}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{notification.message}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="unread" className="max-h-[400px] overflow-y-auto">
            {notifications.filter((n) => !n.read).length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8">
                <CheckCheck className="h-8 w-8 text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground">No unread notifications</p>
              </div>
            ) : (
              <div>
                {notifications
                  .filter((n) => !n.read)
                  .map((notification) => (
                    <div
                      key={notification.id}
                      className="p-4 border-b last:border-b-0 cursor-pointer hover:bg-accent/50 transition-colors bg-accent/20"
                      onClick={() => markAsRead(notification.id)}
                    >
                      <div className="flex gap-3">
                        <div className="mt-0.5">{getNotificationIcon(notification.type)}</div>
                        <div className="space-y-1">
                          <div className="flex items-center justify-between">
                            <h4 className="text-sm font-medium font-semibold">{notification.title}</h4>
                            <span className="text-xs text-muted-foreground">{formatDate(notification.date)}</span>
                          </div>
                          <p className="text-sm text-muted-foreground">{notification.message}</p>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="alerts" className="max-h-[400px] overflow-y-auto">
            {notifications.filter((n) => n.type === "warning" || n.type === "error").length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8">
                <Info className="h-8 w-8 text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground">No alerts</p>
              </div>
            ) : (
              <div>
                {notifications
                  .filter((n) => n.type === "warning" || n.type === "error")
                  .map((notification) => (
                    <div
                      key={notification.id}
                      className={cn(
                        "p-4 border-b last:border-b-0 cursor-pointer hover:bg-accent/50 transition-colors",
                        !notification.read && "bg-accent/20",
                      )}
                      onClick={() => markAsRead(notification.id)}
                    >
                      <div className="flex gap-3">
                        <div className="mt-0.5">{getNotificationIcon(notification.type)}</div>
                        <div className="space-y-1">
                          <div className="flex items-center justify-between">
                            <h4 className={cn("text-sm font-medium", !notification.read && "font-semibold")}>
                              {notification.title}
                            </h4>
                            <span className="text-xs text-muted-foreground">{formatDate(notification.date)}</span>
                          </div>
                          <p className="text-sm text-muted-foreground">{notification.message}</p>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
        <div className="p-2 border-t text-center">
          <Button variant="ghost" size="sm" className="w-full" asChild>
            <a href="/dashboard/notifications">View all notifications</a>
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
