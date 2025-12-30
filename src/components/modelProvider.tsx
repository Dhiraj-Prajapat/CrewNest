'use client';

import { useEffect, useState } from 'react';

import { CreateWorkspaceModel } from '@/features/workspaces/components/createWorkspaceModel';
import { CreateChannelModel } from '@/features/channels/components/createChannelModel';

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return;

  return (
    <>
      <CreateChannelModel />
      <CreateWorkspaceModel />
    </>
  );
};
