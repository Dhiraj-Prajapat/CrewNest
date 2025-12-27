import type { Id } from "@/../convex/_generated/dataModel";

export type CallType = "voice" | "video";
export type CallStatus = "waiting" | "active" | "ended";

export interface Call {
  _id: Id<"calls">;
  workspaceId: Id<"workspaces">;
  channelId?: Id<"channels">;
  conversationId?: Id<"conversations">;
  initiatorId: Id<"members">;
  type: CallType;
  status: CallStatus;
  participants: Id<"members">[];
  roomUrl?: string;
  createdAt: number;
  endedAt?: number;
}

export interface CallParticipant {
  memberId: Id<"members">;
  userName: string;
  userImage?: string;
  isLocal: boolean;
  isMuted: boolean;
  isVideoOff: boolean;
}

export interface CallState {
  activeCall: Call | null;
  isInCall: boolean;
  isConnecting: boolean;
  localAudio: boolean;
  localVideo: boolean;
  participants: CallParticipant[];
  error: string | null;
}
