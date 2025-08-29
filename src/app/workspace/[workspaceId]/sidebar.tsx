import { Bell, Home, MessageSquare, MoreHorizontal } from "lucide-react";

import { UserButton } from "@/features/auth/components/user-button";
import { WorkspaceSwitcher } from "./workspace-switcher";
import { SidebarButton } from "./sidebar-button";

import { ClipboardList } from "lucide-react";
import { usePathname } from "next/navigation";
import { useWorkspaceId } from "@/hooks/use-workspace-id";

export const Sidebar = () => {
  const pathname = usePathname();
  const workspaceId = useWorkspaceId();
  return (
    <aside
      id="tour-main-sidebar"
      className="w-[70px] h-full bg-primary flex flex-col gap-y-4 items-center pt-[9px] pb-[4px]"
    >
      <div id="tour-workspace-switcher">
        <WorkspaceSwitcher />
      </div>
      <SidebarButton
        icon={Home}
        label="Home"
        isActive={pathname.includes("/workspace")}
      />
      <SidebarButton icon={MessageSquare} label="DMs" />
      <SidebarButton icon={Bell} label="Activity" />

      <SidebarButton
        icon={ClipboardList}
        label="Tasks"
        href={`/workspace/${workspaceId}/tasks`}
        isActive={pathname.includes("/tasks")}
      />

      <SidebarButton icon={MoreHorizontal} label="More" />
      <div className="flex flex-col items-center justify-center gap-y-1 mt-auto">
        <UserButton />
      </div>
    </aside>
  );
};
