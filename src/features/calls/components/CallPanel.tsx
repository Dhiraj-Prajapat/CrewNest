// "use client";
// import { useState, useEffect } from "react";
// import { Mic, MicOff, Video, VideoOff, Phone, PhoneOff } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { useCallState } from "../store/useCallState";
// import { useEndCall } from "../api/use-call-signaling";
// import { useCurrentMember } from "@/features/members/api/use-current-member";
// import { useWorkspaceId } from "@/hooks/use-workspace-id";
// import { formatCallDuration } from "../utils/rtcUtils";
// import { toast } from "sonner";

// export const CallPanel = () => {
//   const workspaceId = useWorkspaceId();
//   const { data: currentMember } = useCurrentMember({ workspaceId });
//   const { mutate: endCall } = useEndCall();
  
//   const {
//     callState,
//     toggleLocalAudio,
//     toggleLocalVideo,
//     resetCallState,
//   } = useCallState();

//   const [callDuration, setCallDuration] = useState("");

//   useEffect(() => {
//     if (!callState.activeCall) return;

//     const interval = setInterval(() => {
//       setCallDuration(formatCallDuration(callState.activeCall!.createdAt));
//     }, 1000);

//     return () => clearInterval(interval);
//   }, [callState.activeCall]);

//   const handleEndCall = async () => {
//     if (!callState.activeCall) return;

//     try {
//       await endCall(callState.activeCall._id);
//       resetCallState();
//       toast.success("Call ended");
//     } catch (error) {
//       console.error("Failed to end call:", error);
//       toast.error("Failed to end call");
//     }
//   };

//   if (!callState.activeCall || !callState.isInCall) {
//     return null;
//   }

//   return (
//     <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm">
//       <div className="flex min-h-screen items-center justify-center p-4">
//         <div className="w-full max-w-4xl rounded-lg bg-white dark:bg-gray-900 shadow-2xl">
//           {/* Header */}
//           <div className="flex items-center justify-between border-b p-4">
//             <div className="flex items-center gap-2">
//               <div className="flex size-3 animate-pulse rounded-full bg-red-500" />
//               <span className="text-sm font-medium">
//                 {callState.activeCall.type === "video" ? "Video Call" : "Voice Call"}
//               </span>
//               {callDuration && (
//                 <span className="text-sm text-muted-foreground">
//                   {callDuration}
//                 </span>
//               )}
//             </div>
//           </div>

//           {/* Video Area */}
//           <div className="aspect-video relative bg-gray-900">
//             {callState.activeCall.type === "video" ? (
//               <div className="grid h-full place-items-center">
//                 <div className="text-center text-white">
//                   <Avatar className="mx-auto mb-4 size-24">
//                     <AvatarImage src={currentMember?.user?.image} />
//                     <AvatarFallback className="text-2xl">
//                       {currentMember?.user?.name?.charAt(0)?.toUpperCase()}
//                     </AvatarFallback>
//                   </Avatar>
//                   <p className="text-lg font-medium">
//                     {currentMember?.user?.name}
//                   </p>
//                   <p className="text-sm text-gray-400">
//                     {callState.isConnecting ? "Connecting..." : "In call"}
//                   </p>
//                 </div>
//               </div>
//             ) : (
//               <div className="flex h-full items-center justify-center">
//                 <div className="text-center text-white">
//                   <Avatar className="mx-auto mb-4 size-32">
//                     <AvatarImage src={currentMember?.user?.image} />
//                     <AvatarFallback className="text-4xl">
//                       {currentMember?.user?.name?.charAt(0)?.toUpperCase()}
//                     </AvatarFallback>
//                   </Avatar>
//                   <p className="text-xl font-medium">
//                     {currentMember?.user?.name}
//                   </p>
//                   <p className="text-sm text-gray-400">
//                     {callState.isConnecting ? "Connecting..." : "Voice call"}
//                   </p>
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Controls */}
//           <div className="flex items-center justify-center gap-4 p-6">
//             <Button
//               variant={callState.localAudio ? "outline" : "destructive"}
//               size="lg"
//               onClick={toggleLocalAudio}
//               className="rounded-full"
//             >
//               {callState.localAudio ? (
//                 <Mic className="size-5" />
//               ) : (
//                 <MicOff className="size-5" />
//               )}
//             </Button>

//             {callState.activeCall.type === "video" && (
//               <Button
//                 variant={callState.localVideo ? "outline" : "destructive"}
//                 size="lg"
//                 onClick={toggleLocalVideo}
//                 className="rounded-full"
//               >
//                 {callState.localVideo ? (
//                   <Video className="size-5" />
//                 ) : (
//                   <VideoOff className="size-5" />
//                 )}
//               </Button>
//             )}

//             <Button
//               variant="destructive"
//               size="lg"
//               onClick={handleEndCall}
//               className="rounded-full"
//             >
//               <PhoneOff className="size-5" />
//             </Button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// updated code

// "use client";

// import { useState, useEffect } from "react";
// import { Mic, MicOff, Video, VideoOff, Phone, PhoneOff } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { useCallState } from "../store/useCallState";
// import { useEndCall } from "../api/use-call-signaling";
// import { useCurrentMember } from "@/features/members/api/use-current-member";
// import { useWorkspaceId } from "@/hooks/use-workspace-id";
// import { formatCallDuration } from "../utils/rtcUtils";
// import { toast } from "sonner";

// export const CallPanel = () => {
//   const workspaceId = useWorkspaceId();
  
//   // Only call useCurrentMember if we have a valid workspaceId
//   const { data: currentMember } = useCurrentMember({ 
//     workspaceId: workspaceId || "skip" as any 
//   });
  
//   const { mutate: endCall } = useEndCall();
  
//   const {
//     callState,
//     toggleLocalAudio,
//     toggleLocalVideo,
//     resetCallState,
//   } = useCallState();

//   const [callDuration, setCallDuration] = useState("");

//   useEffect(() => {
//     if (!callState.activeCall) return;

//     const interval = setInterval(() => {
//       setCallDuration(formatCallDuration(callState.activeCall!.createdAt));
//     }, 1000);

//     return () => clearInterval(interval);
//   }, [callState.activeCall]);

//   const handleEndCall = async () => {
//     if (!callState.activeCall) return;

//     try {
//       await endCall(callState.activeCall._id);
//       resetCallState();
//       toast.success("Call ended");
//     } catch (error) {
//       console.error("Failed to end call:", error);
//       toast.error("Failed to end call");
//     }
//   };

//   // Don't render if no active call or missing workspaceId
//   if (!callState.activeCall || !callState.isInCall || !workspaceId) {
//     return null;
//   }

//   return (
//     <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm">
//       <div className="flex min-h-screen items-center justify-center p-4">
//         <div className="w-full max-w-4xl rounded-lg bg-white dark:bg-gray-900 shadow-2xl">
//           {/* Header */}
//           <div className="flex items-center justify-between border-b p-4">
//             <div className="flex items-center gap-2">
//               <div className="flex size-3 animate-pulse rounded-full bg-red-500" />
//               <span className="text-sm font-medium">
//                 {callState.activeCall.type === "video" ? "Video Call" : "Voice Call"}
//               </span>
//               {callDuration && (
//                 <span className="text-sm text-muted-foreground">
//                   {callDuration}
//                 </span>
//               )}
//             </div>
//           </div>

//           {/* Video Area */}
//           <div className="aspect-video relative bg-gray-900">
//             {callState.activeCall.type === "video" ? (
//               <div className="grid h-full place-items-center">
//                 <div className="text-center text-white">
//                   <Avatar className="mx-auto mb-4 size-24">
//                     <AvatarImage src={`currentMember?.user?.image`} />
//                     <AvatarFallback className="text-2xl">
//                       {`currentMember?.user?.name?.charAt(0)?.toUpperCase() || "U"`}
//                     </AvatarFallback>
//                   </Avatar>
//                   <p className="text-lg font-medium">
//                     {`currentMember?.user?.name || "Unknown User"`}
//                   </p>
//                   <p className="text-sm text-gray-400">
//                     {callState.isConnecting ? "Connecting..." : "In call"}
//                   </p>
//                 </div>
//               </div>
//             ) : (
//               <div className="flex h-full items-center justify-center">
//                 <div className="text-center text-white">
//                   <Avatar className="mx-auto mb-4 size-32">
//                     <AvatarImage src={`currentMember?.user?.image`} />
//                     <AvatarFallback className="text-4xl">
//                       {`currentMember?.user?.name?.charAt(0)?.toUpperCase() || "U"`}
//                     </AvatarFallback>
//                   </Avatar>
//                   <p className="text-xl font-medium">
//                     {`currentMember?.user?.name || "Unknown User"`}
//                   </p>
//                   <p className="text-sm text-gray-400">
//                     {callState.isConnecting ? "Connecting..." : "Voice call"}
//                   </p>
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Controls */}
//           <div className="flex items-center justify-center gap-4 p-6">
//             <Button
//               variant={callState.localAudio ? "outline" : "destructive"}
//               size="lg"
//               onClick={toggleLocalAudio}
//               className="rounded-full"
//             >
//               {callState.localAudio ? (
//                 <Mic className="size-5" />
//               ) : (
//                 <MicOff className="size-5" />
//               )}
//             </Button>

//             {callState.activeCall.type === "video" && (
//               <Button
//                 variant={callState.localVideo ? "outline" : "destructive"}
//                 size="lg"
//                 onClick={toggleLocalVideo}
//                 className="rounded-full"
//               >
//                 {callState.localVideo ? (
//                   <Video className="size-5" />
//                 ) : (
//                   <VideoOff className="size-5" />
//                 )}
//               </Button>
//             )}

//             <Button
//               variant="destructive"
//               size="lg"
//               onClick={handleEndCall}
//               className="rounded-full"
//             >
//               <PhoneOff className="size-5" />
//             </Button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };


// second updated code

// "use client";

// import { useState, useEffect } from "react";
// import { Mic, MicOff, Video, VideoOff, Phone, PhoneOff } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { useCallState } from "../store/useCallState";
// import { useEndCall } from "../api/use-call-signaling";
// import { useCurrentMember } from "@/features/members/api/use-current-member";
// import { formatCallDuration } from "../utils/rtcUtils";
// import { toast } from "sonner";

// export const CallPanel = () => {
//   const {
//     callState,
//     toggleLocalAudio,
//     toggleLocalVideo,
//     resetCallState,
//   } = useCallState();
  
//   // Get workspaceId from the active call instead of URL
//   const workspaceId = callState.activeCall?.workspaceId;
  
//   const { data: currentMember } = useCurrentMember({ 
//     workspaceId: workspaceId || "skip" as any 
//   });
  
//   const { mutate: endCall } = useEndCall();
//   const [callDuration, setCallDuration] = useState("");

//   useEffect(() => {
//     if (!callState.activeCall) return;

//     const interval = setInterval(() => {
//       setCallDuration(formatCallDuration(callState.activeCall!.createdAt));
//     }, 1000);

//     return () => clearInterval(interval);
//   }, [callState.activeCall]);

//   const handleEndCall = async () => {
//     if (!callState.activeCall) return;

//     try {
//       await endCall(callState.activeCall._id);
//       resetCallState();
//       toast.success("Call ended");
//     } catch (error) {
//       console.error("Failed to end call:", error);
//       toast.error("Failed to end call");
//     }
//   };

//   // Don't render if no active call
//   if (!callState.activeCall || !callState.isInCall) {
//     return null;
//   }

//   // Don't render if we don't have valid workspace or member data yet
//   if (!workspaceId || !currentMember) {
//     return (
//       <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm">
//         <div className="flex min-h-screen items-center justify-center p-4">
//           <div className="text-white">Loading call...</div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm">
//       <div className="flex min-h-screen items-center justify-center p-4">
//         <div className="w-full max-w-4xl rounded-lg bg-white dark:bg-gray-900 shadow-2xl">
//           {/* Header */}
//           <div className="flex items-center justify-between border-b p-4">
//             <div className="flex items-center gap-2">
//               <div className="flex size-3 animate-pulse rounded-full bg-red-500" />
//               <span className="text-sm font-medium">
//                 {callState.activeCall.type === "video" ? "Video Call" : "Voice Call"}
//               </span>
//               {callDuration && (
//                 <span className="text-sm text-muted-foreground">
//                   {callDuration}
//                 </span>
//               )}
//             </div>
//           </div>

//           {/* Video Area */}
//           <div className="aspect-video relative bg-gray-900">
//             {callState.activeCall.type === "video" ? (
//               <div className="grid h-full place-items-center">
//                 <div className="text-center text-white">
//                   <Avatar className="mx-auto mb-4 size-24">
//                     <AvatarImage src={currentMember.user?.image} />
//                     <AvatarFallback className="text-2xl">
//                       {currentMember.user?.name?.charAt(0)?.toUpperCase() || "U"}
//                     </AvatarFallback>
//                   </Avatar>
//                   <p className="text-lg font-medium">
//                     {currentMember.user?.name || "Loading..."}
//                   </p>
//                   <p className="text-sm text-gray-400">
//                     {callState.isConnecting ? "Connecting..." : "In call"}
//                   </p>
//                 </div>
//               </div>
//             ) : (
//               <div className="flex h-full items-center justify-center">
//                 <div className="text-center text-white">
//                   <Avatar className="mx-auto mb-4 size-32">
//                     <AvatarImage src={currentMember.user?.image} />
//                     <AvatarFallback className="text-4xl">
//                       {currentMember.user?.name?.charAt(0)?.toUpperCase() || "U"}
//                     </AvatarFallback>
//                   </Avatar>
//                   <p className="text-xl font-medium">
//                     {currentMember.user?.name || "Loading..."}
//                   </p>
//                   <p className="text-sm text-gray-400">
//                     {callState.isConnecting ? "Connecting..." : "Voice call"}
//                   </p>
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Controls */}
//           <div className="flex items-center justify-center gap-4 p-6">
//             <Button
//               variant={callState.localAudio ? "outline" : "destructive"}
//               size="lg"
//               onClick={toggleLocalAudio}
//               className="rounded-full"
//             >
//               {callState.localAudio ? (
//                 <Mic className="size-5" />
//               ) : (
//                 <MicOff className="size-5" />
//               )}
//             </Button>

//             {callState.activeCall.type === "video" && (
//               <Button
//                 variant={callState.localVideo ? "outline" : "destructive"}
//                 size="lg"
//                 onClick={toggleLocalVideo}
//                 className="rounded-full"
//               >
//                 {callState.localVideo ? (
//                   <Video className="size-5" />
//                 ) : (
//                   <VideoOff className="size-5" />
//                 )}
//               </Button>
//             )}

//             <Button
//               variant="destructive"
//               size="lg"
//               onClick={handleEndCall}
//               className="rounded-full"
//             >
//               <PhoneOff className="size-5" />
//             </Button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// third updated code is working


"use client";

import { useState, useEffect, useRef } from "react";
import { Mic, MicOff, Video, VideoOff, PhoneOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCallState } from "../store/useCallState";
import { useEndCall } from "../api/use-call-signaling";
import { useCurrentMember } from "@/features/members/api/use-current-member";
import { formatCallDuration } from "../utils/rtcUtils";
import { toast } from "sonner";
import { useActiveCall } from "../api/use-call-signaling"; // Make sure this is correct

export const CallPanel = () => {
  const {
    callState,
    toggleLocalAudio,
    toggleLocalVideo,
    resetCallState,
  } = useCallState();

  // Get workspaceId from the call itself
  const workspaceId = callState.activeCall?.workspaceId;
  const { data: currentMember } = useCurrentMember({
    workspaceId: workspaceId || "skip" as any,
  });
  const { mutate: endCall } = useEndCall();

  // +++++ Live Video Refs +++++
  const localVideoRef = useRef<HTMLVideoElement>(null);
  // For a full solution, you'll also need remoteVideoRef and setup signaling
  // const remoteVideoRef = useRef<HTMLVideoElement>(null);

  const [callDuration, setCallDuration] = useState("");

  // +++++ Local video capture +++++
  useEffect(() => {
    let stream: MediaStream | null = null;

    if (callState.isInCall && callState.activeCall?.type === "video" && localVideoRef.current) {
      navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then((mediaStream) => {
          stream = mediaStream;
          if (localVideoRef.current) {
            localVideoRef.current.srcObject = mediaStream;
          }
        })
        .catch((err) => {
          toast.error("Could not access camera/mic: " + err);
        });
    }

    // Cleanup
    return () => {
      stream?.getTracks().forEach(track => track.stop());
      if (localVideoRef.current) localVideoRef.current.srcObject = null;
    };
  }, [callState.isInCall, callState.activeCall?.type]);

  // +++++ Timer +++++
  useEffect(() => {
    if (!callState.activeCall) return;
    const interval = setInterval(() => {
      setCallDuration(formatCallDuration(callState.activeCall!.createdAt));
    }, 1000);
    return () => clearInterval(interval);
  }, [callState.activeCall]);

  // +++++ Watch for remote hangup +++++
  const { data: activeCallFromServer } = useActiveCall({
    workspaceId,
    channelId: callState.activeCall?.channelId,
    conversationId: callState.activeCall?.conversationId,
  });

  useEffect(() => {
    if (activeCallFromServer && activeCallFromServer.status === "ended") {
      resetCallState();
      toast.info("Call ended.");
    }
  }, [activeCallFromServer, resetCallState]);

  const handleEndCall = async () => {
    if (!callState.activeCall) return;

    try {
      await endCall(callState.activeCall._id);
      resetCallState();
      toast.success("Call ended");
    } catch (error) {
      console.error("Failed to end call:", error);
      toast.error("Failed to end call");
    }
  };

  // Don't render if no active call
  if (!callState.activeCall || !callState.isInCall) {
    return null;
  }

  // Don't render if we don't have valid data yet
  if (!workspaceId || !currentMember) {
    return (
      <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm">
        <div className="flex min-h-screen items-center justify-center p-4">
          <div className="text-white">Loading call...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="w-full max-w-4xl rounded-lg bg-white dark:bg-gray-900 shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between border-b p-4">
            <div className="flex items-center gap-2">
              <div className="flex size-3 animate-pulse rounded-full bg-red-500" />
              <span className="text-sm font-medium">
                {callState.activeCall.type === "video" ? "Video Call" : "Voice Call"}
              </span>
              {callDuration && (
                <span className="text-sm text-muted-foreground">
                  {callDuration}
                </span>
              )}
            </div>
          </div>
          {/* Video Area */}
          <div className="aspect-video relative bg-gray-900 flex justify-center items-center">
            {callState.activeCall.type === "video" ? (
              <div className="flex flex-row gap-6 justify-center items-center">
                <div>
                  <div className="text-white text-center mb-2">Your Camera</div>
                  <video
                    ref={localVideoRef}
                    autoPlay
                    muted
                    playsInline
                    className="w-48 h-36 bg-black rounded"
                  />
                </div>
                <div>
                  <div className="text-white text-center mb-2">Remote</div>
                  {/* Placeholder for remote stream */}
                  <div className="w-48 h-36 flex items-center justify-center bg-neutral-700 text-white rounded">
                    {/* Later: <video ref={remoteVideoRef} ... /> */}
                    Waiting for remote video...
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex h-full items-center justify-center">
                <div className="text-center text-white">
                  <span className="font-bold text-2xl">Voice Call</span>
                  <div className="mt-4 text-lg">
                    {`currentMember.user?.name`}
                  </div>
                </div>
              </div>
            )}
          </div>
          {/* Controls */}
          <div className="flex items-center justify-center gap-4 p-6">
            <Button
              variant={callState.localAudio ? "outline" : "destructive"}
              size="lg"
              onClick={toggleLocalAudio}
              className="rounded-full"
            >
              {callState.localAudio ? (
                <Mic className="size-5" />
              ) : (
                <MicOff className="size-5" />
              )}
            </Button>
            {callState.activeCall.type === "video" && (
              <Button
                variant={callState.localVideo ? "outline" : "destructive"}
                size="lg"
                onClick={toggleLocalVideo}
                className="rounded-full"
              >
                {callState.localVideo ? (
                  <Video className="size-5" />
                ) : (
                  <VideoOff className="size-5" />
                )}
              </Button>
            )}
            <Button
              variant="destructive"
              size="lg"
              onClick={handleEndCall}
              className="rounded-full"
            >
              <PhoneOff className="size-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
