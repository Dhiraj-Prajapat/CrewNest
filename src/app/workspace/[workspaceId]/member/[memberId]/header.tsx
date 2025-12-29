// 'use client';

// import { FaChevronDown } from 'react-icons/fa';

// import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
// import { Button } from '@/components/ui/button';

// interface HeaderProps {
//   memberName?: string;
//   memberImage?: string;
//   onClick?: () => void;
// }

// export const Header = ({ memberName = 'Member', memberImage, onClick }: HeaderProps) => {
//   const avatarFallback = memberName.charAt(0).toUpperCase();

//   return (
//     <div className="flex h-[49px] items-center overflow-hidden border-b bg-white px-4">
//       <Button variant="ghost" className="w-auto overflow-hidden px-2 text-lg font-semibold" size="sm" onClick={onClick}>
//         <Avatar className="mr-2 size-6">
//           <AvatarImage src={memberImage} />
//           <AvatarFallback>{avatarFallback}</AvatarFallback>
//         </Avatar>

//         <span className="truncate">{memberName}</span>
//         <FaChevronDown className="ml-2 size-2.5" />
//       </Button>
//     </div>
//   );
// };

// gourav code


'use client';

import { useEffect, useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

import type { Id } from '@/../convex/_generated/dataModel';
import { CallButton } from '@/features/calls/components/CallButton';
import { useWorkspaceId } from '@/hooks/use-workspace-id';
import { useMemberId } from '@/hooks/use-member-id';
import { useCreateOrGetConversation } from '@/features/conversations/api/use-create-or-get-conversation';

interface HeaderProps {
  memberName?: string;
  memberImage?: string;
  onClick?: () => void;
}

export const Header = ({ memberName = 'Member', memberImage, onClick }: HeaderProps) => {
  const avatarFallback = memberName.charAt(0).toUpperCase();

  const workspaceId = useWorkspaceId();
  const memberId = useMemberId();

  const [conversationId, setConversationId] = useState<Id<'conversations'> | null>(null);
  const { mutate: createOrGetConversation } = useCreateOrGetConversation();

  // Automatically create/get conversation on mount
  useEffect(() => {
    if (workspaceId && memberId) {
      createOrGetConversation(
        { workspaceId, memberId },
        {
          onSuccess: (id) => setConversationId(id),
          onError: (err) => console.error("Conversation error:", err),
        }
      );
    }
  }, [workspaceId, memberId, createOrGetConversation, setConversationId]);

  return (
    <div className="flex h-[49px] items-center justify-between overflow-hidden border-b bg-white px-4">
      <Button
        variant="ghost"
        className="w-auto overflow-hidden px-2 text-lg font-semibold"
        size="sm"
        onClick={onClick}
      >
        <Avatar className="mr-2 size-6">
          <AvatarImage src={memberImage} />
          <AvatarFallback>{avatarFallback}</AvatarFallback>
        </Avatar>

        <span className="truncate">{memberName}</span>
        <FaChevronDown className="ml-2 size-2.5" />
      </Button>

      {/* ✅ Call Buttons enabled */}
      {conversationId && workspaceId && (
        <div className="flex items-center gap-2">
          <CallButton
            workspaceId={workspaceId}
            conversationId={conversationId}
            type="voice"
            variant="ghost"
            size="icon"
          />
          <CallButton
            workspaceId={workspaceId}
            conversationId={conversationId}
            type="video"
            variant="ghost"
            size="icon"
          />
        </div>
      )}
    </div>
  );
};
