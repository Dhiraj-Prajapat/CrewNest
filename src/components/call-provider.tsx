// "use client";

// import { useState } from "react";
// import { CallPanel } from "@/features/calls/components/CallPanel";
// import { IncomingCallDialog } from "@/features/calls/components/IncomingCallDialog";
// import { useCallState } from "@/features/calls/store/useCallState";

// export const CallProvider = () => {
//   const { callState } = useCallState();
//   const [incomingCall, setIncomingCall] = useState(null);

//   return (
//     <>
//       <CallPanel />
//       <IncomingCallDialog
//         call={incomingCall}
//         onAccept={() => setIncomingCall(null)}
//         onDecline={() => setIncomingCall(null)}
//       />
//     </>
//   );
// };


// updated code

// "use client";

// import { useState, useEffect } from "react";
// import { CallPanel } from "@/features/calls/components/CallPanel";
// import { IncomingCallDialog } from "@/features/calls/components/IncomingCallDialog";
// import { useCallState } from "@/features/calls/store/useCallState";
// import { useIncomingCalls } from "@/features/calls/api/use-incoming-calls";
// import { useWorkspaceId } from "@/hooks/use-workspace-id";
// import { usePathname } from "next/navigation";

// export const CallProvider = () => {
//   const pathname = usePathname();
//   const { callState } = useCallState();

//   // Only get workspaceId if we're in a workspace route
//   const workspaceId = pathname.includes('/workspace/') ? useWorkspaceId() : null;

//   // Listen for incoming calls
//   const { data: incomingCalls } = useIncomingCalls(workspaceId as any);

//   // Get the first incoming call (you can enhance this logic)
//   const incomingCall = incomingCalls?.[0] || null;

//   const [dismissedCallId, setDismissedCallId] = useState<string | null>(null);

//   // Reset dismissed call when a new call comes in
//   useEffect(() => {
//     if (incomingCall && incomingCall._id !== dismissedCallId) {
//       setDismissedCallId(null);
//     }
//   }, [incomingCall, dismissedCallId]);

//   // Don't show incoming call if it's dismissed or if user is already in a call
//   const shouldShowIncomingCall = incomingCall && 
//     !callState.isInCall && 
//     incomingCall._id !== dismissedCallId;

//   return (
//     <>
//       <CallPanel />
//       <IncomingCallDialog
//         call={shouldShowIncomingCall ? incomingCall : null}
//         onAccept={() => {
//           // The accept logic is handled inside IncomingCallDialog
//         }}
//         onDecline={() => {
//           // Mark this call as dismissed
//           if (incomingCall) {
//             setDismissedCallId(incomingCall._id);
//           }
//         }}
//       />
//     </>
//   );
// };

// second updated code

// "use client";

// import { useState, useEffect } from "react";
// import { CallPanel } from "@/features/calls/components/CallPanel";
// import { IncomingCallDialog } from "@/features/calls/components/IncomingCallDialog";
// import { useCallState } from "@/features/calls/store/useCallState";
// import { useIncomingCalls } from "@/features/calls/api/use-incoming-calls";
// import { useWorkspaceId } from "@/hooks/use-workspace-id";
// import { usePathname } from "next/navigation";

// export const CallProvider = () => {
//   const pathname = usePathname();
//   const { callState } = useCallState();

//   // Always call the hook, but conditionally use the result
//   const rawWorkspaceId = useWorkspaceId();

//   // Only use workspaceId if we're in a workspace route
//   const workspaceId = pathname.includes('/workspace/') ? rawWorkspaceId : null;

//   // Listen for incoming calls - pass "skip" if no workspaceId
//   const { data: incomingCalls } = useIncomingCalls(workspaceId || "skip" as any);

//   // Get the first incoming call, but only if we have a valid workspaceId
//   const incomingCall = (workspaceId && incomingCalls?.[0]) || null;

//   const [dismissedCallId, setDismissedCallId] = useState<string | null>(null);

//   // Reset dismissed call when a new call comes in
//   useEffect(() => {
//     if (incomingCall && incomingCall._id !== dismissedCallId) {
//       setDismissedCallId(null);
//     }
//   }, [incomingCall, dismissedCallId]);

//   // Don't show incoming call if:
//   // - No valid workspaceId
//   // - Call is dismissed 
//   // - User is already in a call
//   const shouldShowIncomingCall = workspaceId && 
//     incomingCall && 
//     !callState.isInCall && 
//     incomingCall._id !== dismissedCallId;

//   return (
//     <>
//       <CallPanel />
//       <IncomingCallDialog
//         call={shouldShowIncomingCall ? incomingCall : null}
//         onAccept={() => {
//           // The accept logic is handled inside IncomingCallDialog
//         }}
//         onDecline={() => {
//           // Mark this call as dismissed
//           if (incomingCall) {
//             setDismissedCallId(incomingCall._id);
//           }
//         }}
//       />
//     </>
//   );
// };

// third updated code

"use client";

import { useState, useEffect } from "react";
import { useMutation } from "convex/react";
import { api } from "@/../convex/_generated/api";
import { CallPanel } from "@/features/calls/components/CallPanel";
import { IncomingCallDialog } from "@/features/calls/components/IncomingCallDialog";
import { useCallState } from "@/features/calls/store/useCallState";
import { useIncomingCalls } from "@/features/calls/api/use-incoming-calls";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { usePathname } from "next/navigation";

export const CallProvider = () => {
  const pathname = usePathname();
  const { callState } = useCallState();

  // Always call the hook, but conditionally use the result
  const rawWorkspaceId = useWorkspaceId();

  // Only use workspaceId if we're in a workspace route
  const workspaceId = pathname.includes('/workspace/') ? rawWorkspaceId : null;

  // Listen for incoming calls - pass "skip" if no workspaceId
  const { data: incomingCalls } = useIncomingCalls(workspaceId);

  // Cleanup mutation
  const cleanupExpiredCalls = useMutation(api.calls.cleanupExpiredCalls);

  // Get the first incoming call, but only if we have a valid workspaceId
  const incomingCall = (workspaceId && incomingCalls?.[0]) || null;

  const [dismissedCallId, setDismissedCallId] = useState<string | null>(null);
  const [forceDismissed, setForceDismissed] = useState<Set<string>>(new Set());

  // Cleanup expired calls periodically
  useEffect(() => {
    if (!workspaceId) return;

    const cleanup = () => {
      cleanupExpiredCalls({ workspaceId })
        .catch(error => console.error("Failed to cleanup calls:", error));
    };

    // Run cleanup every 30 seconds
    const interval = setInterval(cleanup, 30000);

    // Run cleanup immediately
    cleanup();

    return () => clearInterval(interval);
  }, [workspaceId, cleanupExpiredCalls]);

  // Reset dismissed call when a new call comes in
  useEffect(() => {
    if (incomingCall && incomingCall._id !== dismissedCallId) {
      setDismissedCallId(null);
    }
  }, [incomingCall, dismissedCallId]);

  // Auto-dismiss calls older than 2 minutes
  useEffect(() => {
    if (incomingCall) {
      const callAge = Date.now() - incomingCall.createdAt;
      const twoMinutes = 2 * 60 * 1000; // 2 minutes in milliseconds

      if (callAge > twoMinutes) {
        setForceDismissed(prev => new Set([...prev, incomingCall._id]));
      }
    }
  }, [incomingCall]);

  // Don't show incoming call if:
  // - No valid workspaceId
  // - Call is dismissed 
  // - User is already in a call
  // - Call is force dismissed
  const shouldShowIncomingCall = workspaceId &&
    incomingCall &&
    !callState.isInCall &&
    incomingCall._id !== dismissedCallId &&
    !forceDismissed.has(incomingCall._id);

  const handleDecline = () => {
    if (incomingCall) {
      setDismissedCallId(incomingCall._id);
      setForceDismissed(prev => new Set([...prev, incomingCall._id]));
    }
  };

  const handleAccept = () => {
    // The accept logic is handled inside IncomingCallDialog
    if (incomingCall) {
      setDismissedCallId(null);
    }
  };

  return (
    <>
      <CallPanel />
      <IncomingCallDialog
        call={shouldShowIncomingCall ? incomingCall : null}
        onAccept={handleAccept}
        onDecline={handleDecline}
      />
    </>
  );
};
