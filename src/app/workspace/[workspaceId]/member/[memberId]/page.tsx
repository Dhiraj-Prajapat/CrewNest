'use client';

import { AlertTriangle, Loader } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import type { Id } from '@/../convex/_generated/dataModel';
import { useCreateOrGetConversation } from '@/features/conversations/api/useCreateOrGetConversation';
import { useMemberId } from '@/hooks/useMemberId';
import { useWorkspaceId } from '@/hooks/useWorkspaceId';

import { Conversation } from './conversation';

const MemberIdPage = () => {
  const workspaceId = useWorkspaceId();
  const memberId = useMemberId();

  const [conversationId, setConversationId] = useState<Id<'conversations'> | null>(null);

  const { mutate, isPending } = useCreateOrGetConversation();

  useEffect(() => {
    if (!workspaceId || !memberId) return;

    mutate(
      {
        workspaceId,
        memberId,
      },
      {
        onSuccess: (data) => setConversationId(data),
        onError: () => {
          toast.error('Failed to create or get conversation.');
        },
      },
    );
  }, [workspaceId, memberId, mutate]);

  if (isPending) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader className="size-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!conversationId) {
    return (
      <div className="h-full flex-col items-center justify-center gap-y-2">
        <AlertTriangle className="size-6 text-muted-foreground" />

        <span className="text-sm text-muted-foreground">Conversation not found.</span>
      </div>
    );
  }

  return <Conversation id={conversationId} />;
};

export default MemberIdPage;
