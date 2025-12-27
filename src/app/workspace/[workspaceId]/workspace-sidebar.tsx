"use client";

import { usePathname } from "next/navigation";

import { AlertTriangle, HashIcon, Loader } from "lucide-react";

import { useGetChannels } from "@/features/channels/api/use-get-channels";
import { useCreateChannelModel } from "@/features/channels/Store/use-create-channel-model";
import { useCurrentMember } from "@/features/members/api/use-current-member";
import { useGetMembers } from "@/features/members/api/use-get-members";
import { useGetWorkspace } from "@/features/workspaces/api/use-get-workspace";
import { useChannelId } from "@/hooks/use-channel-id";
import { useMemberId } from "@/hooks/use-member-id";
import { useWorkspaceId } from "@/hooks/use-workspace-id";

import { SidebarItem } from "./sidebar-item";
import { UserItem } from "./user-item";
import { WorkspaceHeader } from "./workspace-header";
import { WorkspaceSection } from "./workspace-section";

export const WorkspaceSidebar = () => {
  const workspaceId = useWorkspaceId();
  const pathname = usePathname();
  const channelId = useChannelId();
  const memberId = useMemberId();

  const [_open, setOpen] = useCreateChannelModel();

  const { data: member, isLoading: memberLoading } = useCurrentMember({
    workspaceId,
  });
  const { data: workspace, isLoading: workspaceLoading } = useGetWorkspace({
    id: workspaceId,
  });
  const { data: channels, isLoading: channelsLoading } = useGetChannels({
    workspaceId,
  });
  const { data: members, isLoading: membersLoading } = useGetMembers({
    workspaceId,
  });

  if (memberLoading || workspaceLoading || channelsLoading || membersLoading) {
    return (
      <div className="flex h-full flex-col items-center justify-center bg-primary-l">
        <Loader className="size-5 animate-spin text-white" />
      </div>
    );
  }

  if (!workspace || !member) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-y-2 bg-primary-l">
        <AlertTriangle className="size-5 text-white" />
        <p className="text-sm text-white">Workspace not found.</p>
      </div>
    );
  }

  if (pathname.includes("/member") || pathname.includes("/dms")) {
    return (
      <div className="flex h-full flex-col bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800">
        {/* Header */}
        <div className="h-[49px] flex items-center px-4 border-b border-gray-200 dark:border-gray-800 sticky top-0 bg-white dark:bg-gray-900 z-10">
          <h1 className="text-lg font-bold text-gray-800 dark:text-white">Direct Messages</h1>
        </div>

        {/* User List */}
        <div className="flex-1 overflow-y-auto p-2">
          <div className="space-y-[2px]">
            {members?.map((item) => (
              <UserItem
                key={item._id}
                id={item._id}
                label={item.user.name}
                image={item.user.image}
                variant={item._id === memberId ? "activeMessage" : "message"}
              />
            ))}
            {(!members || members.length === 0) && (
              <div className="p-4 text-center text-sm text-gray-500">
                No members found.
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col gap-y-2 bg-primary-l workspace-sidebar">
      <div id="tour-invite-people">
        <WorkspaceHeader
          workspace={workspace}
          isAdmin={member.role === "admin"}
        />
      </div>

      {/* <div className="mt-3 flex flex-col px-2">
        <SidebarItem label="Threads" icon={MessageSquareText} id="threads" />

        <SidebarItem label="Drafts & Sent" icon={SendHorizonal} id="draft" />
      </div> */}

      {channels && channels.length !== 0 && (
        <WorkspaceSection
          label="Channels"
          hint="Create New channels"
          onNew={member.role === "admin" ? () => setOpen(true) : undefined}
        >
          {channels?.map((item) => (
            <SidebarItem
              variant={channelId === item._id ? "active" : "default"}
              key={item._id}
              id={item._id}
              icon={HashIcon}
              label={item.name}
            />
          ))}
        </WorkspaceSection>
      )}

      {members && members.length !== 0 && (
        <WorkspaceSection
          label="Direct Messages"
          hint="hide or unhide all members"
        // onNew={member.role === "admin" ? () => {} : undefined}
        >
          {members?.map((item) => (
            <UserItem
              key={item._id}
              id={item._id}
              label={item.user.name}
              image={item.user.image}
              variant={item._id === memberId ? "active" : "default"}
            />
          ))}
        </WorkspaceSection>
      )}
    </div>
  );
};
