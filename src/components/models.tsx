"use client";

import { useEffect, useState } from "react";
import { CreateWorkspaceModel } from "@/features/workspaces/components/create-workspace-model";
import { CreateChannelModel } from "@/features/channels/Components/create-channel-model";

export const Modals = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <CreateChannelModel />
      <CreateWorkspaceModel />
    </>
  );
};
