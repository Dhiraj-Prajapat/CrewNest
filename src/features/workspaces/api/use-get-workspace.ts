import { useQuery } from 'convex/react';

import { api } from '@/../convex/_generated/api';
import type { Id } from '@/../convex/_generated/dataModel';

interface useGetWorkspaceProps {
  id: Id<'workspaces'> | null;
}

export const useGetWorkspace = ({ id }: useGetWorkspaceProps) => {
  const data = useQuery(api.workspaces.getById, id ? { id } : 'skip');
  const isLoading = data === undefined;

  return { data, isLoading };
};