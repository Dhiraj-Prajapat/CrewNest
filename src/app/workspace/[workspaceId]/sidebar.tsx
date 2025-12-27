<<<<<<< HEAD
import { Bell, Home, MessageSquare, MoreHorizontal, UserPlus, HashIcon } from "lucide-react";
=======
import { Bell, Home, MessageSquare, MoreHorizontal } from "lucide-react";
>>>>>>> 98ce06dff3c1969d0a6a99826e3efe4921540848

import { UserButton } from "@/features/auth/components/user-button";
import { WorkspaceSwitcher } from "./workspace-switcher";
import { SidebarButton } from "./sidebar-button";

import { useGetWorkspace } from "@/features/workspaces/api/use-get-workspace"; // Add this
import { InviteModal } from "./invite-model"; // Add this
import { JoinWorkspaceModal } from "./join-workspace-modal"; // Add this
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";

import { ClipboardList } from "lucide-react";
import { usePathname } from "next/navigation";
import { useWorkspaceId } from "@/hooks/use-workspace-id";

export const Sidebar = () => {
  const pathname = usePathname();
  const workspaceId = useWorkspaceId();
<<<<<<< HEAD
  const [inviteOpen, setInviteOpen] = useState(false);
  const [joinOpen, setJoinOpen] = useState(false);

  const { data: workspace } = useGetWorkspace({ id: workspaceId });

=======
>>>>>>> 98ce06dff3c1969d0a6a99826e3efe4921540848
  return (
    <aside
      id="tour-main-sidebar"
      className="w-[70px] h-full bg-primary flex flex-col gap-y-4 items-center pt-[9px] pb-[4px]"
    >
      <InviteModal
        open={inviteOpen}
        setOpen={setInviteOpen}
        name={workspace?.name ?? "Workspace"}
        joinCode={workspace?.joinCode ?? ""}
      />
      <JoinWorkspaceModal open={joinOpen} setOpen={setJoinOpen} />
      <div id="tour-workspace-switcher">
        <WorkspaceSwitcher />
      </div>
      <SidebarButton
        icon={Home}
        label="Home"
        href={`/workspace/${workspaceId}`}
        isActive={pathname.includes("/workspace") && !pathname.includes("/member") && !pathname.includes("/dms") && !pathname.includes("/tasks")}
      />
<<<<<<< HEAD
      <SidebarButton
        icon={MessageSquare}
        label="DMs"
        href={`/workspace/${workspaceId}/dms`}
        isActive={pathname.includes("/member") || pathname.includes("/dms")}
      />

=======
      <SidebarButton icon={MessageSquare} label="DMs" />
      <SidebarButton icon={Bell} label="Activity" />
>>>>>>> 98ce06dff3c1969d0a6a99826e3efe4921540848

      <SidebarButton
        icon={ClipboardList}
        label="Tasks"
        href={`/workspace/${workspaceId}/tasks`}
        isActive={pathname.includes("/tasks")}
      />

<<<<<<< HEAD

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          {/* Wrapper div to allow trigger to work without passing onClick to SidebarButton if it doesn't support it well, 
                 but we need SidebarButton to trigger it. 
                 Since SidebarButton returns a link or div, we can wrap it. 
                 Or better, just put the icon here if SidebarButton is strict. 
                 Let's assume we use SidebarButton as visual. 
                 Actually shadcn DropdownMenuTrigger expects a single child ref. 
                 SidebarButton needs to forward ref or we use a plain button here matching style.
             */}
          <div className="cursor-pointer">
            <SidebarButton icon={MoreHorizontal} label="More" />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="right" align="center" forceMount>
          <DropdownMenuItem onClick={() => setInviteOpen(true)} className="cursor-pointer">
            <UserPlus className="size-4 mr-2" />
            Invite people
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setJoinOpen(true)} className="cursor-pointer">
            <HashIcon className="size-4 mr-2" />
            Join Workspace
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
=======
      <SidebarButton icon={MoreHorizontal} label="More" />
>>>>>>> 98ce06dff3c1969d0a6a99826e3efe4921540848
      <div className="flex flex-col items-center justify-center gap-y-1 mt-auto">
        <UserButton />
      </div>
    </aside>
  );
};
