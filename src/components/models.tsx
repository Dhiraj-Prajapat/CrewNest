"use client";

import { useEffect, useState } from "react";
import { CreateWorkspaceModel } from "@/features/workspaces/components/createWorkspaceModel";
import { CreateChannelModel } from "@/features/channels/components/createChannelModel";

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
