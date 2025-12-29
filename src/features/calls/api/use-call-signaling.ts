// "use client";

// import { useMutation, useQuery } from "convex/react";
// import { useCallback, useMemo, useState } from "react";
// import { api } from "@/../convex/_generated/api";
// import type { Id } from "@/../convex/_generated/dataModel";
// import type { CallType } from "../types";

// type CreateCallOptions = {
//   onSuccess?: (callId: Id<"calls">) => void;
//   onError?: (error: Error) => void;
// };

// export const useCreateCall = () => {
//   const [isPending, setIsPending] = useState(false);
//   const mutation = useMutation(api.calls.createRoom);

//   const mutate = useCallback(
//     async (
//       values: {
//         workspaceId: Id<"workspaces">;
//         channelId?: Id<"channels">;
//         conversationId?: Id<"conversations">;
//         type: CallType;
//       },
//       options?: CreateCallOptions
//     ) => {
//       try {
//         setIsPending(true);
//         const callId = await mutation(values);
//         options?.onSuccess?.(callId);
//         return callId;
//       } catch (error) {
//         options?.onError?.(error as Error);
//         throw error;
//       } finally {
//         setIsPending(false);
//       }
//     },
//     [mutation]
//   );

//   return { mutate, isPending };
// };

// export const useJoinCall = () => {
//   const [isPending, setIsPending] = useState(false);
//   const mutation = useMutation(api.calls.joinCall);

//   const mutate = useCallback(
//     async (callId: Id<"calls">) => {
//       try {
//         setIsPending(true);
//         const call = await mutation({ callId });
//         return call;
//       } catch (error) {
//         throw error;
//       } finally {
//         setIsPending(false);
//       }
//     },
//     [mutation]
//   );

//   return { mutate, isPending };
// };

// export const useEndCall = () => {
//   const [isPending, setIsPending] = useState(false);
//   const mutation = useMutation(api.calls.endCall);

//   const mutate = useCallback(
//     async (callId: Id<"calls">) => {
//       try {
//         setIsPending(true);
//         await mutation({ callId });
//       } catch (error) {
//         throw error;
//       } finally {
//         setIsPending(false);
//       }
//     },
//     [mutation]
//   );

//   return { mutate, isPending };
// };

// export const useActiveCall = ({
//   workspaceId,
//   channelId,
//   conversationId,
// }: {
//   workspaceId: Id<"workspaces">;
//   channelId?: Id<"channels">;
//   conversationId?: Id<"conversations">;
// }) => {
//   const data = useQuery(api.calls.getActiveCall, {
//     workspaceId,
//     channelId,
//     conversationId,
//   });

//   const isLoading = data === undefined;

//   return { data, isLoading };
// };

// updated code
"use client";

import { useMutation, useQuery } from "convex/react";
import { useCallback, useState } from "react";
import { api } from "@/../convex/_generated/api";
import type { Id } from "@/../convex/_generated/dataModel";
import type { CallType } from "../types";

// Hook to start (create) a call
export const useCreateCall = () => {
  const [isPending, setIsPending] = useState(false);
  const mutation = useMutation(api.calls.createRoom);

  const mutate = useCallback(
    async (
      values: {
        workspaceId: Id<"workspaces">;
        channelId?: Id<"channels">;
        conversationId?: Id<"conversations">;
        type: CallType;
      },
      options?: {
        onSuccess?: (callId: Id<"calls">) => void;
        onError?: (error: Error) => void;
      }
    ) => {
      try {
        setIsPending(true);
        const callId = await mutation(values);
        options?.onSuccess?.(callId);
        return callId;
      } catch (error) {
        options?.onError?.(error as Error);
        throw error;
      } finally {
        setIsPending(false);
      }
    },
    [mutation]
  );

  return { mutate, isPending };
};

// Hook to join a call
export const useJoinCall = () => {
  const [isPending, setIsPending] = useState(false);
  const mutation = useMutation(api.calls.joinCall);

  const mutate = useCallback(
    async (callId: Id<"calls">) => {
      try {
        setIsPending(true);
        const call = await mutation({ callId });
        return call;
      } catch (error) {
        throw error;
      } finally {
        setIsPending(false);
      }
    },
    [mutation]
  );

  return { mutate, isPending };
};

// Hook to end a call
export const useEndCall = () => {
  const [isPending, setIsPending] = useState(false);
  const mutation = useMutation(api.calls.endCall);

  const mutate = useCallback(
    async (callId: Id<"calls">) => {
      try {
        setIsPending(true);
        await mutation({ callId });
      } catch (error) {
        throw error;
      } finally {
        setIsPending(false);
      }
    },
    [mutation]
  );

  return { mutate, isPending };
};

// Hook to get the active call for a workspace/channel/conversation
export const useActiveCall = ({
  workspaceId,
  channelId,
  conversationId,
}: {
  workspaceId: Id<"workspaces"> | undefined;
  channelId?: Id<"channels">;
  conversationId?: Id<"conversations">;
}) => {
  const data = useQuery(
    api.calls.getActiveCall,
    workspaceId ? { workspaceId, channelId, conversationId } : "skip"
  );
  const isLoading = data === undefined;
  return { data, isLoading };
};

// Hook to get incoming calls for a workspace (used in CallProvider)
export const useIncomingCalls = (workspaceId: Id<"workspaces"> | "skip" | null) => {
  const data = useQuery(
    api.calls.getIncomingCalls,
    workspaceId && workspaceId !== "skip" ? { workspaceId } : "skip"
  );
  const isLoading = data === undefined;
  return { data: data || [], isLoading };
};

// Hook to run expired call cleanup (optional, for periodic cleanup)
export const useCleanupExpiredCalls = () => {
  const mutation = useMutation(api.calls.cleanupExpiredCalls);

  const cleanup = useCallback(
    async (workspaceId: Id<"workspaces">) => {
      try {
        await mutation({ workspaceId });
      } catch (error) {
        // Silently ignore cleanup errors
        console.log(error);
      }
    },
    [mutation]
  );

  return cleanup;
};
