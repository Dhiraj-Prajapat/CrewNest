```typescript
import { Home, MessageSquare, MoreHorizontal, UserPlus, HashIcon, ClipboardList } from "lucide-react";
import { UserButton } from "@/features/auth/components/user-button";
import { WorkspaceSwitcher } from "./workspace-switcher";
import { SidebarButton } from "./sidebar-button";
import { usePathname } from "next/navigation";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { JoinWorkspaceModal } from "@/components/modals/join-workspace-modal";
import InviteModal from "@/components/modals/invite-modal"; // Ensure this import path is correct
import SettingsModal from "@/components/modals/settings-modal";

export const Sidebar = () => {
  const pathname = usePathname();
  const workspaceId = useWorkspaceId();
  const [inviteOpen, setInviteOpen] = useState(false);
  const [joinOpen, setJoinOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <aside
      id="tour-main-sidebar"
      className="w-[70px] h-full bg-[#481349] flex flex-col gap-y-4 items-center pt-[9px] pb-4"
    >
      <WorkspaceSwitcher />
      <SidebarButton
        icon={Home}
        label="Home"
        href={`/ workspace / ${ workspaceId } `}
        isActive={pathname.includes("/workspace") && !pathname.includes("/member") && !pathname.includes("/dms") && !pathname.includes("/tasks")}
      />
      <SidebarButton
        icon={MessageSquare}
        label="DMs"
        href={`/ workspace / ${ workspaceId }/dms`}
isActive = { pathname.includes("/member") || pathname.includes("/dms") }
  />

      <SidebarButton
        icon={ClipboardList}
        label="Tasks"
        href={`/workspace/${workspaceId}/tasks`}
        isActive={pathname.includes("/tasks")}
      />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div>
            <SidebarButton icon={MoreHorizontal} label="More" />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="right" align="start" className="w-56">
          <DropdownMenuItem onClick={() => setInviteOpen(true)}>
            <UserPlus className="size-4 mr-2" />
            Invite Members
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setJoinOpen(true)}>
            <HashIcon className="size-4 mr-2" />
            Join Workflow
          </DropdownMenuItem>
           <DropdownMenuItem onClick={() => setSettingsOpen(true)}>
            <div className="flex items-center">
             Settings
             </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <div className="flex flex-col items-center justify-center gap-y-1 mt-auto">
        <UserButton />
      </div>

      <InviteModal 
        open={inviteOpen} 
        setOpen={setInviteOpen} 
        name="Workspace" 
        joinCode="123456" 
        workspaceId={workspaceId}
      />
      
      <JoinWorkspaceModal 
        open={joinOpen} 
        setOpen={setJoinOpen} 
      />

      <SettingsModal 
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
      />
    </aside >
  );
};
```
