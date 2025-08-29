// "use client";

// import { Phone, PhoneOff, Video } from "lucide-react";
// import { useEffect, useState } from "react";
// import { toast } from "sonner";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { useJoinCall } from "../api/use-call-signaling";
// import { useCallState } from "../store/useCallState";
// import { useGetMember } from "@/features/members/api/use-get-member";
// import type { Call } from "../types";

// interface IncomingCallDialogProps {
//   call: Call | null;
//   onAccept: () => void;
//   onDecline: () => void;
// }

// export const IncomingCallDialog = ({
//   call,
//   onAccept,
//   onDecline,
// }: IncomingCallDialogProps) => {
//   const { data: initiator } = useGetMember({ id: call?.initiatorId || "" as any });
//   const { mutate: joinCall } = useJoinCall();
//   const { setIsInCall, setActiveCall } = useCallState();
//   const [isRinging, setIsRinging] = useState(false);

//   useEffect(() => {
//     if (call) {
//       setIsRinging(true);
//       // Play ringtone sound if available
//       // You can add audio element here
//     } else {
//       setIsRinging(false);
//     }
//   }, [call]);

//   const handleAccept = async () => {
//     if (!call) return;

//     try {
//       await joinCall(call._id);
//       setActiveCall(call);
//       setIsInCall(true);
//       onAccept();
//       toast.success("Joined call");
//     } catch (error) {
//       console.error("Failed to join call:", error);
//       toast.error("Failed to join call");
//     }
//   };

//   const handleDecline = () => {
//     setIsRinging(false);
//     onDecline();
//   };

//   if (!call || !initiator) return null;

//   return (
//     <Dialog open={!!call}>
//       <DialogContent className="sm:max-w-md">
//         <DialogHeader>
//           <DialogTitle className="text-center">
//             Incoming {call.type} call
//           </DialogTitle>
//           <DialogDescription className="text-center">
//             {initiator.user.name} is calling you
//           </DialogDescription>
//         </DialogHeader>

//         <div className="flex flex-col items-center space-y-4 py-4">
//           <div className="relative">
//             <Avatar className="size-24">
//               <AvatarImage src={initiator.user.image} />
//               <AvatarFallback className="text-2xl">
//                 {initiator.user.name?.charAt(0)?.toUpperCase()}
//               </AvatarFallback>
//             </Avatar>
//             {isRinging && (
//               <div className="absolute inset-0 animate-ping rounded-full border-4 border-blue-500" />
//             )}
//           </div>

//           <div className="text-center">
//             <p className="font-medium">{initiator.user.name}</p>
//             <p className="text-sm text-muted-foreground">
//               {call.type === "video" ? "Video call" : "Voice call"}
//             </p>
//           </div>

//           <div className="flex gap-4">
//             <Button
//               variant="destructive"
//               size="lg"
//               onClick={handleDecline}
//               className="rounded-full"
//             >
//               <PhoneOff className="size-5" />
//             </Button>

//             <Button
//               variant="default"
//               size="lg"
//               onClick={handleAccept}
//               className="rounded-full bg-green-600 hover:bg-green-700"
//             >
//               {call.type === "video" ? (
//                 <Video className="size-5" />
//               ) : (
//                 <Phone className="size-5" />
//               )}
//             </Button>
//           </div>
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// };


// new updated code

// "use client";

// import { Phone, PhoneOff, Video } from "lucide-react";
// import { useEffect, useState } from "react";
// import { toast } from "sonner";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { useJoinCall } from "../api/use-call-signaling";
// import { useCallState } from "../store/useCallState";
// import { useGetMember } from "@/features/members/api/use-get-member";
// import type { Call } from "../types";

// interface IncomingCallDialogProps {
//   call: Call | null;
//   onAccept: () => void;
//   onDecline: () => void;
// }

// export const IncomingCallDialog = ({
//   call,
//   onAccept,
//   onDecline,
// }: IncomingCallDialogProps) => {
//   // Only call useGetMember if we have a valid initiatorId
//   const { data: initiator } = useGetMember({ 
//     id: call?.initiatorId || "skip" as any // Use "skip" to avoid calling with empty string
//   });
  
//   const { mutate: joinCall } = useJoinCall();
//   const { setIsInCall, setActiveCall } = useCallState();
//   const [isRinging, setIsRinging] = useState(false);

//   useEffect(() => {
//     if (call) {
//       setIsRinging(true);
//       // Play ringtone sound if available
//       // You can add audio element here
//     } else {
//       setIsRinging(false);
//     }
//   }, [call]);

//   const handleAccept = async () => {
//     if (!call) return;

//     try {
//       await joinCall(call._id);
//       setActiveCall(call);
//       setIsInCall(true);
//       onAccept();
//       toast.success("Joined call");
//     } catch (error) {
//       console.error("Failed to join call:", error);
//       toast.error("Failed to join call");
//     }
//   };

//   const handleDecline = () => {
//     setIsRinging(false);
//     onDecline();
//   };

//   // Don't render if no call or no initiator data
//   if (!call || !initiator || !call.initiatorId) return null;

//   return (
//     <Dialog open={!!call}>
//       <DialogContent className="sm:max-w-md">
//         <DialogHeader>
//           <DialogTitle className="text-center">
//             Incoming {call.type} call
//           </DialogTitle>
//           <DialogDescription className="text-center">
//             {initiator.user.name} is calling you
//           </DialogDescription>
//         </DialogHeader>

//         <div className="flex flex-col items-center space-y-4 py-4">
//           <div className="relative">
//             <Avatar className="size-24">
//               <AvatarImage src={initiator.user.image} />
//               <AvatarFallback className="text-2xl">
//                 {initiator.user.name?.charAt(0)?.toUpperCase()}
//               </AvatarFallback>
//             </Avatar>
//             {isRinging && (
//               <div className="absolute inset-0 animate-ping rounded-full border-4 border-blue-500" />
//             )}
//           </div>

//           <div className="text-center">
//             <p className="font-medium">{initiator.user.name}</p>
//             <p className="text-sm text-muted-foreground">
//               {call.type === "video" ? "Video call" : "Voice call"}
//             </p>
//           </div>

//           <div className="flex gap-4">
//             <Button
//               variant="destructive"
//               size="lg"
//               onClick={handleDecline}
//               className="rounded-full"
//             >
//               <PhoneOff className="size-5" />
//             </Button>

//             <Button
//               variant="default"
//               size="lg"
//               onClick={handleAccept}
//               className="rounded-full bg-green-600 hover:bg-green-700"
//             >
//               {call.type === "video" ? (
//                 <Video className="size-5" />
//               ) : (
//                 <Phone className="size-5" />
//               )}
//             </Button>
//           </div>
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// };

// ssecond updated code

// "use client";

// import { Phone, PhoneOff, Video } from "lucide-react";
// import { useEffect, useState } from "react";
// import { toast } from "sonner";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { useJoinCall, useEndCall } from "../api/use-call-signaling";
// import { useCallState } from "../store/useCallState";
// import { useGetMember } from "@/features/members/api/use-get-member";
// import type { Call } from "../types";

// interface IncomingCallDialogProps {
//   call: Call | null;
//   onAccept: () => void;
//   onDecline: () => void;
// }

// export const IncomingCallDialog = ({
//   call,
//   onAccept,
//   onDecline,
// }: IncomingCallDialogProps) => {
//   const { data: initiator } = useGetMember({ 
//     id: call?.initiatorId || "skip" as any
//   });
  
//   const { mutate: joinCall } = useJoinCall();
//   const { mutate: endCall } = useEndCall();
//   const { setIsInCall, setActiveCall } = useCallState();
//   const [isRinging, setIsRinging] = useState(false);

//   useEffect(() => {
//     if (call) {
//       setIsRinging(true);
//       // Play ringtone sound if available
//       // You can add audio element here
//     } else {
//       setIsRinging(false);
//     }
//   }, [call]);

//   const handleAccept = async () => {
//     if (!call) return;

//     try {
//       const joinedCall = await joinCall(call._id);
//       setActiveCall(call);
//       setIsInCall(true);
//       onAccept();
//       toast.success("Joined call");
//     } catch (error) {
//       console.error("Failed to join call:", error);
//       toast.error("Failed to join call");
//     }
//   };

//   const handleDecline = async () => {
//     if (!call) return;

//     try {
//       // End the call when declining
//       await endCall(call._id);
//       setIsRinging(false);
//       onDecline();
//       toast.success("Call declined");
//     } catch (error) {
//       console.error("Failed to decline call:", error);
//       // Still call onDecline to dismiss the dialog
//       onDecline();
//     }
//   };

//   // Don't render if no call or no initiator data
//   if (!call || !initiator || !call.initiatorId) return null;

//   return (
//     <Dialog open={!!call}>
//       <DialogContent className="sm:max-w-md">
//         <DialogHeader>
//           <DialogTitle className="text-center">
//             Incoming {call.type} call
//           </DialogTitle>
//           <DialogDescription className="text-center">
//             {initiator.user.name} is calling you
//           </DialogDescription>
//         </DialogHeader>

//         <div className="flex flex-col items-center space-y-4 py-4">
//           <div className="relative">
//             <Avatar className="size-24">
//               <AvatarImage src={initiator.user.image} />
//               <AvatarFallback className="text-2xl">
//                 {initiator.user.name?.charAt(0)?.toUpperCase()}
//               </AvatarFallback>
//             </Avatar>
//             {isRinging && (
//               <div className="absolute inset-0 animate-ping rounded-full border-4 border-blue-500" />
//             )}
//           </div>

//           <div className="text-center">
//             <p className="font-medium">{initiator.user.name}</p>
//             <p className="text-sm text-muted-foreground">
//               {call.type === "video" ? "Video call" : "Voice call"}
//             </p>
//           </div>

//           <div className="flex gap-4">
//             <Button
//               variant="destructive"
//               size="lg"
//               onClick={handleDecline}
//               className="rounded-full"
//             >
//               <PhoneOff className="size-5" />
//             </Button>

//             <Button
//               variant="default"
//               size="lg"
//               onClick={handleAccept}
//               className="rounded-full bg-green-600 hover:bg-green-700"
//             >
//               {call.type === "video" ? (
//                 <Video className="size-5" />
//               ) : (
//                 <Phone className="size-5" />
//               )}
//             </Button>
//           </div>
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// };

// third updated code

// "use client";

// import { Phone, PhoneOff, Video } from "lucide-react";
// import { useEffect, useState } from "react";
// import { toast } from "sonner";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { useJoinCall, useEndCall } from "../api/use-call-signaling";
// import { useCallState } from "../store/useCallState";
// import { useGetMember } from "@/features/members/api/use-get-member";
// import type { Call } from "../types";

// interface IncomingCallDialogProps {
//   call: Call | null;
//   onAccept: () => void;
//   onDecline: () => void;
// }

// export const IncomingCallDialog = ({
//   call,
//   onAccept,
//   onDecline,
// }: IncomingCallDialogProps) => {
//   const { data: initiator } = useGetMember({
//     id: call?.initiatorId || ("skip" as any),
//   });

//   const { mutate: joinCall } = useJoinCall();
//   const { mutate: endCall } = useEndCall();
//   const { setIsInCall, setActiveCall } = useCallState();
//   const [isRinging, setIsRinging] = useState(false);

//   useEffect(() => {
//     if (call) {
//       setIsRinging(true);
//       // Optional: play ringtone here
//     } else {
//       setIsRinging(false);
//     }
//   }, [call]);

//   const handleAccept = async () => {
//     if (!call) return;

//     try {
//       const joinedCall = await joinCall(call._id);
//       setActiveCall(call);
//       setIsInCall(true);
//       onAccept();
//       toast.success("Joined call");
//     } catch (error) {
//       console.error("Failed to join call:", error);
//       toast.error("Failed to join call");
//     }
//   };

//   const handleDecline = async () => {
//     if (!call) return;

//     try {
//       // End the call when declining
//       await endCall(call._id);
//       setIsRinging(false);
//       onDecline();
//       toast.success("Call declined");
//     } catch (error) {
//       console.error("Failed to decline call:", error);
//       // Force dismiss the dialog even if backend call fails
//       setIsRinging(false);
//       onDecline();
//       toast.error("Call declined (forced)");
//     }
//   };

//   // Don't render if no call or no initiator data
//   if (!call || !initiator || !call.initiatorId) return null;

//   return (
//     <Dialog open={!!call}>
//       <DialogContent className="sm:max-w-md">
//         <DialogHeader>
//           <DialogTitle className="text-center">
//             Incoming {call.type} call
//           </DialogTitle>
//           <DialogDescription className="text-center">
//             {initiator.user.name} is calling you
//           </DialogDescription>
//         </DialogHeader>

//         <div className="flex flex-col items-center space-y-4 py-4">
//           <div className="relative">
//             <Avatar className="size-24">
//               <AvatarImage src={initiator.user.image} />
//               <AvatarFallback className="text-2xl">
//                 {initiator.user.name?.charAt(0)?.toUpperCase()}
//               </AvatarFallback>
//             </Avatar>
//             {isRinging && (
//               <div className="absolute inset-0 animate-ping rounded-full border-4 border-blue-500" />
//             )}
//           </div>

//           <div className="text-center">
//             <p className="font-medium">{initiator.user.name}</p>
//             <p className="text-sm text-muted-foreground">
//               {call.type === "video" ? "Video call" : "Voice call"}
//             </p>
//           </div>

//           <div className="flex gap-4">
//             <Button
//               variant="destructive"
//               size="lg"
//               onClick={handleDecline}
//               className="rounded-full"
//             >
//               <PhoneOff className="size-5" />
//             </Button>

//             <Button
//               variant="default"
//               size="lg"
//               onClick={handleAccept}
//               className="rounded-full bg-green-600 hover:bg-green-700"
//             >
//               {call.type === "video" ? (
//                 <Video className="size-5" />
//               ) : (
//                 <Phone className="size-5" />
//               )}
//             </Button>
//           </div>
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// };

// fourth updated code

"use client";

import { Phone, PhoneOff, Video } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useJoinCall, useEndCall } from "../api/use-call-signaling";
import { useCallState } from "../store/useCallState";
import { useGetMember } from "@/features/members/api/use-get-member";
import type { Call } from "../types";

interface IncomingCallDialogProps {
  call: Call | null;
  onAccept: () => void;
  onDecline: () => void;
}

export const IncomingCallDialog = ({
  call,
  onAccept,
  onDecline,
}: IncomingCallDialogProps) => {
  const { data: initiator } = useGetMember({
    id: call?.initiatorId || ("skip" as any),
  });

  const { mutate: joinCall } = useJoinCall();
  const { mutate: endCall } = useEndCall();
  const { setIsInCall, setActiveCall } = useCallState();
  const [isRinging, setIsRinging] = useState(false);

  useEffect(() => {
    if (call) {
      setIsRinging(true);
      // Optionally play ringtone here
    } else {
      setIsRinging(false);
    }
  }, [call]);

  const handleAccept = async () => {
    if (!call) return;

    try {
      await joinCall(call._id);
      setActiveCall(call);
      setIsInCall(true);
      onAccept();
      toast.success("Joined call");
    } catch (error) {
      console.error("Failed to join call:", error);
      toast.error("Failed to join call");
    }
  };

  const handleDecline = async () => {
    if (!call) return;

    try {
      await endCall(call._id);
      setIsRinging(false);
      onDecline();
      toast.success("Call declined");
    } catch (error) {
      console.error("Failed to decline call:", error);
      setIsRinging(false);
      onDecline();
      toast.error("Call declined (forced)");
    }
  };

  if (!call || !initiator || !call.initiatorId) return null;

  return (
    <Dialog open={!!call} onOpenChange={(open) => !open && onDecline()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">
            Incoming {call.type} call
          </DialogTitle>
          <DialogDescription className="text-center">
            {initiator.user.name} is calling you
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center space-y-4 py-4">
          <div className="relative">
            <Avatar className="size-24">
              <AvatarImage src={initiator.user.image} />
              <AvatarFallback className="text-2xl">
                {initiator.user.name?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            {isRinging && (
              <div className="absolute inset-0 animate-ping rounded-full border-4 border-blue-500" />
            )}
          </div>

          <div className="text-center">
            <p className="font-medium">{initiator.user.name}</p>
            <p className="text-sm text-muted-foreground">
              {call.type === "video" ? "Video call" : "Voice call"}
            </p>
          </div>

          <div className="flex gap-4">
            <Button
              variant="destructive"
              size="lg"
              onClick={handleDecline}
              className="rounded-full"
            >
              <PhoneOff className="size-5" />
            </Button>

            <Button
              variant="default"
              size="lg"
              onClick={handleAccept}
              className="rounded-full bg-green-600 hover:bg-green-700"
            >
              {call.type === "video" ? (
                <Video className="size-5" />
              ) : (
                <Phone className="size-5" />
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
