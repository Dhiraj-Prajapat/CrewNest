// 'use client';

// import { useQuery } from 'convex/react';

// import { api } from '@/../convex/_generated/api';
// import type { Id } from '@/../convex/_generated/dataModel';

// interface UseCurrentMemberProps {
//   workspaceId: Id<'workspaces'>;
// }

// export const useCurrentMember = ({ workspaceId }: UseCurrentMemberProps) => {
//   const data = useQuery(api.members.current, { workspaceId });

//   const isLoading = data === undefined;

//   return { data, isLoading };
// };

// gourav code

'use client';

import { useQuery } from 'convex/react';

import { api } from '@/../convex/_generated/api';
import type { Id } from '@/../convex/_generated/dataModel';

interface UseCurrentMemberProps {
  workspaceId: Id<'workspaces'>;
}

export const useCurrentMember = ({ workspaceId }: UseCurrentMemberProps) => {
  // Skip the query if workspaceId is invalid or "skip"
  const data = useQuery(
    api.members.current, 
    workspaceId && workspaceId !== "skip" ? { workspaceId } : "skip"
  );

  const isLoading = data === undefined;

  return { data, isLoading };
};
