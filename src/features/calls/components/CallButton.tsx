"use client";

import { Phone, Video } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useCreateCall } from "../api/useCallSignaling";
import { useCallState } from "../store/useCallState";
import { requestMediaPermissions } from "../utils/rtcUtils";
import type { Id } from "@/../convex/_generated/dataModel";
import type { CallType } from "../types";

interface CallButtonProps {
  workspaceId: Id<"workspaces">;
  channelId?: Id<"channels">;
  conversationId?: Id<"conversations">;
  type: CallType;
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg" | "icon";
  disabled?: boolean;
}

export const CallButton = ({
  workspaceId,
  channelId,
  conversationId,
  type,
  variant = "ghost",
  size = "icon",
  disabled = false,
}: CallButtonProps) => {
  const { mutate: createCall, isPending } = useCreateCall();
  const { setIsConnecting, setError, setActiveCall, setIsInCall } = useCallState();

  const handleStartCall = async () => {
    try {
      setIsConnecting(true);
      setError(null);

      // Request media permissions first
      const stream = await requestMediaPermissions(type === "video");
      if (!stream) {
        toast.error("Unable to access camera or microphone");
        return;
      }

      // Stop the stream immediately as we just needed to check permissions
      stream.getTracks().forEach(track => track.stop());

      // Create the call
      createCall(
        {
          workspaceId,
          channelId,
          conversationId,
          type,
        },
        {
          // 👇 REPLACE THIS ENTIRE onSuccess CALLBACK
          onSuccess: (callId) => {
            toast.success(`${type === "video" ? "Video" : "Voice"} call started`);

            // Set the call state with proper data
            const newCall = {
              _id: callId,
              workspaceId,
              channelId,
              conversationId,
              initiatorId: "current-user" as Id<"members">, // This should be the actual member ID
              type,
              status: "active" as const,
              participants: [],
              createdAt: Date.now(),
            };

            setActiveCall(newCall);
            setIsInCall(true);
            setIsConnecting(false);
          },
          // 👆 END OF REPLACEMENT
          onError: (error) => {
            console.error("Failed to create call:", error);
            toast.error("Failed to start call");
            setError(error.message);
            setIsConnecting(false);
          },
        }
      );
    } catch (error) {
      console.error("Error starting call:", error);
      toast.error("Failed to start call");
      setError(error instanceof Error ? error.message : "Unknown error");
      setIsConnecting(false);
    }
  };

  const Icon = type === "video" ? Video : Phone;

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleStartCall}
      disabled={disabled || isPending}
    >
      <Icon className="size-4" />
    </Button>
  );
};
