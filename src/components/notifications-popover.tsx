"use client";

import { Bell, Check, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/../convex/_generated/api";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState } from "react";
import { cn } from "@/lib/utils";

export const NotificationsPopover = () => {
    const workspaceId = useWorkspaceId();
    const router = useRouter();
    const [open, setOpen] = useState(false);

    const notifications = useQuery(api.notifications.get, { workspaceId });
    const markRead = useMutation(api.notifications.markRead);
    const clearAll = useMutation(api.notifications.clearAll);

    // Calculate unread count (since backend returns all, we filter here for badge, or could use count query)
    const unreadCount = notifications?.filter(n => !n.isRead).length || 0;

    const handleNotificationClick = async (notif: any) => {
        setOpen(false);
        // Mark as read
        if (!notif.isRead) {
            await markRead({ id: notif._id });
        }

        // Navigate
        if (notif.type === "task") {
            router.push(`/workspace/${workspaceId}/tasks`);
        } else if (notif.type === "message") {
            // Can we navigate to specific message? 
            // We know itemId is messageId. We can fetch message to get conversationId/channelId?
            // For now, let's just go to DM landing or we need more info in notification.
            // Ideally, store conversationId in notification or fetch message details.
            // Since we stored messageId, let's just go to DMs generally because looking up message takes time.
            // Actually, querying the message to get channel/convo is better UX. 
            // But simple start: DMs page.
            router.push(`/workspace/${workspaceId}/dms`);
        }
    };

    const handleClearAll = async () => {
        try {
            await clearAll({ workspaceId });
            toast.success("Notifications cleared");
        } catch (error) {
            toast.error("Failed to clear notifications");
        }
    }

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button variant="transparent" size="iconSm" className="relative group">
                    <Bell className="size-5 text-white group-hover:scale-110 transition-transform" />
                    {unreadCount > 0 && (
                        <span className="absolute top-1.5 right-1.5 size-2.5 bg-red-500 rounded-full border-2 border-primary ring-1 ring-white" />
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent side="bottom" align="end" className="w-[320px] p-0">
                <div className="flex items-center justify-between p-3 border-b bg-muted/40">
                    <h4 className="font-semibold text-sm">Notifications</h4>
                    {notifications && notifications.length > 0 && (
                        <Button
                            variant="ghost"
                            size="sm"
                            className="h-auto px-2 text-xs text-muted-foreground hover:text-destructive"
                            onClick={handleClearAll}
                        >
                            Clear all
                        </Button>
                    )}
                </div>

                <div className="max-h-[300px] overflow-y-auto">
                    {!notifications ? (
                        <div className="p-4 text-center text-xs text-muted-foreground">Loading...</div>
                    ) : notifications.length === 0 ? (
                        <div className="p-8 text-center text-xs text-muted-foreground flex flex-col items-center gap-2">
                            <Bell className="size-8 opacity-20" />
                            No notifications
                        </div>
                    ) : (
                        <div className="flex flex-col">
                            {notifications.map((notif) => (
                                <button
                                    key={notif._id}
                                    onClick={() => handleNotificationClick(notif)}
                                    className={cn(
                                        "flex flex-col gap-1 p-3 text-left hover:bg-muted/50 transition-colors border-b last:border-0",
                                        !notif.isRead && "bg-blue-50/50 dark:bg-blue-900/10"
                                    )}
                                >
                                    <div className="flex items-start justify-between w-full">
                                        <span className="text-xs font-semibold">{notif.title}</span>
                                        {!notif.isRead && (
                                            <span className="size-2 bg-blue-500 rounded-full mt-1.5 shrink-0" />
                                        )}
                                    </div>
                                    <p className="text-xs text-muted-foreground line-clamp-2">{notif.body}</p>
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </PopoverContent>
        </Popover>
    );
};
