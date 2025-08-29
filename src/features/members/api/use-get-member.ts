// 'use client';

// import { useQuery } from 'convex/react';

// import { api } from '@/../convex/_generated/api';
// import type { Id } from '@/../convex/_generated/dataModel';

// interface UseGetMemberProps {
//   id: Id<'members'>;
// }

// export const useGetMember = ({ id }: UseGetMemberProps) => {
//   const data = useQuery(api.members.getById, { id });

//   const isLoading = data === undefined;

//   return { data, isLoading };
// };

// gourav code


'use client';

import { useQuery } from 'convex/react';

import { api } from '@/../convex/_generated/api';
import type { Id } from '@/../convex/_generated/dataModel';

interface UseGetMemberProps {
  id: Id<'members'>;
}

export const useGetMember = ({ id }: UseGetMemberProps) => {
  // Skip the query if id is invalid or "skip"
  const data = useQuery(
    api.members.getById, 
    id && id !== "skip" ? { id } : "skip"
  );

  const isLoading = data === undefined;

  return { data, isLoading };
};