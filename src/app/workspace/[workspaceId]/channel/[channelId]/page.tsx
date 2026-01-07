"use client";

import { Loader, TriangleAlert } from "lucide-react";
import { MessageList } from "@/components/messageList";
import { useGetChannel } from "@/features/channels/api/useGetChannel";
import { useGetMessages } from "@/features/messages/api/useGetMessages";
import { useChannelId } from "@/hooks/useChannelId";

import { ChatInput } from "./chatInput";
import { Header } from "./header";

export default function ChannelIdPage() {
  const channelId = useChannelId();

  const { results, status, loadMore } = useGetMessages({ channelId });
  const { data: channel, isLoading: channelLoading } = useGetChannel({
    id: channelId,
  }) || { data: null, isLoading: true };

  if (channelLoading || status == "LoadingFirstPage") {
    return (
      <div className="flex h-full flex-1 items-center justify-center">
        <Loader className="size-5 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!channel) {
    return (
      <div className="flex h-full flex-1 flex-col items-center justify-center gap-y-2">
        <TriangleAlert className="size-5 text-muted-foreground" />
        <span className="text-sm text-muted-foreground">
          Channel not found.
        </span>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col">
      <Header channelName={channel.name} />

      <MessageList
        channelName={channel.name}
        channelCreationTime={channel._creationTime}
        data={results}
        loadMore={loadMore}
        isLoadingMore={status === "LoadingMore"}
        canLoadMore={status === "CanLoadMore"}
      />

      <ChatInput placeholder={`Message # ${channel.name}`} />
    </div>
  );
}

